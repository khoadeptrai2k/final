import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'




const Profile = ({id,profile,auth,dispatch}) => {

    const [data, setData] = useState(initialState)
    const [onEdit, setOnEdit] = useState(false)

    const dispatch = useDispatch()


    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    useEffect(() => {
        if(id === auth.user._id){
            setData([auth.user])
        }else{
            const newData = profile.users.filter(user => user._id === id)
            setData(newData)
        }
    }, [id, auth, dispatch, profile.users])




    return (
        <div className="info">
            {
                data.map(user => (
                    <div className="info_container" key={user._id}>
                        <Avatar src={user.avatar} size="supper-avatar" />

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id
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
                            <p>{user.something}</p>
                        </div>

                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Profile