import React, {useState} from 'react';
import 'boxicons';
import { useSelector, useDispatch } from 'react-redux';
import { ACTIONS } from '../../../redux/actions/index';


const Form = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const [data, setData] = useState('')

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

          <div className='input_images'>
              <box-icon name='camera' type='solid' ></box-icon>
            <div className='file_upload'>
              <box-icon type='solid' name='file-image'></box-icon>              <input type="file" name="file" id="file" multiple accept='image/*'/>
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