
import React, {useEffect, useState} from 'react'

const TeirsPayment3 = () => {
    const[a, setA] = useState(0)

    useEffect(()=>{
        function handleClickT1(event) {
    
        console.log('handleClickT1');
      
    }

    function handleClickT2(event) {
    
        console.log('handleClickT2');
      
    }

    function handleClickT3(event) {
    
        console.log('handleClickT3');
      
    }

    window.document.getElementById("t1").addEventListener('click', handleClickT1);
    window.document.getElementById("t2").addEventListener('click', handleClickT2);
    window.document.getElementById("t3").addEventListener('click', handleClickT3);

    return () => {
      window.removeEventListener('click', handleClickT1);
      window.removeEventListener('click', handleClickT2);
      window.removeEventListener('click', handleClickT2);
    };

    },[])

  return(
    <div className="body1">
    <div class="pricing-table">
  
    <div id="t1" class="pricing-card">
      <h3>Basic</h3>
      <p class="price">$10/month</p>
      <ul>
        <li>5 Projects</li>
        <li>10GB Storage</li>
        <li>Email Support</li>
      </ul>
      <button>Choose Basic</button>
    </div>

   
    <div id="t2" class="pricing-card">
      <h3>Standard</h3>
      <p class="price">$20/month</p>
      <ul>
        <li>15 Projects</li>
        <li>50GB Storage</li>
        <li>Priority Support</li>
      </ul>
      <button>Choose Standard</button>
    </div>

   
    <div  id="t3" class="pricing-card">
      <h3>Premium</h3>
      <p class="price">$50/month</p>
      <ul>
        <li>Unlimited Projects</li>
        <li>200GB Storage</li>
        <li>24/7 Support</li>
      </ul>
      <button>Choose Premium</button>
    </div>
  </div>
  </div>)
}

export default TeirsPayment3;
