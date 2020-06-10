import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
export default function configureStore() {

const initialState = {"simpleReducer": "teeth"};

return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}