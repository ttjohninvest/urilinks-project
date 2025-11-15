import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { history } from "../routers/AppRouter";
import LoadingPage from './LoadingPage'

const NotFoundPage = () => {
useEffect(()=>{
history.push("/");
},[])
  return(<div>
    <LoadingPage />
    {/* <Link to="/">Go home</Link> */}
  </div>)
};

export default NotFoundPage;
