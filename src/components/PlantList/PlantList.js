import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList);

    const getPlants = () => {
        dispatch({type: 'FETCH_PLANTS'});
    }


    useEffect(() => {
        getPlants();
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
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
                    <tr key={index}>
                        <td>{plant.name}</td>
                        <td>{plant.kingdom}</td>
                        <td>{plant.clade}</td>
                        <td>{plant.order}</td>
                        <td>{plant.family}</td>
                        <td>{plant.subfamily}</td>
                        <td>{plant.genus}</td> 
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default PlantList;
