import './HomePage.css';
import s2Img from '../../Assets/images/HPs2imgDiv.svg';
import WhyUsBlock from'./whyChooseNeigborBlock/whyChooseNeighbor.js';
import { Link } from 'react-router-dom';

function HomePage(){
    return(
        <>
            <section className="HPs1">
                <div className='HPs1Div'>
                    <h1>Hire Someone to <span className='todoit'>do it</span></h1>
                    <button>Hire a hero now</button>
                </div>
            </section>
            
            <section className="HPs2">
                <div className="HPs2Div">
                    <div className="s2LeftDiv">
                        <h2>What is <span className='styledNeighbor'>neighborHero</span> Doing?</h2>
                        <p>Neighbor Hero aims to create a community-driven platform connecting individuals in need of urgent 
                            assistance with individual local experts, fostering a sense of support and collaboration within 
                            neighborhoods. <br/>it will help the service seeker to get the service immediately at a fair price  
                            also will give the individuals who have expertise (heroes) -in specific fields-a part-time job 
                            with extra income
                        </p>
                    </div>

                    <div className="s2imageDiv">
                        <img src={s2Img} alt='someone '/>
                    </div>
                </div>
            </section>

            <section className='HPs3'>
                    <div>
                        <h2>Why Choose <span className='styledNeighbor'>neighborHero</span> as a User/Hero</h2>
                    </div>

                    <div className='whyUsDiv'>
                        <WhyUsBlock paragraph="save you tons of money by hiring heroes whos looking for chance"/>
                        <WhyUsBlock paragraph="offer the hero a flixiable working hours in any location of his/her choice"/>
                        <WhyUsBlock paragraph="gives chance for heroes for part time job opportunity"/>
                        <WhyUsBlock paragraph="Gives additional source of  income for heroes"/>
                        <WhyUsBlock paragraph="Compine thousands of services in one place"/>
                        <WhyUsBlock paragraph="helps you finish your task faster"/>
                    </div>
            </section>

            <section className='HPs4'>
                    <div>
                        <h2>Be part from<span className='styledNeighbor'>neighborHero</span>'s socity now!</h2>
                        <div className='HPs4Buttons'>
                            <Link to="/signup">
                                <button className='Hps4Butt1'>Become Hero</button>
                            </Link>

                            <Link to="/SearchForService">
                                <button className='Hps4Butt2'>Hire One</button>
                            </Link>
                        </div>
                    </div>

            </section>
        </>

    );
}

export default HomePage;