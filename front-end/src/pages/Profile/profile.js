import React, {useState, useEffect} from 'react'

import EditUser from '../Profile/editUser'
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { fetchUser } from '../../redux/actions/profileAction';
import authReducer from '../../redux/reducers/authReducer';
const Profile = () => {

    const [data, setData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const {id} = useParams()
    console.log(id)
    const dispatch = useDispatch()
    const {auth, profile} =useSelector(state => state)

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
          dispatch(fetchUser({ id, auth}))
        }
        if(id === auth.userHeader?._id){
            setData([auth.userHeader])
        }else{
            const newData = profile.users.filter(user => user._id === id)
            setData(newData)
        }
      },[dispatch, id, auth, profile.ids, profile.users])
    




    return (
        <div className="info">
            {
                data.map(user => (
                    <div className="info_container" key={user._id}>
                        {/* <Avatar src={user.avatar} size="supper-avatar" /> */}

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{user.name}</h2>
                                {
                                    user._id === auth.userHeader._id
                                    ?  <button className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}>
                                        Edit Profile
                                    </button>
                                    
                                    : <></>
                                }
                               
                                
                            </div>

                            <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                            <p className="m-0">{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <h6 className="m-0">{user.mobile}</h6>

                            <p>{user.something}</p>
                        </div>

                        {
                            onEdit && <EditUser setOnEdit={setOnEdit} />
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Profile