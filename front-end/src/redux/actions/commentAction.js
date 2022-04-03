import {patchData, postData } from '../api/authAPI'
import {ACTIONS, DeleteData, EditData} from './index'

export const createComment = ({post, newComment, auth}) => async (dispatch) =>{

    const newPost = {...post, comments: [...post.comments, newComment]}
    dispatch({type: ACTIONS.UPDATE, payload: newPost})
    try{
        const data = {...newComment, postId: post._id}
        const res = await postData('comment', data, auth.token)
        
        const newData = {...res.data.newComment, user: auth.userHeader}
        const newPost = {...post, comments: [...post.comments, newData]}
        dispatch({type: ACTIONS.UPDATE, payload:newPost})

    } catch (error) {
        dispatch({
            payload: {
            error: error.response.data.msg 
          }})
    }
}

export const updateComment = ({comment, post, content, auth}) => async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newComments}
    
    dispatch({ type: ACTIONS.UPDATE, payload: newPost })
    try {
        patchData(`comment/${comment._id}`, { content }, auth.token)
    } catch (error) {
        dispatch({
            payload: {
            error: error.response.data.msg 
          }})
    }
}

export const likeComment = ({comment, post, auth}) => async (dispatch) => {
    const newComment = {...comment, likes: [...comment.likes, auth.userHeader]}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
    dispatch({ type: ACTIONS.UPDATE, payload: newPost })

    try {
        await patchData(`comment/${comment._id}/like`, null, auth.token)
    } catch (error) {
        dispatch({
            payload: {
            error: error.response.data.msg 
          }})
    }
}

export const unLikeComment = ({comment, post, auth}) => async (dispatch) => {

    const newComment = {...comment, likes: DeleteData(comment.likes, auth.userHeader._id)}

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = {...post, comments: newComments}
    
    dispatch({ type: ACTIONS.UPDATE, payload: newPost })

    try {
        await patchData(`comment/${comment._id}/unlike`, null, auth.token)
    } catch (error) {
        dispatch({
            payload: {
            error: error.response.data.msg 
          }})
    }
}