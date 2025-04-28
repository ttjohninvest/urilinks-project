import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetLinks } from './actions/links';
import { login, logout } from './actions/auth';
import getVisibleLinks from './selectors/links';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
//
const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
console.log(8)
  if (!hasRendered) {
    console.log("calling ReactDOM in the RenderApp function")
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  
  if (user) {
    console.log("3, user.uid="+user.uid)
    store.dispatch(login(user.uid));
    console.log("4, user.uid="+user.uid)
    store.dispatch(startSetLinks()).then(() => {
      console.log("4, calling renderApp")
      renderApp();
      if (history.location.pathname === '/') {
        console.log("9, calling the push('/dashboard') function after the call to renderApp function")
        history.push('/dashboard');
      }
    });
  } else {
    console.log(6)
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
