import {ACTIONS} from './index';
import { postData, getData, patchData, deleteData, putData } from '../api/authAPI'
import {imageUpload} from '../../components/untils/imageUpload'

export const getPosts = (auth) => async (dispatch) => {
  try {
    const { data } = await getData('getPosts', auth.token)
// console.log(data)
    dispatch({ type: ACTIONS.FETCH_ALL, payload: data });
    dispatch({payload: false})
  } catch (error) {
    // console.log(error.message);
  }
};

export const createPost = ({ post,images, auth}) => async (dispatch) => {
  let media = []
  try {
    if(images.length> 0) media = await imageUpload(images)
    const { data } = await postData('createPost', {...post,images: media}, auth.token);
    dispatch({ type: ACTIONS.CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
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
    if(imgNew.length > 0 ) media = await imageUpload(imgNew)
    const {data} = await patchData(`updatePost/${status._id}`, {...post, images: [...imgOld, ...media]}, auth.token, id);

    dispatch({ type: ACTIONS.UPDATE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = ({auth, id, post}) => async (dispatch) => {
  const newPost = {...post, likes: [...post.likes, auth.userHeader]}
  dispatch({ type: ACTIONS.UPDATE, payload: newPost})
console.log(newPost)

  try {
    await patchData(`likePosts/${post._id}/like`, null ,id, auth.token);

  } catch (error) {
    console.log(error.message);
  }
};

export const unLikePost = ({auth, id, post}) => async (dispatch) => {
  const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.userHeader._id )}
  dispatch({ type: ACTIONS.UPDATE, payload: newPost})
console.log(newPost)

  try {
    await patchData(`likePosts/${post._id}/unlike`, null ,id, auth.token);

  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id, auth) => async (dispatch) => {
  try {
    await deleteData('deletePost', id, auth.token);

    dispatch({ type: ACTIONS.DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
