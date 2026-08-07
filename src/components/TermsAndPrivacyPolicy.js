import React, {useEffect} from 'react'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

const TermsAndPrivacyPolicy = () => {
    useEffect(()=>{
    document.title="urilinks (terms and privacy page)"
  },[])
return(
    <div>
      <div
          className={`website-background-color ${
            useButtons === true ? "width30p" : "width30pt"
          } theHeight flexrowzc2 border-b-5 margin-left-n-19 font-roboto text-size-16 font-weight-500`}
          title="You are welcome to use this Internet Links Organizer Dashboard (Usage Page)" //"You are welcome to use Internet Links Management Tool to add, view, delete and share your urls with others"
        >
         
            
              <span>Internet Links Organizer Dashboard's Terms and Privacy Page</span>
            
            
        </div>
      <TermsOfService />
      <PrivacyPolicy />
    </div>
)
}

export default TermsAndPrivacyPolicy;