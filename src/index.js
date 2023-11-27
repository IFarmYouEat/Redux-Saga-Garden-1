import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { put, takeLatest} from 'redux-saga/effects'
import axios from 'axios';


const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      console.log(action.payload)
      return[...state, action.payload];
    case 'SET_PLANTS':
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
};

function* sendPlantToServer(action) {
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS'})
  } catch (error) {
    console.log('Error in addPlant', error);
    alert('could not add plant.')
    throw error;
  }
}

function* fetchPlants(){
  try{
    const response = yield axios.get('/api/plant');
    const action = { type: 'SET_PLANTS', payload: response.data};
    yield put(action);

  } catch(error){
    console.log('Error fetching elements', error);
    alert('Something went wrong fetching plants.');
  }
}

function* removePlant(action){
  try{
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({ type: 'FETCH_PLANTS'});
  } catch (error) {
  alert('Could not remove plant');
  console.log('Remove plant failed', error);
  throw error;
  }
}

function* rootSaga(){
  yield takeLatest('FETCH_PLANTS', fetchPlants);
  yield takeLatest('SEND_PLANT_TO_SERVER', sendPlantToServer);
  yield takeLatest('REMOVE_PLANT', removePlant)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ 
    plantList 
  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);