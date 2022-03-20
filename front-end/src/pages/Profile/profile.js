import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchUser } from '../../redux/actions/authAction'
import {useParams} from 'react-router-dom'


const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


const Profile = () => {
    const {auth, users} = useSelector(state => state)
    console.log(auth)
    const {id} = useParams()


    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(auth.ids.every(item => item !== id)){
    //       dispatch(fetchUser({ id, auth}))
    //     }
    //   },[dispatch, id, auth, auth.ids])

    // useEffect(() => {
    //     if(id === auth.userHeader?._id){
    //         setData([auth.userHeader])
    //         }else{
    //             const newData = auth.users.filter(user => user._id === id)
    //             setData(newData)
    //         }
    //     },[id, auth, auth.users])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }




  return (
    <>
        <div>

        </div>
        <div className="profile_page">
            <div className="col-left">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={users.name}
                    placeholder="Your name" onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={users.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password} onChange={handleChange} />
                </div>

                <div>
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>

                {/* <button disabled={loading} onClick={handleUpdate}>Update</button> */}
            </div>
        </div>
        </>
  )
}

export default Profile