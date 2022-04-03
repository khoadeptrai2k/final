import { patchData, postData } from '../api/authAPI'
import {ACTIONS, EditData} from './index'

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
    } catch (err) {
        dispatch({ type: ACTIONS.ALERT, payload: {error: err.response.data.msg} })
    }
}