import React from 'react';
import { Marker } from 'react-map-gl'

function getIcon(vehicle) {
    if (vehicle.type == null) {
        return '🕵️'
    }

    return getOccupiedIcon(vehicle) + '' + getTypeIcon(vehicle)
}

function getOccupiedIcon(vehicle) {
    switch (vehicle.occupied) {
        case 0:
            return '☀️'
        case 1:
            return '🌤'
        case 2:
            return '🌧'
    }

    return '☂️'
}

function getTypeIcon(vehicle) {
    switch (vehicle.type) {
        case 0:
            return '🚙'
        case 1:
            return '🚂'
        case 2:
            return '🚈'
        case 3:
            return '🚌'
        case 4:
            return '⛴'
        case 5:
            return '🚅'
    }

    return '🚜';
}

export default (props) => {
    const { latitude, longitude } = props;

    return (
        <Marker
            className="map-marker"
            latitude={latitude} 
            longitude={longitude}>
            <div onClick={() => console.log(props)}>{getIcon(props)}</div>
        </Marker>
    );
}