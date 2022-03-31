import React, {useState, useEffect} from 'react'
import ShowPostUser from './showPostUser'

const PostUser = ({id, profile}) => {
    const[post, setPost] = useState([])
    useEffect(() => {
        profile.postAuth.forEach(data =>{
            if(data._id === id) {
                setPost(data.authPost)   
            }
        })
    },[profile.postAuth, id])
    return (
    <div className="showPost">
        <div className="showPostWrap">
            <ShowPostUser post={post}/>
        </div>
    </div>
  )
}

export default PostUser