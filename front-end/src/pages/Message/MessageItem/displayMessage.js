import React from 'react'
import { showImage, showVideo } from '../../../components/untils/mediaShow'

const DisplayMessage = ({member, msg}) => {
  return (
    <>    
        <div className='chat_title'>
            <img style={{width: '25px',
                        height: '25px',
                        borderRadius: '50%'}} 
                src={member.avatar}/>
            <span>{member.name}</span>
        </div>
        {msg.text && <div className='chat_text'>{msg.text}</div>}
        {
            msg.media.map((item, index) => (
                <div key={index}>
                    {
                        item.url.match(/video/i)
                        ?showVideo(item.url)
                        :showImage(item.url)
                    }
                </div>
            ))
        }

    
        <div className='chat_time'>
            {new Date(msg.createdAt).toLocaleString()}
        </div>
    </>

  )
}

export default DisplayMessage