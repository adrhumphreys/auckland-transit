import React from 'react'
import { uniqBy } from 'lodash';

export default (props) => {
    const {
        routes,
        selectedType,
        setSelectedType
    } = props;

    const uniqRoutes = uniqBy(routes, 'shortName');

    return (
        <div className="control-panel">
            <label>Route type</label>
            <br/>
            <select
                defaultValue={selectedType}
                onChange={evt => setSelectedType(evt.target.value)}
            >
                <option value={3}>Buses</option>
                <option value={2}>Trains</option>
                <option value={4}>Ferries</option>
            </select>

            <br/>

            <label>Route short name</label>
            <br/>
            <select>
                {
                    uniqRoutes != null && uniqRoutes
                        .map(route => <option value={route.id} key={route.id}>{route.shortName}</option>)
                }
            </select>
        </div>
    );
}