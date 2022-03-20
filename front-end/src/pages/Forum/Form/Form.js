import React, {useState} from 'react';
import 'boxicons';
import { useSelector, useDispatch } from 'react-redux';
import { ACTIONS } from '../../../redux/actions/index';


const Form = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const [data, setData] = useState('')
  const [preview, setPreview] = useState([])

console.log(preview)
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
    setPreview([...preview, ...newImages])
  }

  return (
    <div className='form_modal'>
      <form>
        
        <div className='form_header'>
          <h2 className='m-0'>Create New Post </h2>
          <span onClick={() => dispatch({
            type: ACTIONS.STATUS, payload: false
          })}>
            &times;
          </span>
        </div>

        <div className='form_body'>

          <textarea name="title" value={data}
          placeholder={`${auth.userHeader.name}, What are you sharing?`}
          onChange={e => setData(e.target.value)}
          />

          <div className='show_images'>
            {
              preview.map((img,index) =>(
                <div key={index} id='file_img'>
                  <img src={URL.createObjectURL(img)} all='images'/>
                </div>
              ))
            }
          </div>

          <div className='input_images'>
              <box-icon name='camera' type='solid' ></box-icon>
            <div className='file_upload'>
              <box-icon type='solid' name='file-image'></box-icon> 
              <input type="file" name="file" id="file" multiple accept='image/*'
              onChange={handleChangeImages}
              />
            </div>
          </div>

        </div>


        <div className='form_footer my-5'>
          <button className='btn btn-primary w-100'>Post</button>
        </div>


      </form>

    </div>
  )
}

export default Form;