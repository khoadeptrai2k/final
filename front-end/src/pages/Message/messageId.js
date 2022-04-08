import React from 'react'
import LeftMessage from './MessageItem/leftMessage';
import RightMessage from './MessageItem/rightMessage';

const Message = () => {
  return (
      <div className='message d-flex'>
        <div className='col-md-3 border-right px-0'>
          <LeftMessage/>
        </div>

        <div className='col-md-8 px-0 right_mess'>
            <div className='d-flex justify-content-center 
                    align-items-center flex-column h-100'>
                  <RightMessage/>
            </div>
        </div>
      </div>
  )
}

export default Message