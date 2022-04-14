import React from 'react'
import './homeSection.css'
import '../../App.css'

const HomeSection = () => {
  return (
    <div className='homeSection-container'>
        <img src='/images/homeSection.png' className='imgHome'/>
        <h1>STUDY HOME IS COMING SOON</h1>
        <p>What are you waiting for?</p>
        <div className='homeSection-btns'>
            <button
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn--larger'
            >
                GET NOW
            </button>

        </div>
    </div>
  )
}

export default HomeSection