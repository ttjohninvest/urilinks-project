import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import linksReducer from '../reducers/links';
import links2Reducer from '../reducers/links2';
import linksReducerAll from '../reducers/linksall';
import filtersReducer from '../reducers/filters';
import linksfiledateReducer from '../reducers/linksfiledate';
import linksfiledateReducerAll from '../reducers/linksallfiledate';
import filtersfiledateReducer from '../reducers/filtersfiledate';
import authReducer from '../reducers/auth';
import settingsReducer from '../reducers/settings';
import hashtagsReducer from '../reducers/hashtags';

import hashtags2withcountReducer from '../reducers/hashtags2withcount';
import hashtags2Reducer from '../reducers/hashtags2';

import hashtags2withcount2Reducer from '../reducers/hashtags2withcount2';
import hashtagsfiledateReducer from '../reducers/hashtagsfiledate';
import hashtags2withcountfiledateReducer from '../reducers/hashtags2withcountfiledate';
import notetextReducer from '../reducers/notetext';
import setitReducer from '../reducers/setit';
import setitfiledateReducer from '../reducers/setitfiledate';
import storageReducer from '../reducers/storage';
import customeridReducer from '../reducers/customerid';
import theplanReducer from '../reducers/theplan';
import signupReducer from '../reducers/signup';
import hasrefreshedReducer from '../reducers/hasrefreshed';
import photourlReducer from '../reducers/photourl';
import emailReducer from '../reducers/email';
//import customeridReducer from '../reducers/customerid';
import subscriptionidReducer from '../reducers/subscriptionid';
import spReducer from '../reducers/sp';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      links: linksReducer,
      linksall: linksReducerAll,
      filters: filtersReducer,
      linksfiledate: linksfiledateReducer,
      linksallfiledate: linksfiledateReducerAll,
      filtersfiledate: filtersfiledateReducer,
      auth: authReducer,
      settings: settingsReducer,
      hashtags: hashtagsReducer,
      hashtags2withcount: hashtags2withcountReducer,
      hashtagsfiledate: hashtagsfiledateReducer,
      hashtags2withcountfiledate: hashtags2withcountfiledateReducer,
      notetext: notetextReducer,
      setit: setitReducer,
      setitfiledate: setitfiledateReducer,
      url: storageReducer,
      customerId: customeridReducer,
      theplan: theplanReducer,
      signup: signupReducer,
      hasrefreshed: hasrefreshedReducer,
      photourl: photourlReducer,
      email:emailReducer,
      //customerid: customeridReducer,
      subscriptionid:subscriptionidReducer,
      links2:links2Reducer,
      hashtags2: hashtags2Reducer,
      hashtags2withcount2: hashtags2withcount2Reducer,
      sp: spReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
