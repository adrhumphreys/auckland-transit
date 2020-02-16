
const API_KEY = process.env.AUCKLAND_GTSF_KEY || '71019729a9a2409589e5d8d6cb203174';

let cachedRoutes = false;

export async function getRoutes() {
    if (cachedRoutes) {
        return cachedRoutes;
    }

    return fetch(
            'https://api.at.govt.nz/v2/gtfs/routes',
            { headers: { "Ocp-Apim-Subscription-Key": API_KEY } }
        )
        .then(response => response.json())
        .then(({ response }) => {
            let routes = response
                .map(route => ({
                    id: route.route_id,
                    type: route.route_type,
                    shortName: route.route_short_name,
                    longName: route.route_long_name
                }))
                .sort((routeA, routeB) => {
                    const routeAShortName = routeA.shortName,
                        routeBShortName = routeB.shortName;
                    if(routeAShortName < routeBShortName) return -1;
                    if(routeAShortName > routeBShortName) return 1;
                    return 0;
                })


            cachedRoutes = routes;
        })
        .catch(err => console.log('Issue with GTFS:' + err));
}

export async function getVehicles() {
    const routes = await getRoutes();

    return fetch(
            'https://api.at.govt.nz/v2/public/realtime/vehiclelocations',
            { headers: { "Ocp-Apim-Subscription-Key": API_KEY } }
        )
        .then(response => response.json())
        .then(json => json.response.entity.map(({vehicle}) => {
            const route = routes.filter(({ id }) => {
                if (vehicle.trip == undefined || vehicle.trip.route_id == undefined) {
                    return false;
                }
        
                return id == vehicle.trip.route_id
            })[0]

            if (!route) {
                return {
                    id: vehicle.vehicle.id,
                    occupied: vehicle.occupancy_status,
                    timestamp: vehicle.timestamp,
                    latitude: vehicle.position.latitude,
                    longitude: vehicle.position.longitude,
                    shortName: null,
                    longName: null,
                    type: null,
                    routeId: null
                }
            }
    
            return {
                id: vehicle.vehicle.id,
                occupied: vehicle.occupancy_status,
                timestamp: vehicle.timestamp,
                latitude: vehicle.position.latitude,
                longitude: vehicle.position.longitude,
                shortName: route.shortName,
                longName: route.longName || '',
                type: route.type || 6,
                routeId: route.id || ''
            }
        }));
}