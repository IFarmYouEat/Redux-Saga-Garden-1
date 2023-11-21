import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { takeEvery, put} from 'redux-saga/effects'
import axios from 'axios';


const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

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

function* rootSaga(){
  yield takeEvery('FETCH_PLANTS', fetchPlants);
  

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