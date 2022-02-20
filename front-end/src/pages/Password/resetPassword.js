import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../components/untils/notification/notification'
import { isLength, isMatch } from '../../components/untils/validation/validation'


const initialState ={
  password:'',
  cf_password:'',
  err:'',
  success:''
}

const ResetPassword = () => {
  const [data, setData] = useState(initialState)
  const {token} = useParams()

  const {password, cf_password, err, success} = data

  const handleChangeInput = i => {
    const {name, value} = i.target
    setData({...data, [name]:value, err:'', success:''})
  }

  const handleResetPass = async () =>{
    if(isLength(password))
      return setData({...data, err: "Password must be at least 6 characters.", success: ''})

    if(!isMatch(password,cf_password))
      return setData({...data, err: "Please enter the correct Password", success: ''})

    try {
      const res = await axios.post('/user/reset', {password},{
        headers:{Authorization: token}
      })
      return setData({...data,err: "", success:res.data.msg})
      
    } catch (err) {
      err.response.data.msg && setData({...data, err: err.reponse.data.msg, success:''})
      
    }
  }

  return (
    <div className="forgot_pass">
            <h2>Reset Your Password?</h2>

            <div className="forgot_form">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Enter your Password</label>
                <input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <label htmlFor="cf_password">Comfirm Password</label>
                <input type="cf_password" name="cf_password" id="cf_password" value={cf_password}
                onChange={handleChangeInput} />



                
                <button onClick={handleResetPass}>Reset Password</button>
            </div>
    </div>

  )
}

export default ResetPassword