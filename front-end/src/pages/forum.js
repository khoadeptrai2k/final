import React,{useEffect} from 'react';
import Posts from '../pages/Forum/Posts/Posts';
import Newtus from '../pages/Forum/Form/Newtus'
import { useSelector, useDispatch } from 'react-redux';
import Form from './Forum/Form/Form';
import { getPosts } from '../redux/actions/posts';
import { Typography, Container, AppBar, Grow, Grid } from '@material-ui/core';
const Forum = () => {
    const {status,auth, posts} = useSelector(state => state)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      if(auth.token) dispatch(getPosts(auth))
    }, [dispatch, auth])

  return (
  <div className="forum row mx-0">
    
    {status && <Form />}

    <div className="col-md-8">

    <Grid item xs={12} sm={9}>
      <Newtus />
    </Grid>

    <Grid item xs={12} sm={9}>
        {
          posts.map((posts) =>(
            <div key={posts._id}>
            <Posts post={posts} />
        </div>
          ))
        }
    </Grid>
    </div>
  </div>
  )
}

export default Forum