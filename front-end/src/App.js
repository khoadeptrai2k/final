import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';
import io from 'socket.io-client'
import {ACTIONS} from './redux/actions/index'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io()
    dispatch({type: ACTIONS.SOCKET, payload: socket})
    return () => socket.close()
},[dispatch])

  return (
    <Router>
      <div className="App">
        <div>
        <Navbar/>
        <Main />

        </div>
      </div>
    </Router>
  );
}

export default App;
