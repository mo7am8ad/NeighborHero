import react from 'react';
import "./navbar.css"
import logo from '../../Assets/Logos/NeighborHeroLogo.svg'
import SearchIcon from '../../Assets/Logos/navBarSearchIcon.svg'
import messageIcon from '../../Assets/Logos/messageicon.svg';
import { Link } from "react-router-dom";    
import { useState } from "react";
import profilePhoto from '../../Assets/images/emptyProfile.jpeg';
import {useNavigate} from 'react-router-dom';
import newRequest from '../../utils/newRequest';




function Navvbar(){
    const [Open,setOpen] = useState(false);
    
    const currentUser= JSON.parse(localStorage.getItem("currentUser"));//turning the string to json 

    const navigate = useNavigate();
    
    const handleLogout = async ()=>{
        try{
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser",null);
            navigate("/");
        }catch (err){
            console.log(err)
        }
    };

    return( 
        <div className="NavContainer">
            <nav>
                <div className="navLogoContainer">
                    <Link className='link' to={'/'}><img className="logo" src={logo}/></Link>
                </div>

                <div className="nav2ndContainer">
                    {!currentUser?.isSeller && <Link className='link' to={'/SearchForService'}>
                            <div className='searchDivContain'>
                                <span>Search for Service</span>
                                <img className="navSearch" src={SearchIcon}/>
                            </div>
                        </Link>}
                    {!currentUser && <Link className='link' to = {'/SignUp'}><span>Become Hero</span></Link>}
                    {currentUser && <Link className='link' to={'./Messages'}><img className='messageIcon' src={messageIcon}/></Link>}
                </div>

                <div className="navLoginSignupContainer">
                    {!currentUser && <Link className='link' to={'/Login'}><span>Login</span></Link>}
                    {!currentUser && <Link className='link' to={'/SignUp'}><span>Signup</span></Link>}
                </div>

                {currentUser && (
                <div className="user" onClick={()=>setOpen(!Open)}>
                    <img src={currentUser.img || profilePhoto}/>
                    <span>{currentUser?.username}</span>
                    {Open && <div className="options">
                        {currentUser.isSeller && (
                            <>
                                <Link className='link sub' to={'/Add'}>Add</Link>
                                <Link className='link sub' to={'/MyGigs'}>My Services</Link>
                            </>
                        )
                        }
                        <Link className='link sub' to={'/Orders'}>{currentUser.isSeller? "Missions" : "Orders"}</Link>
                        <Link className='link sub' to={'/Messages'}>Messages</Link>
                        <Link className='link sub' to={'/EditProfile'}>Edit Profile</Link>
                        <Link className='link sub' onClick={handleLogout}>Logout</Link>
                    </div>
                    }
                </div>
                )}
            </nav>
        </div>       
    );
}

export default Navvbar;