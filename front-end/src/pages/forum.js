import React,{useEffect} from 'react';
import Posts from '../pages/Forum/Posts/Posts';
import Newtus from '../pages/Forum/Form/Newtus'
import { useSelector, useDispatch } from 'react-redux';
import Form from './Forum/Form/Form';
import { getPosts } from '../redux/actions/posts';
import { Typography, Container, AppBar, Grow, Grid } from '@material-ui/core';
const Forum = () => {
    const {status,auth} = useSelector(state => state)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      if(auth.token) dispatch(getPosts(auth))
    }, [dispatch, auth])

  return (
  <div className="forum row mx-0">
    {status && <Form />}
    <Grow in>
    <Container>
    <Grid Grid container justify="space-between" alignItems="stretch" spacing={3}>
    <Grid item xs={12} sm={10}>

      <Newtus />
      </Grid>

      <Grid item xs={12} sm={10}>
        <Posts/>
      </Grid>
    </Grid>

    </Container>
    </Grow>

  </div>
  )
}

export default Forum