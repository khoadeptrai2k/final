import React, {useState, useEffect} from 'react'
import ItemCommentPost from './itemCommentPost'

const CommentPost = ({post, comment}) => {
    const [comments, setComments] = useState([])
    const [next, setNext] = useState(2)
    const [showComments, setShowComments] = useState([])


    useEffect(() =>{
        const newComment = post.comments.filter(cmt => !cmt.reply)
        setComments(newComment)
        setShowComments(newComment.slice(newComment.length - next))
    },[post.comments, next])
    


    

  return (
      <div className="commentPost">
            {
                    showComments.map(comment => (
                        <ItemCommentPost key={comment._id} comment={comment} post={post} 
                        />
                    ))
                }

                {
                    comments.length - next > 0
                    ? <div className="p-2 border-top"
                    style={{cursor: 'pointer', color: 'crimson'}}
                    onClick={() => setNext(next + 10)}>
                        See more comments...
                    </div>

                    : comments.length > 2 &&
                    <div className="p-2 border-top"
                    style={{cursor: 'pointer', color: 'crimson'}}
                    onClick={() => setNext(2)}>
                        Hide comments...
                    </div>
                }

          </div>

  )
}

export default CommentPost