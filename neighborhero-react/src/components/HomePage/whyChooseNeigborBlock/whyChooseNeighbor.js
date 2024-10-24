import React from 'react';
import './whyChooseNeighbor.css';

const block = ({paragraph}) => {
    return(
        <div className='WhyNeigborBlock'>
            <h3>NeighborHero</h3>
            <p>{paragraph}</p>
        </div>
    );
}

export default block;