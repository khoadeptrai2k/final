import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import {createPost, updatePost } from '../../../redux/actions/posts';
import useStyles from './styles';

const Form = () => {

    const [data, setData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() =>{
        if(post) setData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setData({creator: '', title: '', message: '', tags: '', selectedFile:''});
    };

    const handleSubmit = async (e) => {
        i.preventDefault();
        if(currentId === 0) {
            dispatch(createPost(data));
            clear();
        } else {
            dispatch(updatePost(currentId, data));
            clear();
        }
    };
  
return(
    <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      
      <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
      
      <TextField name="creator" variant="outlined" label="Creator" fullWidth 
                value={data.creator} 
                onChange={(e) => setData({ ...data, creator: e.target.value })} />

      <TextField name="title" variant="outlined" label="Title" fullWidth 
                value={data.title} 
                onChange={(e) => setData({ ...data, title: e.target.value })} />

      <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} 
                value={data.message} 
                onChange={(e) => setData({ ...data, message: e.target.value })} />

      <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth 
                value={data.tags} 
                onChange={(e) => setData({ ...data, tags: e.target.value.split(',') })} />
      
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })} />
        </div>
      
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    
    </form>
  </Paper>
)
}

export default Form;