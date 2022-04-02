import React,{useState} from 'react'
import { createComment } from '../../../../redux/actions/commentAction'
import { useSelector, useDispatch } from 'react-redux'

export const InputCommentPost = ({comment, post}) => {
    const [content, setContent] = useState('')
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmitComment = (e) =>{
        e.preventDefault()
        if(!content.trim()) return;
        const newComment = {
            user: auth.userHeader,
            content,
            likes:[],
            createAt: new Date().toISOString()
            }
            dispatch(createComment({post, newComment ,auth}))
        }
  return (
    <div>
        <form className="card-footer inputCommentPost" onSubmit={handleSubmitComment}>
            <input type="text" placeholder="Comment something..."
                value={content} onChange={e => setContent(e.target.value)} />

            <button type="submit" className="postBtn">
                Comment
            </button>
        </form>
    </div>
  )
}
