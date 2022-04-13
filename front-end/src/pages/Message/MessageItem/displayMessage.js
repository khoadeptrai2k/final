import React from 'react'
import { showImage, showVideo } from '../../../components/untils/mediaShow'
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessages } from '../../../redux/actions/messageAction';
const DisplayMessage = ({member, msg}) => {
    const {auth, message} = useSelector(state => state)
    const dispatch = useDispatch()
    
    const handleDelete = () => {
        if(message.data)
            dispatch(deleteMessages({msg,message,auth}))
    }


  return (
    <>    
        <div className='chat_title'>
            <img style={{width: '25px',
                        height: '25px',
                        borderRadius: '50%'}} 
                src={member.avatar}/>
            <span>{member.name}</span>
        </div>
        <div className='you_content'>
            {member._id === auth.userHeader._id &&
                    <button className='mybuttonoverlap btn btn-info' onClick={handleDelete}>Delete</button>
            }
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
        <div>
        </div>

        </div>


    
        <div className='chat_time'>
            {new Date(msg.createdAt).toLocaleString()}
        </div>
    </>

  )
}

export default DisplayMessage