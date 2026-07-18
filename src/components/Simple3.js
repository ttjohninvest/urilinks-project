import React, {useState} from "react";
import AddLinkPage from "./AddlinkPage";

const Simple3 = () => {
    const [showComponent, setShowComponent] = useState(false);

     const handleClick = (event) => {
    event.preventDefault()
    
    setShowComponent(true);
  };

return (
    <div>
         <div
          className={`website-background-color theHeight flexrowzc2 border-b-5 margin-left-n-19 font-roboto text-size-14 font-weight-500`}
          title=""
        >
          "Url Links Management Tool to add, view, delete and share them with others"
        </div>
    
   <div className="minWidth- bg-color-4">
               
               <a 
               id="adlinkid"
               href="#"
               className="cursor-pointer aw minWidth- alignCenter button-2w- b1xw1 button-link-4 ib text-size-5 bg-color-1- bg-color-1w bg-color-1w pointereventsauto width100  color-black-2 border5-"
               onClick={handleClick}>Add New Url Link</a>
   
               {showComponent && <AddLinkPage />}
             </div>
             </div>
)
};

export default Simple3;