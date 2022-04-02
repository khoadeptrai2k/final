import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {Link} from 'react-router-dom'

const ItemCommentPost = ({post, comment}) => {
    const [content, setContent] = useState('')
    const {auth} = useSelector(state => state) 
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(false)

    useEffect(() => {
        setContent(comment.content)
    }, [comment])

    return (
        <div className="itemCommentPost mt-2">

                <Link to={`/infor/${comment.user._id}`} className="d-flex text-dark">
                    <img src={comment.user.avatar} />
                    <h6 className="mx-1 mt-1">{comment.user.name}</h6> 
                </Link>
            
            <div className="comment_Content">
                    <div className="flex-fill">
                        {/* <span>
                            {
                            post.content.length < 100 ? content :
                                readMore ? content + ' ' : content.slice(0, 100) + '...'
                            }
                        </span>
                        {
                            post.content.length > 100 && 
                            <span className ="readMore" onclick = {() => setReadMore(!readMore)}>
                                {readMore ? 'Hide Comment' : 'Read More'}
                            </span>
                        } */}
                    </div>
                    <span>{comment.content}</span>

                    <small className="text-muted mr-3">
                        {moment(comment.createdAt).fromNow()}
                    </small>

                    <small className="text-muted mr-3">
                        {moment(comment.createdAt).fromNow()}
                    </small>

                    <small className="text-muted mr-3">
                        {moment(comment.createdAt).fromNow()}
                    </small>
            
            <div className="commentMenu">
            </div>
            
            </div>
            
        </div>
        
    )
}

export default ItemCommentPost