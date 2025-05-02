import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetLinks } from './actions/links';
import { login, logout } from './actions/auth';
//import getVisibleLinks from './selectors/links';
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
   useEffect(() => {
      const handlePopstate = (event) => {
        console.log("popstate")
        let scrollPosition = window.localStorage.getItem("scrollPosition");
        if (scrollPosition !== null) {
          window.scrollTo(0, parseInt(scrollPosition));
        }
      };
  
      window.addEventListener("popstate", handlePopstate);
  
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }, []);
console.log("about to render the app")
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  
  if (user) {
    console.log("logged in user="+JSON.stringify(user))    
    store.dispatch(login(user.uid));
    
    store.dispatch(startSetLinks()).then(() => { //startSetLinks reads the links from the db and stores them in redux
      
      renderApp(); //displays the array links stored in redux
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
