import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {Link} from 'react-router-dom'

import ButtonLike from '../../../../components/button/ButtonLike'
import CommentMenu from './commentMenu'

const ItemCommentPost = ({post, comment}) => {
    const [content, setContent] = useState('')
    const {auth} = useSelector(state => state) 
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(false)

    const [like, setLike] = useState(false)

    useEffect(() => {
        setContent(comment.content)
    }, [comment])

    const handleUnLike = () => {

    }

    const handleLike = () => {

    }

    const styleCard ={
        marginTop: '5px',
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' :'none'
    }

    return (
        <div className="itemCommentPost" style={styleCard}>

                <Link to={`/infor/${comment.user._id}`} style={{display:'flex'}} >
                    <img src={comment.user.avatar} />
                    <h6 style={{alignSelf: "center"}}>{comment.user.name}</h6> 
                </Link>
            
            <div className="comment_Content">
                    <div className="flex-fill">
                        <span>
                            {
                            content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '...'
                            }
                        </span>
                        {
                            content.length > 100 && 
                            <span className = "readMore" onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'Hide Comment' : 'Read More'}
                            </span>
                        }

                        <div style={{cursor: 'pointer'}}>                    
                            <small className="text-muted mr-3">
                                {moment(comment.createdAt).fromNow()}
                            </small>
                            <small className="" style={{margin:'10px', fontWeight: "bold"}}>
                                {comment.likes.length} likes
                            </small>

                            <small className="" style={{fontWeight: "bold"}}>
                                reply
                            </small>
                        </div>
                    </div>
                    

                    <div className="d-flex align-items-center mx-2">
                        <ButtonLike like={like} handleUnLike={handleUnLike}
                        handleLike={handleLike}
                        />
                        <CommentMenu post={post} comment={comment} auth={auth}
                        style={{display:'flex', alignItem:'center', cursor:'pointer'}}
                        />
                    </div>


            
            <div className="commentMenu">
            </div>
            
            </div>
            
        </div>
        
    )
}

export default ItemCommentPost