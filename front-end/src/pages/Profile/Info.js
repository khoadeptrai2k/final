import React, {useState, useEffect} from 'react'

import EditUser from './editUser'
// import {useSelector, useDispatch} from 'react-redux'
// import { fetchUser } from '../../redux/actions/profileAction';
import PostUser from './postUser';

const InfoUser = ({id, auth, profile, dispatch}) => {

    const [data, setData] = useState([])
    const [onEdit, setOnEdit] = useState(false)


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
                
                <div className='profileRightBottom'>
                    
                <PostUser
                    auth={auth} profile={profile} id={id}
                />

                {
                    data.map(user => (
                    <div className="rightbarInfo">
                    <h4 className="rightbarTitle">USER INFORMATION</h4>

                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Address:</span>
                            <span className="rightbarInfoValue">{user.address}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Mobile:</span>
                            <span className="rightbarInfoValue">{user.mobile}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Gender:</span>
                            <span className="rightbarInfoValue">{user.gender}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">About me ^^:</span>
                            <span className="rightbarInfoValue">{user.something}</span>
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
                    </div>
                    ))
                }
            </div>
            </div>    



        </div>
            
    )
}

export default InfoUser