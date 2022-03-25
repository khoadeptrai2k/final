import React, {useState} from 'react';
import 'boxicons';
import { useSelector, useDispatch } from 'react-redux';
import { ACTIONS } from '../../../redux/actions/index';
import { createPost } from '../../../redux/actions/posts';

const Form = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const [post, setPost] = useState({title:'', message:'', tag:''})

  const [images, setImages] = useState([])

  const {title, message, tag} = post


  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err = ""
    let newImages = []

    files.forEach(file => {
        if(!file) return err = "File does not exist."

        if(file.size > 1024 * 1024 * 5){
            return err = "The image/video largest is 5mb."
        }

        return newImages.push(file)
    })

    if(err) dispatch({payload: {error: err} })
    setImages([...images, ...newImages])
  }
  const handleInput = (e) => {
    const {name, value} = e.target
    setPost({...post, [name]: value})
}

  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }
  const handleSubmitForm = (e) =>{
    e.preventDefault()    
    dispatch(createPost({post, images, auth}))
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
          <textarea name="tag" value={tag}
          placeholder="hagtag new "
          onChange={handleInput}          
          />

          <div className='show_images'>
            {
              images.map((img,index) =>(
                <div key={index} id='file_img'>
                  <img src={URL.createObjectURL(img)} all="images"/>

                  <span onClick={() => deleteImages(index)}>&times;</span>

                </div>
              ))
            }
          </div>

          <div className='input_images'>
            <div className='file_upload'>
              <box-icon type='solid' name='file-image'></box-icon> 
              <input type="file" name="file" id="file" multiple accept='image/*'
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

export default Form;