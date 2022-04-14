import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import {TextField, Card, CardActions, CardContent, CardMedia, Button, Typography,Container } from '@material-ui/core/';
import moment  from 'moment'


import { likePost, unLikePost, deletePost } from '../../../../redux/actions/posts';

import ShowPosts from '../ShowPost/showPosts';
import ShowImage from './showImage';
import { ACTIONS } from '../../../../redux/actions/index';
import ButtonLike from '../../../../components/button/ButtonLike';
import CommentPost from '../Comment/CommentPost';
import { InputCommentPost } from '../Comment/InputCommentPost';


const Post = ({post}) => {
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [onShow, setOnShow] = useState(false)
  const [readMore, setReadMore] = useState(false)

  const [like, setLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)


  useEffect(()=>{
    if(post.likes.find(like => like._id === auth.userHeader._id)){
      setLike(true)
    }else{
      setLike(false)
    }
  },[post.likes, auth.userHeader._id])
  
  const handleLike = async () => {
    if(loadLike) return;

    setLoadLike(true)
    await dispatch(likePost({post, auth}))
    setLoadLike(false)
  } 
  const handleUnLike = async () => {
    if(loadLike) return;

    setLoadLike(true)
    await dispatch(unLikePost({post, auth}))
    setLoadLike(false)
  }
  // const handleSHowHide = () =>{
  //   if(menu === false){
  //     return setMenu(true)
  //   }
  //   return setMenu(false)
  
  // }


  const handleEdit = () =>{
    dispatch({type: ACTIONS.STATUS, 
      payload:{...post, onEdit:true}})
  }
  const handleDelete = () =>{
    dispatch(deletePost({post, auth}))
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
        <Button size="small" style={{ color: 'white',background:'black' }} onClick={handleDelete}> Delete</Button>
        </>

      }
    </div>
    

    </div>


    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.tags}</Typography>
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
      
      <div className='like'>
      <Typography>{post.likes.length} likes</Typography>
    
      <ButtonLike
        like={like}
        handleLike={handleLike}
        handleUnLike={handleUnLike}
      />



      </div>

      <div>
      <Typography>{post.comments.length} Comments</Typography>
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
    <Card className={classes.card}>
      <CommentPost post={post}></CommentPost>
      <InputCommentPost post={post}></InputCommentPost>
    </Card>


  </Container>
  
  )
}

export default Post