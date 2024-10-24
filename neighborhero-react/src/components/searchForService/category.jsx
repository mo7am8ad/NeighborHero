import React from 'react';
import './category.css';

const CategoryBox = ({ backgroundImage, headerText }) => {
    return (
        
            <div className='categoryContainer'>
                <div className='categoryImgContainer' style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div className='categoryHeaderContainer'>
                    <h3>{headerText}</h3>
                </div>
            </div>
        
    );
}
export default CategoryBox;
