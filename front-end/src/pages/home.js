import React, {useRef} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import HomeSection from './Home/homeSection';
import Intro from './Home/Intro/Intro';
import '../styles/home.css'
import Services from './Home/Services/Services';
import ScrollToTop from '../components/scroll/ScrollToTop';
import Works from './Home/Works/Works';
import Footer from './Home/Footer/Footer';
const Home = () => {
  const nextSection = useRef(1)
  const workSection= useRef(2)
  const gotoNextSection = () =>
   window.scrollTo({
      top: nextSection.current.offsetTop,
      behavior: 'smooth'
    })
  const gotoWorksSection = () =>
    window.scrollTo({
       top: workSection.current.offsetTop,
       behavior: 'smooth'
     })
  return (
    <div className='Home'>
        <Intro gotoNextSection={gotoNextSection}/>
        <div ref={nextSection}>
        <Services gotoWorksSection={gotoWorksSection} />
        </div >
        <div ref={workSection}>
        <Works/>
        </div>
        <ScrollToTop/>
        <Footer/>
    </div>

  );
}

export default Home;
