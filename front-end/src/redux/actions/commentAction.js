import { postData } from '../api/authAPI'
import {ACTIONS} from './index'

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