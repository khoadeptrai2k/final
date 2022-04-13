import React,{useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserCardMessage from '../userCardMessage'
import { useParams } from 'react-router-dom'
import DisplayMessage from './displayMessage'
import ACTIONS from '../../../redux/actions'
import { showImage, showVideo } from '../../../components/untils/mediaShow'
import { imageUpload } from '../../../components/untils/imageUpload'
import { addMessage, getMessages, MESS_TYPES } from '../../../redux/actions/messageAction'


const RightMessage = () => {
  const {auth, message, socket} = useSelector(state => state)
  const {id} = useParams()
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [user, setUser] = useState([])
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)

  const [page,setPage] = useState(0)
  const refMessage = useRef()
  const pageEnd = useRef()

  // const [data,setData] = useState([])

  // useEffect(() => {
  //   const newData = message.data.filter(item => 
  //     item.sender === auth.userHeader._id || item.sender === id
  //     )
  //     setData(newData)
  // },[message.data, auth.userHeader._id, id])
  
  useEffect(() => {
    const newUser = message.users.find(user => user._id === id)
    if(newUser) setUser(newUser)
  },[message.users, id])
  
  const handleChangeFile = (e) =>{
    const files = [...e.target.files]
    let err = ""
    let newMedia = []

    files.forEach(file => {
        if(!file) return err = "Please choose file is existing."


        if(file.size > 1024 * 1024 * 5){
            return err = "please input image/video largest is 5mb."
        }

        return newMedia.push(file)
    })

    if(err) dispatch({ type: ACTIONS.ALERT, payload: {error: err} })
    setMedia([...media, ...newMedia])
  }

  const handleDeleteFile = (index) =>{
    const newArr = [...media]
    newArr.splice(index,1)
    setMedia(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!text.trim() && media.length === 0 ) return;
    setText('')
    setMedia([])
    setLoadMedia(true)

    let newArr = [];
    if(media.length > 0) newArr = await imageUpload(media)

    const msg = {
      sender: auth.userHeader._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }
    setLoadMedia(false)
    await dispatch(addMessage({msg, auth, socket}))
    if(refMessage.current){
      refMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
  }
  }

  useEffect(() =>{
    if(id){
      const getMessagesData = async () => {
          setPage(1)

          await dispatch(getMessages({auth, id}))

          if(refMessage.current){
            refMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
      }
      getMessagesData()
    }
  },[id, dispatch, auth]) 

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setPage(p => p + 1)
      }
    },{
      threshold: 0.1
    })
    observer.observe(pageEnd.current)
  },[setPage])
  
  useEffect(() => {
    if(message.resultData >= (page - 1) * 9 && page > 1){
      dispatch(getMessages({auth, id, page}))
    }
  },[message.resultData, page, id , auth, dispatch])

  useEffect(() => {
    if(refMessage.current){
      refMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
  }
  },[text])
  
  return (
    <>
    <div className='message_header'>
      {
        user.length!==0 &&      
        <UserCardMessage member={user}>
          <button className='fas fa-trash text-danger'>Delete</button>
        </UserCardMessage>
      }
    </div>
    
    <div className='chat_container'
      style={{height: media.length > 0 ? 'calc(100% - 180px)':''}}
    >
      <div className='chat_display' ref={refMessage}>
        <button ref={pageEnd} style={{marginTop: '-25px', opacity: 0}}>Load Message</button>
        {
          message.data.map((msg,index) => (
            <div key={index}>
              {
                msg.sender !== auth.userHeader._id &&
                <div className='chat_row other_message'>
                  <DisplayMessage member={user} msg={msg}/>
                </div>
              }  
              {
                msg.sender === auth.userHeader._id &&
                <div className='chat_row you_message'>
                  <DisplayMessage member={auth.userHeader} msg={msg}/>
                </div>
              }
            </div>
          ))
        }




      </div>
    </div>

    <div className='show_media' style={{display: media.length > 0 ? 'grid' :'none'}}>
      {
        media.map((item, index) => (
          <div key={index} id='file_media' >
            {
              item.type.match(/video/i)
              ? showVideo(URL.createObjectURL(item))
              : showImage(URL.createObjectURL(item))
            }
            <span onClick={() => handleDeleteFile(index)}>&times;</span>
          </div>
        ))
      }
    </div>

    <form className='chat_input' onSubmit={handleSubmit}>
      <input type='text' placeholder='chat with member...'
      value={text} onChange={e => setText(e.target.value)}
      />

      <div className='file_upload'>
        <box-icon type='solid' name='file-image'/>
        <input type='file' name='file' id='file'
        multiple accept='image/*,video/*' onChange={handleChangeFile}
        />
      </div>

      <button type='submit'
      disabled={(text || media.length > 0) ? false : true}
      >
        Send
      </button>
    </form>
    </>
  )
}

export default RightMessage