import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const initialState = {
  email: '',
  password:'',
  err:'',
  success:'',
}
const Login = () => {
  
  const [user, setUser] = useState(initialState)

  const {email, password, err, success} = user

    return (
      <div className="pages_login">
        <h2>Login</h2>

        <form>

          <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" placeholder="Enter Your Email" id="email"
                  value={email} name="email"/>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Your Password" id="password"
                  value={password} name="password"/>
          </div>

          <div className="row">
            <button type="submit">Login</button>
            <Link to="/forgot_password">Forgot your password?</Link>
          </div>

        </form>
      </div>
    );
  }
export default Login;
