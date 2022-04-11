import React, {useState, useEffect} from 'react'
import ShowPostUser from './showPostUser'

const PostUser = ({id, profile}) => {
    const[post, setPost] = useState([])
    const[result, setResult] = useState([9])
    console.log(post)

    useEffect(() => {
        profile.postAuth.forEach(data =>{
            if(data._id === id ) {
                setPost(data.authPost)   
                setResult(data.result)
            }
        })
    },[profile.postAuth, id])
    return (
    <div className="showPost">
        <div className="showPostWrap">
            <ShowPostUser post={post} result={result}/>
        </div>
    </div>
  )
}

export default PostUser