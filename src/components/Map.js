import React, { useState } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWRyaWFuaHVtcGhyZXlzIiwiYSI6ImNpbTM4bnkzbTAwNTF4MmtzemNwZHVrd2MifQ.j-yU65Xvny046C0MuXL56g';

export default (props) => {
    const { children } = props;
    // set default to auckland 36.8485° S, 174.7633° E
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: -36.8485,
        longitude: 174.7633,
        zoom: 10
      });

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            className="main-map"
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={setViewport}
        >
            {children}
            <div className="map-controls">
                <NavigationControl onViewStateChange={setViewport} />
            </div>
        </ReactMapGL>
    );
}