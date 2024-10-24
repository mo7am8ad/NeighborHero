import react, { useEffect, useState } from 'react';
import './pay.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../utils/newRequest';
import {useParams} from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51PMlfOLxduJOMy7t7Qaxr3wMqdX6KJMRgi41d9TGG3OoZugFn4yCQKAIsju3fNB30ifU4r9ow7E2gCZiQbknR4me007F7CssZF");

const Pay = () =>{
  const [clientSecret, setClientSecret] = useState("");

  const {id} = useParams()

  useEffect(()=>{
    const makeRequest  = async ()=>{
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret)
      } 
      catch (err) {
        console.log(err);
      }
    };
    makeRequest()
  },[]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return(
    <div className="paymentContainer">
      <div className="Pay">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Pay