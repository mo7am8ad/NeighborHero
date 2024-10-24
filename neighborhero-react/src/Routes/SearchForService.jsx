import React from 'react';
import './SearchForService.css';
import CategoryBox from '../components/searchForService/category.jsx';
import searchIconService from'../Assets/Logos/search icon for search service.svg';
import filterIconService from'../Assets/Logos/filter search for service.svg';
import mechanic from '../Assets/Logos/mechanic.png';
import electrician from '../Assets/Logos/electrician.png'
import plumber from '../Assets/Logos/plumber.png'
import coach from '../Assets/Logos/coach.png'
import designer from '../Assets/Logos/designer.png'
import driver from '../Assets/Logos/driver.png'
import IT from '../Assets/Logos/IT.png'


import { Link } from 'react-router-dom';

const Search = () => {
    return (
        <div className='searchForServContainer'> 
            <div className='searchContainer'>
                <input placeholder='Search For Service or Choose Category' type='text'></input>
                <img className='searchForServSerarchIcon' src={searchIconService}/>
                <img className='searchForServFilter' src={filterIconService} />
            </div>
            <div className='categoryCardsContainer'>
                <Link className='link' to="/service?catigory=Mechanics">
                    <CategoryBox 
                        backgroundImage={mechanic}
                        headerText="Mechanics"
                    />
                </Link>
                <Link className='link' to="/service?catigory=Electrician">
                    <CategoryBox 
                        backgroundImage={electrician}
                        headerText="Electrician"
                    />
                </Link>
                <Link className='link' to="/service?catigory=Plumber">
                    <CategoryBox 
                        backgroundImage={plumber}
                        headerText="Plumber"
                    />
                </Link>
                <Link className='link' to="/service?catigory=Trainer">
                    <CategoryBox 
                        backgroundImage={coach}
                        headerText="Personal Trainer"
                    />
                </Link>
                <Link className='link' to="/service?catigory=Designer">
                    <CategoryBox 
                        backgroundImage={designer}
                        headerText="Designer"
                    />
                </Link>
                <Link className='link' to="/service?catigory=Driver">
                    <CategoryBox 
                        backgroundImage={driver}
                        headerText="Driver"
                    />
                </Link>
                <Link className='link' to="/service?catigory=IT">
                    <CategoryBox 
                        backgroundImage={IT}
                        headerText="IT Technician"
                    />
                </Link>
                <Link className='link' to="/service?catigory=Other">
                    <CategoryBox 
                        backgroundImage={electrician}
                        headerText="Other"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Search;
