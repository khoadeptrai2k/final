import React from 'react'
import LeftMessage from './MessageItem/leftMessage';

const Message = () => {
  return (
      <div className='message d-flex'>
        <div className='col-md-4 border-right px-0'>
          <LeftMessage/>
        </div>

        <div className='col-md-8 px-0 right_mess'>
            <div className='d-flex justify-content-center 
                    align-items-center flex-column h-100'>
                  <h5>Cai nay la cai khung chat giua 2 nguoi</h5>
            </div>
        </div>
      </div>
  )
}

export default Message