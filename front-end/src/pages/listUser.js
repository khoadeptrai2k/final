import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../redux/actions/usersAction'
import {Link} from 'react-router-dom'
import axios from 'axios'
import FilesList from './Report/FilesList'
const ListUser = () => {

    const initialState = {
        name: '',
        err: '',
        success: ''
    }

    const {auth, users} = useSelector(state => state)
    console.log(auth, users)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const [data, setData] = useState(initialState)


    useEffect(() =>{
        dispatch(fetchAllUsers(auth))
    },[dispatch, auth])

    const handleDelete = async (id) => {
        try {
            if(users._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`api/delete/${id}`, {
                        headers: {Authorization: auth.token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

  return (
    <div> 
        <div style={{textAlign:'center'}}>
             <h1 style={{margin:'20px'}}>ADMIN MANAGER</h1>
        </div>
       
        <div>
            {loading && <h3>Loading.....</h3>}
        </div>
                <div style={{overflowX: "auto"}}>
                    <h3 style={{margin:'20px'}}>Table Users</h3>
                    <table className="adminListUser">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                :
                                                <td>
                                                <Link to={`/edit_user/${user._id}`}>
                                                <button className="" title="Edit">Edit</button>
                                                </Link>
                                                <button className="" title="Remove"
                                                onClick={() => handleDelete(user._id)} >Delete</button>
                                                </td>
                                            }

        
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
        <h3 style={{margin:'20px'}}>Table Users</h3>
        <FilesList/>
    </div>
  )
}

export default ListUser