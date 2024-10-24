import React from 'react';
import './SignUp.css'
import upload from '../utils/upload.js';
import { useState } from 'react';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
    const [file,setFile] = useState(null)
    const [user,setUser] = useState({
        email:"",
        name:"",
        surname:"",
        username:"",
        password:"",
        country:"",
        city:"",
        phone:"",
        img:"",
        isSeller:false,
        desc:""
    });
    console.log(user)
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setUser(prev=>{
            return{...prev, [e.target.name]: e.target.value};
        });
    };
    const handleSeller = (e)=>{
        setUser(prev=>{
            return{...prev, isSeller: e.target.checked};
        });
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const url = await upload(file)
        try {
            await newRequest.post("/auth/Signup",{
                ...user,
                img:url,
            });
            navigate("/")
        } catch (err) {
            console.error(err);
            
        }
    }

   

    return (
        <div className='signupBG'>
            <div className='signupContainer'>
                <div className='signupOutter'>
                    <h3>Sign Up</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='signupInner'>
                        <div className='findReief'>
                            <h3>Find Relief: Hire an Expert Now.</h3>
                        </div>

                        <div className='UserAndSeller'>                    
                            <div className='normalUser'>
                                <div className='nameHolder'>
                                    <input name='name' placeholder='Name' onChange={handleChange}></input>
                                    <input name='surname' placeholder='Surname' onChange={handleChange}></input>
                                </div>
                                <div className='otherDataHolder'>
                                    <input name='email' placeholder='Email' onChange={handleChange}></input>
                                    <input name='username' placeholder='UserName' onChange={handleChange}></input>
                                    <input name='password' placeholder='Password' onChange={handleChange}></input>
                                    <input name='phone' placeholder='PhoneNumber' onChange={handleChange}></input>  
                                    <input name='file' className='fileBlock'type="file" onChange={e=>setFile(e.target.files[0])}></input>
                                </div>
                                  
                                <div className='countryHolder'>
                                    <input name='country' className='countryInput' placeholder='Country' onChange={handleChange}></input>
                                    <input name='city' className='cityInput' placeholder='City' onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className='wannaSeller'>
                                <input type="checkbox" onChange={handleSeller}/>
                                <textarea
                                    placeholder="A short description about yourself"
                                    name="desc"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        
                        
                        </div>
                        <button>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default SignUp;