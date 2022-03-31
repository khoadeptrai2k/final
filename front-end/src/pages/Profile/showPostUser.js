import React from 'react'
import {Link} from 'react-router-dom'


const ShowPostUser = ({post}) => {
    console.log(post)

  return (
    <div className="showPostUser">
        {/* <div>{post.creator}</div> */}
        {
            post.map((index) => (
                <Link key={index._id} to="/">
                    <div className="showPost_display" >
                        <img src={index.images[0].url} alt={index.images[0].url} />
                        {index.creator}
                    </div>
                </Link>
            ))
        }
    <div className="test" gutterBottom variant="h5" component="h2">{post.title}</div>

    </div>
  )
}

export default ShowPostUser