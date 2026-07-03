import React, { useEffect } from "react";

const Welcome=(props)=>{
    useEffect(()=>{
        console.log("Hello, from Simple")
    },[])
  return <h1>Hello, from Simple</h1>;
}