import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import linksReducer from '../reducers/links';
import linksReducerAll from '../reducers/linksall';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import settingsReducer from '../reducers/settings';
import hashtagsReducer from '../reducers/hashtags';
import hashtags2withcountReducer from '../reducers/hashtags2withcount';
import notetextReducer from '../reducers/notetext';
import setitReducer from '../reducers/setit';
import storageReducer from '../reducers/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      links: linksReducer,
      linksall: linksReducerAll,
      filters: filtersReducer,
      auth: authReducer,
      settings: settingsReducer,
      hashtags: hashtagsReducer,
      hashtags2withcount: hashtags2withcountReducer,
      notetext: notetextReducer,
      setit: setitReducer,
      url: storageReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
