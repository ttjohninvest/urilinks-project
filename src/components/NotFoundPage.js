import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { history } from "../routers/AppRouter";

const NotFoundPage = () => {
useEffect(()=>{
history.push("/");
},[])
  return(<div>
    
    {/* <Link to="/">Go home</Link> */}
  </div>)
};

export default NotFoundPage;
