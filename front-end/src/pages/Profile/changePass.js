import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../components/untils/imageUpload'
import { isLength, isMatch } from '../../components/untils/validation/validation'

import axios from 'axios'


const ChangePass = ({setChangePass}) => {

    const initState = {
        password:'', cf_password:'',err:'',success:''
    }
    const [data, setData] = useState(initState)
    const {password, cf_password, err, success} = data
   

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setData(auth.userHeader)
    }, [auth.userHeader])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const handleUpdate = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('api/reset', {password},{
                headers: {Authorization: auth.token}
            })

            setData({...data, err: '' , success: "update success"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    return (
        <div className="edit_profile">

            <form>
                <div className="form-group">
                    <label htmlFor="name">{auth.userHeader.name}</label>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={auth.userHeader.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={password}  onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password} onChange={handleChangeInput} />
                </div>

                <button type="submit" onClick={handleUpdate}>Update</button>
                <button className="button" style={{marginLeft:'50px', marginTop:'10px' }}
                    onClick={() => setChangePass(false)}>
                        Close
                </button>
            </form>
        </div>
    )
}

export default ChangePass