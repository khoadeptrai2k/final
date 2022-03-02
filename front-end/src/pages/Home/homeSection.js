import React from 'react'
import './homeSection.css'
import '../../App.css'
import Upload from '../Forum/Posts/UploadVideo/upload'

const HomeSection = () => {
  return (
    <div className='homeSection-container'>
        <img src='/images/homeSection.png'/>
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
          <Upload></Upload>
            
        </div>
    </div>
  )
}

export default HomeSection