import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
export default function configureStore() {
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const initialState = {"simpleReducer": "teeth"};
return createStore(
    rootReducer,
    // initialState,
    applyMiddleware(thunk)
  );
}