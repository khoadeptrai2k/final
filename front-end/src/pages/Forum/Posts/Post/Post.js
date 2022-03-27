import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,Container } from '@material-ui/core/';
import {Link} from 'react-router-dom'
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment  from 'moment'


import { likePost, deletePost } from '../../../../redux/actions/posts';

import ShowPosts from '../ShowPost/showPosts';
import { deleteData } from '../../../../redux/api/authAPI';
import ShowImage from './showImage';
import { ACTIONS } from '../../../../redux/actions/index';


const Post = ({post}) => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch();
  const classes = useStyles();
  const [onShow, setOnShow] = useState(false);
  const [readMore, setReadMore] = useState(false)

  const handleEdit = () =>{
    dispatch({type: ACTIONS.STATUS, 
      payload:{...post, onEdit:true}})
  }
  
  return (
    <Container className={classes.container}>
    {
           post.images.length > 0 && <ShowImage images={post.images} id={post._id} />
    }  
    <Card className={classes.card}>
    <Card className={classes.card}>
      <Typography variant="h6">
        {post.creator}
      </Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </Card>
    

    <div>

    <div className={classes.overlay2}>
      {
        auth.userHeader._id == post.userId &&
        <>
        <Button style={{ color: 'white', background:'black' }} size="small" onClick={handleEdit}>EDIT</Button>
        <Button size="small" style={{ color: 'white',background:'black' }} onClick={() => dispatch(deleteData(post._id))}> Delete</Button>
        </>

      }
    </div>
    

    </div>


    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
    </div>
    
    <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
    
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
      <span>
      {
      post.message.length < 60 ? post.message : readMore ? post.message + '' : post.message.slice(0,60) + ' ...'
      }
      </span>
      {
      post.message.length > 60 && 
      <span className='readMore' style={{color:'black', cursor: 'pointer',}} onClick={() => setReadMore(!readMore)}>
        {readMore ? 'Hide' : 'Read'}
      </span>
      }
      </Typography>
    </CardContent>
    
    <CardActions className={classes.cardActions}>
      <div>
      {post.likes.length}
      <Button size="small" color="primary" 
            onClick={() => dispatch(likePost(post._id))}> Like {post.likeCount}   
      </Button>
      </div>

      <div>
      {post.comments.length}
      <Button size="small" color="primary" > Comment   
      </Button>
      </div>

       <Button size="small" color="primary" 
      onClick={() => setOnShow(true)}> ShowMore</Button>
                      {
                    onShow && 
                    <ShowPosts
                    setOnShow={setOnShow}  
                    />
                }

    
    </CardActions>
  </Card>

  </Container>
  
  )
}

export default Post