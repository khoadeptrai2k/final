import React from 'react';
import Posts from '../pages/Forum/Posts/Posts';
import Newtus from '../pages/Forum/Form/Newtus'
import { useSelector } from 'react-redux';
import Form from './Forum/Form/Form';


const Forum = () => {
    const {status} = useSelector(state => state)
  return (
  <div className="forum row mx-0">
    <div div className="col-md-8">
    {status && <Form />}
          <Newtus />
          <Posts />
    </div>
    <div className="col-md-4">

    </div>
  </div>
  )
}

export default Forum