import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Form = () => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const [data, setData] = useState('')

  return (
    <div>
      <form>
        <div className='form_modal'></div>
        <div className='form_header'>
        </div>

        <div className='form_body'>
          <textarea name="title" value={data}
          placeholder={`${auth.userHeader.name}, What are you sharing?`}
          onChange={e => setData(e.target.value)}
        />

          <div className='input_images'>
            <i className='fas fa-camera'/>

            <div className='file_upload'>
              <i className='fas fa-image'/>
              <input type="file" name="file" id="file" multiple accept='image/*'/>
            </div>
          </div>
          
        </div>


        <div className='form_modal'></div>

      </form>

    </div>
  )
}

export default Form;