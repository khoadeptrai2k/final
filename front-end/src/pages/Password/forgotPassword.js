import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../components/untils/validation/validation'
import {showErrMsg, showSuccessMsg} from '../../components/untils/notification/notification'

const initialState = {
    email: '',
    err: '',
    success: ''
}

const ForgotPassword = () => {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotpassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid emails.', success: ''})
            
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className="forgot_pass">
            <h2>Forgot Your Password?</h2>

            <div className="forgot_form">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email" value={email}
                onChange={handleChangeInput} />
                <button onClick={forgotpassword}>Verify your email</button>
            </div>
        </div>
    )
}

export default ForgotPassword