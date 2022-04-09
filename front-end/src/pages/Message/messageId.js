import React from 'react'
import LeftMessage from './MessageItem/leftMessage';
import RightMessage from './MessageItem/rightMessage';

const Message = () => {
  return (
      <div className='message d-flex'>
        <div className='col-md-4 border-right px-0 left_mess'>
          <LeftMessage/>
        </div>

        <div className='col-md-8 px-0 right_mess'>
          <RightMessage />
        </div>
      </div>
  )
}

export default Message