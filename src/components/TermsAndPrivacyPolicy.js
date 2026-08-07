import React, {useEffect} from 'react'
import TermsOfService from './TermsOfService'
import PrivacyPolicy from './PrivacyPolicy'

const TermsAndPrivacyPolicy = () => {
    useEffect(()=>{
    document.title="urilinks (terms and privacy)"
  },[])
return(
    <div>
      <TermsOfService />
      <PrivacyPolicy />
    </div>
)
}

export default TermsAndPrivacyPolicy;