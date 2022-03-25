import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';
import Form from './pages/Forum/Form/Form';


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
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
