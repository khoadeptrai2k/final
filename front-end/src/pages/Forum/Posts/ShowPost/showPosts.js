import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from '../styles';
import ShowPost from '../ShowPost/showPost';

const ShowPosts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={12}>
            <ShowPost post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default ShowPosts;