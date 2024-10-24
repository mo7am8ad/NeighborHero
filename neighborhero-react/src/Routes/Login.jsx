import React from 'react';
import { useState } from 'react';
import './Login.css';
import newRequest from '../utils/newRequest.js';
import {useNavigate,useLocation} from 'react-router-dom'


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await newRequest.post("/auth/login",{email,password})
            localStorage.setItem("currentUser",JSON.stringify(res.data));//resfenerate object and local storage save string so we need to parse the object to data so we used json
            navigate(redirectTo)//after login so we can go homepage
            /*setError(err);
            console.log(err);*/
        }catch (err){
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data);
                setError(err.response.data.message); // Assuming your backend sends error messages in a 'message' field
            } else if (err.request) {
                // The request was made but no response was received
                console.log(err.request);
                setError("No response from server");
            } else {
                // Something else happened while setting up the request
                console.log("Error", err.message);
                setError(err.message);
            }
        }
        
    };

    return (
        <div className='signinBG'>
            <div className='signinContainer'>
                <div className='signinOuter'>
                    <h3>Login</h3>
                </div>
                <form className='signinInner' action='/UserMainPage.jsx' onSubmit={handleSubmit}>
                    <h3>Find Relief: Hire an Expert Now.</h3>
                    <input name='email' type='email' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
                    <input name='password' type='password' placeholder='Passwrod' onChange={e=>setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                    {error && error}
                </form>
            </div>
        </div>
        
    )
}
export default Login;