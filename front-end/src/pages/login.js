import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../components/untils/notification/notification'
import {dispatchLogin} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const initialState = {
  email: '',
  password:'',
  err:'',
  success:'',
}
const Login = () => {
  
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {email, password, err, success} = user
  
  const handlePressInput = i =>{
    const{name, value} = i.target
    setUser({...user, [name]:value, err:'', success:''})
  }

  const handleSubmitted = async i => {
    i.preventDefault()
    try {
      const res = await axios.post('/user/login', {email, password})
      setUser({...user, err: '', success: res.data.msg})

      localStorage.setItem('firstLogin', true)

      dispatch(dispatchLogin())
      navigate('/home')

    } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success:''})
      
    }
    
  }

    return (
      <div className="pages_login">
        <h2>Login</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmitted}>

          <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" placeholder="Enter Your Email" id="email"
                  value={email} name="email" onChange={handlePressInput}/>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Your Password" id="password"
                  value={password} name="password" onChange={handlePressInput}/>
          </div>

          <div className="row">
            <button type="submit">Login</button>
            <Link to="/forgot_password">Forgot your password?</Link>
          </div>

        </form>

        <p>Create New Account? <Link to="/register">Register</Link></p>
      </div>
    );
  }
export default Login;
