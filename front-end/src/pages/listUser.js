import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../redux/actions/usersAction'
import {Link} from 'react-router-dom'

const ListUser = () => {

    const {auth, users} = useSelector(state => state)
    console.log(auth, users)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchAllUsers(auth))
    },[dispatch, auth])

  return (
    <div>listUser
        <div style={{overflowX: "auto"}}>
                    <table className="customers">
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
                                                <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                {/* <i className="fas fa-trash-alt " title="Remove"
                                                onClick={() => handleDelete(user._id)} ></i> */}
                                                </td>
                                            }

        
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

export default ListUser