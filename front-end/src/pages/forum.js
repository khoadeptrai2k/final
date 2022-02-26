import React, {useState, useEffect} from 'react';
import { Typography, Container, AppBar, Grow, Grid } from '@material-ui/core';
import useStyles from '../styles/forumStyles';

import Form from '../pages/Forum/Form/Form'

const Forum = () => {

    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();

  return (
    <Container maxWidth="lg">
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
    </AppBar>
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
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