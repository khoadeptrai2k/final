import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import HomeSection from './Home/homeSection';
import Intro from './Home/Intro/Intro';
import '../styles/home.css'
import Services from './Home/Services/Services';
const Home = () => {
  return (
    <div className='Home'>
        <Intro/>
        <Services/>
    </div>

  );
}

export default Home;
