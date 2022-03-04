import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import {createPost, updatePost } from '../../../redux/actions/posts';
import useStyles from './styles';
// import Upload from '../Posts/UploadVideo/upload';

const Form = ({currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    // const {auth} = useSelector((state) => state)
    // const {posts} = useSelector((state) => state.postsReducer)
    useEffect(() =>{
        if(post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile:''});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentId === 0) {
            dispatch(createPost(postData));
            clear();
        } else {
            dispatch(updatePost(currentId, postData));
            clear();
        }
    };
  
return(
    <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <div>
        {/* {
      auth.user._id === posts.Users &&
      <> */}
      <Typography variant="h6">
        
        {currentId ? `Editing "${post.title}"` : 'Create New Post'}
        
      </Typography>
      {/* </>
        } */}
      </div>
      <TextField name="creator" variant="outlined" label="Creator" fullWidth 
                value={postData.creator} 
                onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />

      <TextField name="title" variant="outlined" label="Title" fullWidth 
                value={postData.title} 
                onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

      <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} 
                value={postData.message} 
                onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

      <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth 
                value={postData.tags} 
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
      
        <div className={classes.fileInput}>
          <FileBase type="file" multiple accept="image/*,video/*" onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>

        {/* <Upload></Upload> */}
      
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    
    </form>
  </Paper>
)
}

export default Form;