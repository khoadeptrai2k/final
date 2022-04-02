import React from 'react'
import ItemCommentPost from './itemCommentPost'

const CommentPost = ({post}) => {
  return (
      <div className="commentPost">
            {
                post.comments.map(comment => (
                    <ItemCommentPost key={comment._id} comment={comment} post={post} />
                ))
            }
        </div>
  )
}

export default CommentPost