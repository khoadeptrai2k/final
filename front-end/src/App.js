import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Main from './components/main/main';

const App = () => {
  return (
    <Router>
        <Navbar />
        <Main />
    </Router>
  );
}

export default App;
