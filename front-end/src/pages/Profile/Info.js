import React, {useState, useEffect} from 'react'

import EditUser from './editUser'
// import {useSelector, useDispatch} from 'react-redux'
// import { fetchUser } from '../../redux/actions/profileAction';
import PostUser from './postUser';
import { Grid } from '@material-ui/core';
import ChangePass from './changePass';

const InfoUser = ({id, auth, profile, dispatch}) => {

    const [data, setData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [changePass, setChangePass] = useState(false)
 
console.log(id)
    useEffect(() => { 
        if(id === auth.userHeader?._id){
            setData([auth.userHeader])
        }else{
            const newData = profile.users.filter(user => user._id === id)
            setData(newData)
        }
      },[dispatch, id, auth, profile.users])
    

    return (
        <div className="profile">
            <div className="profileRight">
                
                <div className="profileRightTop">
                    {
                    data.map(user => (
                    <div className="profileRightTop" key={user._id}>
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                // src="assets/post/3.jpeg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.avatar} 
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.name}</h4>
                            <span className="profileInfoDesc">Contact Me: {user.email}</span>
                        </div>
                    </div>

                    ))
                    }    
                </div>
                
                <div  className='profileRightBottom'>
                
                    <div className="infoLeft">
                    {
                        data.map(user => (
                        <>
                        <h4 className="leftBarTitle">USER INFORMATION</h4>

                            <div className="infoLeft">
                                <span className="infoKey">Address:</span>
                                <span className="infoValue">{user.address}</span>
                            </div>

                            <div className="infoLeft">
                                <span className="infoKey">Mobile:</span>
                                <span className="infoValue">{user.mobile}</span>
                            </div>

                            <div className="infoLeft">
                                <span className="infoKey">Gender:</span>
                                <span className="infoValue">{user.gender}</span>
                            </div>

                            <div className="infoLeft">
                                <span className="infoKey">About me ^^:</span>
                                <span className="infoValue">{user.something}</span>
                            </div>

                            <div className="info_content_title">
                                    {
                                        user._id === auth.userHeader?._id
                                        ?  <button className="btn btn-outline-info"
                                        onClick={() => setOnEdit(true)}>
                                            Edit Profile
                                        </button>
                                        : <></>
                                    }

                            {
                                onEdit && <EditUser setOnEdit={setOnEdit} />
                            }
                            </div>
                            <div className="info_content_title">
                                    {
                                        user._id === auth.userHeader?._id
                                        ?  <button className="btn btn-outline-info"
                                        onClick={() => setChangePass(true)}>
                                            Change Password
                                        </button>
                                        : <></>
                                    }

                            {
                                changePass && <ChangePass setChangePass={setChangePass} />
                            }
                            </div>
                        </>
                        ))
                    }
                    </div>
                
                    <PostUser auth={auth} profile={profile} dispatch={dispatch} id={id}/>
                </div>

            </div>    
        </div>
            
    )
}

export default InfoUser