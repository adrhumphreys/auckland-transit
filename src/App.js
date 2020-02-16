import React, { Component } from 'react';
import Map from './components/Map';
import Panel from './components/Panel';
import { getRoutes, getVehicles } from './services/data';
import Vehicle from './components/Vehicle';

class App extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            routes: null,
            vehicles: null,
            selectedType: 2,
        };
        
        this.setSelectedType = this.setSelectedType.bind(this);
    }

    componentDidMount() {
        getRoutes()
            .then(routes => this.setState({routes}))
            .then(() => getVehicles())
            .then(vehicles => this.setState({vehicles}))
            .then(() => console.log(this.state));
    }

    setSelectedType(type) {
        this.setState({selectedType: type});
    }

    render() {
        const {
            routes,
            selectedType,
            vehicles,
        } = this.state;

        const filteredRoutes = routes != null
            ? routes.filter(route => route.type == selectedType)
            : routes;

        return (
            <div className="app">
                <Map>
                    {
                        vehicles != null && vehicles
                            .filter(vehicle => vehicle.type == selectedType)
                            .map(vehicle => <Vehicle key={vehicle.id} {...vehicle}/>)
                    }
                </Map>
                <Panel
                    routes={filteredRoutes}
                    selectedType={selectedType}
                    setSelectedType={this.setSelectedType}
                />
            </div>
        );
    }
}

export default App;