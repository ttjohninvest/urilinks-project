import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import linksReducer from '../reducers/links';
import links2Reducer from '../reducers/links2';
import links3Reducer from '../reducers/links3';
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
import thetotalstarsReducer from '../reducers/thetotalstars';
import thetotalloggedoutReducer from '../reducers/thetotalloggedout';
import theuserscountReducer from '../reducers/theuserscount';
import thesignupcountReducer from '../reducers/thesignupcount';
import theuserscountiReducer from '../reducers/theuserscounti';
import thesharablelinkReducer from '../reducers/thesharablelink';
import thehashtagsisopenReducer from '../reducers/thehashtagsisopen';
import theupdatedateReducer from '../reducers/theupdatedate';
import theloggedinReducer from '../reducers/theloggedin';
import signupReducer from '../reducers/signup';
import hasrefreshedReducer from '../reducers/hasrefreshed';//
import photourlReducer from '../reducers/photourl';
import emailReducer from '../reducers/email';
//import customeridReducer from '../reducers/customerid';
import subscriptionidReducer from '../reducers/subscriptionid';
import spReducer from '../reducers/sp';
import peopleReducer from '../reducers/people';
import gudReducer from '../reducers/gud';
import bmokReducer from '../reducers/bmok';
import frommenuReducer from '../reducers/frommenu';

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
      frommenu:frommenuReducer,
      setitfiledate: setitfiledateReducer,
      url: storageReducer,
      customerId: customeridReducer,
      theplan: theplanReducer,
      thetotalstars: thetotalstarsReducer,
      thetotalloggedout: thetotalloggedoutReducer,
      theuserscount: theuserscountReducer,
      thesignupcount: thesignupcountReducer,
      theuserscounti: theuserscountiReducer,
      thesharablelink: thesharablelinkReducer,
      thehashtagsisopen: thehashtagsisopenReducer,
      theloggedin: theloggedinReducer,
      theupdatedate: theupdatedateReducer,
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
      people: peopleReducer,
      gud: gudReducer,
      links3:links3Reducer,
      bmok:bmokReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
