import React,{useEffect, useState} from 'react';

const LoadingPage2 = () => {

    const [isLoading,setIsLoading]=useState(true)

      useEffect(()=>{
    
       setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Hide splash screen after 3 seconds
    //setIsLoading(false);
      }, []);

  return (
    <div>
  {isLoading===true?<div className="loader">
    {/* <img className="loader__image" src="/images/loader.gif" /> */}
    <img className="loader__image-" src="/images/splash.png" />
  </div>
  :<div>
  </div>}
  </div>
  
)

};

export default LoadingPage2;