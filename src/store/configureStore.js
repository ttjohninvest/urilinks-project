import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import linksReducer from '../reducers/links';
import linksReducerAll from '../reducers/linksall';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import settingsReducer from '../reducers/settings';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      links: linksReducer,
      linksall: linksReducerAll,
      filters: filtersReducer,
      auth: authReducer,
      settings: settingsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
