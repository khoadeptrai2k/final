import React, {useState, useEffect} from 'react';
import 'boxicons';
import { useSelector, useDispatch } from 'react-redux';
import { ACTIONS } from '../../../redux/actions/index';
import { createPost, updatePost } from '../../../redux/actions/posts';
import {useNavigate } from 'react-router-dom';
// import { showImage, showVideo } from '../../../components/untils/mediaShow';
import { toast } from 'react-toastify';

const Form = () => {
  const {auth, status} = useSelector(state => state)
  const dispatch = useDispatch()
  const [post, setPost] = useState({title:'', message:'', tags:''})

  const [images, setImages] = useState([])

  const {title, message, tags} = post
  const navigate = useNavigate()

  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err = ""
    let newImages = []

    files.forEach(file => {
        if(!file) return err = "Please choose file is existing."


        if(file.size > 1024 * 1024 * 5){
            return err = "please input image/video largest is 5mb."
        }

        return newImages.push(file)
    })

    if(err) dispatch({ type: ACTIONS.ALERT, payload: {error: err} })
    setImages([...images, ...newImages])
  }


  const handleInput = (e) => {
    const {name, value} = e.target
    setPost({...post, tags:value, [name]: value})
  }


  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }
  const handleSubmitForm = (e) =>{
    e.preventDefault()
    if(images.length === 0)
        return dispatch({ 
          type: ACTIONS.ALERT, payload: {error: "Please add your photo and Create Post"}
        })
    if(tags.length === 0)
        return dispatch({ 
          type: ACTIONS.ALERT, payload: {error: "Please add your Tag Category"}
        })


    if(status.onEdit){
      dispatch(updatePost({post,images,auth,status}))
      dispatch({ type: ACTIONS.STATUS, payload: false })
    }else{   
    dispatch(createPost({post, images, auth}))
  }
}


  
  useEffect(()=>{
    if(status.onEdit){
      setPost(status.images)
      setImages(status.images)
    }
  },[status])

   const showImage = (src, theme) => {
    return(
        <img src={src} alt="images" className="img-thumbnail"
        />
    )
}

 const showVideo = (src, theme) => {
    return(
        <video controls src={src} alt="images" className="img-thumbnail"
        />
    )
}

  return (
    <div className='form_modal'>
      <form onSubmit = {handleSubmitForm}>
        
        <div className='form_header'>
          <h2 className='m-0'>Create New Post </h2>
          <span onClick={() => dispatch({
            type: ACTIONS.STATUS, payload: false
          })}>
            &times;
          </span>
        </div>

        <div className='form_body'>

          <h3>Title: What are news Today?</h3>
          <textarea name="title" value={title}
          placeholder={`${auth.userHeader.name}, What are you sharing?`}
          onChange={handleInput}
          />
          <textarea name="message" value={message}
          placeholder="Write something?"
          onChange={handleInput}          
          />
          <select value={tags} onChange={handleInput} >
            <option value="Information Technology">Information Technology</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Marketing">Marketing</option>
          </select>


          <div className='show_images'>
            {
              images.map((img,index) =>(
                <div key={index} id='file_img'>
                  {
                    img.camera ? showImage(img.camera) : img.url 
                    ? <>
                      {
                        img.url.match(/video/i)
                          ? showVideo(img.url) : showImage(img.url)
                      }
                      </>
                      : 
                      <>
                      {
                          img.type.match(/video/i)
                            ? showVideo(URL.createObjectURL(img)) : showImage(URL.createObjectURL(img))
                      }
                      </>
                  }
                  <span onClick={() => deleteImages(index)}>&times;</span>

                </div>
              ))
            }
          </div>

          <div className='input_images'>
            <div className='file_upload'>
              <box-icon type='solid' name='file-image'/> 
              <input type="file" name="file" id="file" multiple accept='image/*,video/*'
              onChange={handleChangeImages}
              />
            </div>
          </div>

        </div>


        <div className='form_footer my-5'>
          <button className='btn btn-primary w-100' type="submit">Post</button>
        </div>


      </form>

    </div>
  )
}

export default Form