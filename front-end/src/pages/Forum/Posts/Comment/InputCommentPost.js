import React,{useState} from 'react'
import { createComment } from '../../../../redux/actions/commentAction'
import { useSelector, useDispatch } from 'react-redux'

export const InputCommentPost = ({comment, post, reply, setReply}) => {
    const [content, setContent] = useState('')
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmitComment = (e) =>{
        e.preventDefault()
            if(!content.trim()){
                if(setReply) return setReply(false);
                return;
            }
        
        const newComment = {
            user: auth.userHeader,
            content,
            likes:[],
            createAt: new Date().toISOString(),
            reply: reply && reply.commentId,
            tag: reply && reply.user
            }
            dispatch(createComment({post, newComment ,auth}))
            if(setReply) return setReply(false);

        }
  return (
    <div>
        <form className="card-footer inputCommentPost" onSubmit={handleSubmitComment}>
            {comment}
            <input type="text" placeholder="Comment something..."
                value={content} onChange={e => setContent(e.target.value)} />

            <button type="submit" className="postBtn">
                Comment
            </button>
        </form>
    </div>
  )
}
