import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../components/untils/notification/notification'

const initialState = {
  name: '',
  email: '',
  password:'',
  password:'',
  err:'',
  success:'',
}
const Register = () => {
  
  const [user, setUser] = useState(initialState)


  const {name, email, password, cf_password, err, success} = user
  
  const handlePressInput = i =>{
    const{name, value} = i.target
    setUser({...user, [name]:value, err:'', success:''})
  }

  const handleSubmitted = async i => {
    i.preventDefault()
    try {
      
      
    } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success:''})
      
    }
  }

    return (
      <div className="pages_login">
        <h2>Register</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form onSubmit={handleSubmitted}>

          <div>
            <label htmlFor="name">Your Name</label>
            <input type="text" placeholder="Enter Your Name" id="name"
                  value={name} name="name" onChange={handlePressInput}/>
          </div>

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

          <div>
            <label htmlFor="cf_password">Re-Enter Password</label>
            <input type="password" placeholder="Re-Enter Your Password" id="cf_password"
                  value={cf_password} name="cf_password" onChange={handlePressInput}/>
          </div>

          <div className="row">
            <button type="submit">Register</button>
          </div>

        </form>

        <p>Already have an Account? <Link to="/login">Login</Link></p>
      </div>
    );
  }
export default Register;
