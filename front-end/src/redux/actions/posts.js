import {ACTIONS} from './index';
import { postData, getData, patchData, deleteData, putData } from '../api/authAPI'
import {imageUpload} from '../../components/untils/imageUpload'

export const getPosts = (auth) => async (dispatch) => {
  try {
    const {data} = await getData('getPosts', auth.token)
    dispatch({ type: ACTIONS.FETCH_ALL, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};

export const createPost = ({ post,images, auth}) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: ACTIONS.ALERT, payload: {loading: true} })
    if(images.length> 0) media = await imageUpload(images)
    const { data } = await postData('createPost', {...post,images: media}, auth.token);
    dispatch({ type: ACTIONS.CREATE, payload: data });
    dispatch({ type: ACTIONS.ALERT, payload: {loading: false} })

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })
  }
};

export const updatePost = ({id, post, auth, status, images}) => async (dispatch) => {
  let media = []
  const imgOld = images.filter(img => img.url)
  const imgNew = images.filter(img => !img.url)
  if(status.title === post.title && imgOld.length === status.images.length
    && imgNew.length === 0
    )
  return;
  try {
    dispatch({ type: ACTIONS.ALERT, payload: {loading: true} })

    if(imgNew.length > 0 ) media = await imageUpload(imgNew)
    const {data} = await patchData(`updatePost/${status._id}`, {...post, images: [...imgOld, ...media]}, auth.token, id);

    dispatch({ type: ACTIONS.UPDATE, payload: data});

    dispatch({ type: ACTIONS.ALERT, payload: {success: data.msg} })

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};

export const likePost = ({auth, post}) => async (dispatch) => {
  const newPost = {...post, likes: [...post.likes, auth.userHeader]}
  dispatch({ type: ACTIONS.UPDATE, payload: newPost})

  try {
    await patchData(`updatePost/${post._id}/like`, null , auth.token);

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};

export const unLikePost = ({auth, post}) => async (dispatch) => {
  const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.userHeader._id )}
  dispatch({ type: ACTIONS.UPDATE, payload: newPost})
console.log(newPost)

  try {
    await patchData(`updatePost/${post._id}/unlike`, null, auth.token);

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};

export const deletePost = ({auth, post}) => async (dispatch) => {

  try {
    const {data} = await deleteData(`deletePost/${post._id}`,auth.token);
    dispatch({ type: ACTIONS.DELETE, payload: data});

  } catch (error) {
    dispatch({
      type: ACTIONS.ALERT,
      payload: {error: error.response.data.msg}
  })  }
};

export const getPost = ({detailPost, id, auth}) => async (dispatch) => {
  if(detailPost.every(post => post._id !== id)){
      try {
          const res = await getData(`getPost/${id}`, auth.token)
          dispatch({ type: ACTIONS.GET_POST, payload: res.data.post })
      } catch (error) {
        dispatch({
          type: ACTIONS.ALERT,
          payload: {error: error.response.data.msg}
      })
      }
  }
}
