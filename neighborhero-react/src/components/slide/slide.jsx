import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './slide.css';
import defaultImage from '../../Assets/images/emptyGigImg.jpg'; // Import default image

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center', // Center the image
  width: '100%', // Ensure full width
  height: '100%', // Ensure full height
};

const Slideshow = ({ images }) => {
  const imagesToShow = images && images.length > 0 ? images : [defaultImage]; // Use default image if no images provided

  return (
    <div className='outerSlideContainer'>
      <Slide>
        {imagesToShow.map((image, index) => (
          <div className='slide-container' key={index}>
            <div className='imageSlideBox' style={{ ...divStyle, backgroundImage: `url(${image})` }}></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
