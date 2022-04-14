import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/posts';


const PostList = () => {
    const {posts, auth} = useSelector(state => state)
    const dispatch = useDispatch()
   
    const handleDelete = () =>{
        dispatch(deletePost({posts, auth}))
      }
  
  return (
    <div> 
        <div>
        </div>
                <div style={{overflowX: "auto"}}>
                    <table className="adminListUser">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TitlePost</th>
                                <th>MemberPost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map(post => (
                                    <tr key={post._id}>
                                        <td>{post._id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.creator}</td>
                                        <td>
                                            <button onClick={handleDelete} className="" title="Remove"
                                        >Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
    </div>
  )
}

export default PostList