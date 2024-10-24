import React, { useEffect } from'react';
import {useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';

const Success = ()=>{ 

  const {search} = useLocation();
  const naviagte = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        await newRequest.put("/orders",{payment_intent})
        setTimeout(()=>{
          naviagte("/orders")
        },4000)
      } catch (err) {
        console.log(err)
      }
    }

    makeRequest();
  },[])

  return (
    <div className='successDiv'>
      <h1>payment successful</h1>
    
      <h2>
        you are being directed to the orders page please dont close the current page
      </h2> 
    </div>
  )
};

export default Success;