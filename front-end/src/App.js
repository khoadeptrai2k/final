import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';


const App = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
},[dispatch])

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Main />
      </div>
    </Router>
  );
}

export default App;
