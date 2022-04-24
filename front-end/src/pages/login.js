import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../components/untils/notification/notification'
import {dispatchLogin} from '../redux/actions/authAction'
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {

  const initialState = {
    email: '',
    password:'',
  }
  
  const [user, setUser] = useState(initialState)
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {email, password, err, success} = user
  
  const handlePressInput = i =>{
    const{name, value} = i.target
    setUser({...user, [name]:value})
  }

  const handleSubmitted = async i => {
    i.preventDefault()
    dispatch(dispatchLogin(user))
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
