import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import the state interface and our combined reducers/sagas.
import { AppState, createReducer } from './index';

export default function configureStore(initialState: AppState): Store<AppState> {
  const composeEnhancers = composeWithDevTools({});
  return createStore(
    createReducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
}