import React, { useEffect } from "react";

const Simple=(props)=>{
    useEffect(()=>{
        console.log("Hello, from Simple")
    },[])
  return (
  <div>
  <h1>Hello, from Simple</h1>
</div>
)
}

export default Simple;