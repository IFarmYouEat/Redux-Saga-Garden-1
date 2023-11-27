import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Plantlist.css';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList);

    const getPlants = () => {
        dispatch({ type: 'FETCH_PLANTS' });
    }

    const removePlant = (id) => {
        dispatch({ type: 'REMOVE_PLANT', payload: id});
    }


    useEffect(() => {
        getPlants();
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
    }, []);

    return (
        <div id='plantlist-div'>
            <div>
                <h3>This is the plant list</h3>
            </div>
            <div id='plantlist-table'>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Kingdom</td>
                            <td>Clade</td>
                            <td>Order</td>
                            <td>Family</td>
                            <td>Subfamily</td>
                            <td>Genus</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reduxState.map((plant, index) =>
                            <tr key={plant.id}>
                                <td>{plant.name}</td>
                                <td>{plant.kingdom}</td>
                                <td>{plant.clade}</td>
                                <td>{plant.order}</td>
                                <td>{plant.family}</td>
                                <td>{plant.subfamily}</td>
                                <td>{plant.genus}</td>
                                <td><button onClick={() => removePlant(plant.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
            );
}

export default PlantList;
