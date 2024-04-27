import React from 'react';
import NavBar from './secondary/NavBar';
import Outfit from './secondary/Outfit';
import './styles/Home.css';
import { IoRestaurantSharp } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { GiBalloons, GiBigDiamondRing } from "react-icons/gi";
import { PiPants } from "react-icons/pi";
import { FaClock } from "react-icons/fa";

const Home = () => {
    return (
        <div className='col-12'>
            <div className='col-12'>
                <NavBar/>
            </div>
            <div className='row container-fluid'>
                <div className='col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-2 offset-lg-3 mt-5'>
                    <Outfit/>
                </div>
                <div className='row col-4 offset-2 mt-5'>
                    <div className='col-6 offset-3 col-sm-8 offset-sm-2 mb-2 p-3 recommendations'> 
                        <p><b>Collections</b></p>
                        <a href="/Community" className="custom-link"><b><IoRestaurantSharp size={24}/> BBQ</b></a>
                        <a href="/Community" className="custom-link"><b><MdFamilyRestroom size={24}/> Familiy</b></a>
                        <a href="/Community" className="custom-link"><b><GiBalloons size={24}/> Festival</b></a>
                    </div>
                    <div className='col-6 offset-3 col-sm-8 offset-sm-2 mt-2 p-3 recommendations'> 
                        <p><b>Community Ideas</b></p>
                        <a href="/Community" className="custom-link"><b><PiPants size={24}/> Bottoms</b></a>
                        <a href="/Community" className="custom-link"><b><GiBigDiamondRing size={24}/> Wedding Time</b></a>
                        <a href="/Community" className="custom-link"><b><FaClock size={24}/> Upcoming Events</b></a>
                    </div>
                </div>
            </div>
            
            
        </div>
        
    );
}

export default Home;
