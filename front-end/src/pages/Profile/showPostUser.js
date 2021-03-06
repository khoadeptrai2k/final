import moment from 'moment'
import React from 'react'
import {Link} from 'react-router-dom'


const ShowPostUser = ({post}) => {

  return (
    <div className="showPostUser">
        {
            post.map(index => (
                <Link key={index._id} to={`/post/${index._id}`}>
                    <div className="showPostUserWrap" >
                        <div className="postTop">
                            <div className="postTopleft">
                                <span className="postUsername">Title Post: {index.title}</span>
                                <span style={{margin:'20px'}} className="postDate">Day Create: {moment(index.createAt).format("MMM Do YY")}</span>
                                <img src={index.images[0].url} alt={index.images[0].url} />
                            </div>
                        </div>
                        
                    </div>
                </Link>
            ))
        }
    <div className="test" gutterBottom variant="h5" component="h2">{post.title}</div>

    </div>
  )
}

export default ShowPostUser