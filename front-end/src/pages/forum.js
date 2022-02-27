import React, {useState, useEffect} from 'react';
import { Typography, Container, AppBar, Grow, Grid } from '@material-ui/core';
import useStyles from '../styles/forumStyles';
import { getPosts } from '../redux/actions/posts';

import Posts from '../pages/Forum/Posts/Posts';
import Form from '../pages/Forum/Form/Form'

import { useDispatch } from 'react-redux';

const Forum = () => {

    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default Forum