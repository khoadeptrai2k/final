import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Post from '../Post/Post';
import { getPost } from '../../../../redux/actions/posts';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from '../styles';


const ShowPosts = () => {
  const { id } = useParams()
  const [post, setPost] = useState([])

  const { auth, detailPost } = useSelector(state => state)
  const dispatch = useDispatch()
  const classes = useStyles();


  useEffect(() => {
      dispatch(getPost({detailPost, id, auth}))

      if(detailPost.length > 0){
          const newArr = detailPost.filter(post => post._id === id)
          setPost(newArr)
      }
  },[detailPost, dispatch, id, auth])

  return (
      // <div className="posts">
      //     {
      //         post.length === 0 &&
      //         <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      //     }

      //     {
      //         post.map(item => (
      //             <Post key={item._id} post={item} />
      //         ))
      //     }
      // </div>
      !post.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {post.map((item) => (
            <Grid key={item._id} item xs={12} sm={12} md={12}>
              <Post post={item} />
            </Grid>
          ))}
        </Grid>
      )
  )
}


export default ShowPosts;