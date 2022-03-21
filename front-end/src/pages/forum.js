import React,{useEffect} from 'react';
import Posts from '../pages/Forum/Posts/Posts';
import Newtus from '../pages/Forum/Form/Newtus'
import { useSelector, useDispatch } from 'react-redux';
import Form from './Forum/Form/Form';
import { getPosts } from '../redux/actions/posts';


const Forum = () => {
    const {status,auth} = useSelector(state => state)
    console.log(status)
    const dispatch = useDispatch()
    useEffect(()=>{
      if(auth.token) dispatch(getPosts(auth.token))
    }, [dispatch, auth.token])
  return (
  <div className="forum row mx-0">
    <div className="col-md-8">
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