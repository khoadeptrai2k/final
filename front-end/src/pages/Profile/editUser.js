import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../components/untils/imageUpload'
import { updateProfileUser } from '../../redux/actions/profileAction'

const EditProfile = ({setOnEdit}) => {
    const initState = {
        name: '', mobile: '', address: '', website: '', something: '', gender: ''
    }
    const [dataUser, setDataUser] = useState(initState)
    const { name, mobile, address, something, gender } = dataUser
    const [avatar, setAvatar] = useState('')

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setDataUser(auth.userHeader)
    }, [auth.userHeader])


    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if(err) return dispatch({
         payload: {error: err}
        })
        setAvatar(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setDataUser({...dataUser, [name]:value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({dataUser, avatar, auth}))
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
            onClick={() => setOnEdit(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.userHeader.avatar} 
                    alt="avatar"/>
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="name" value={name} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {name.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={mobile}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="something">Write Something About You</label>
                    <textarea name="something" value={something} cols="30" rows="4"
                    className="form-control" onChange={handleInput} />

                    {/* <small className="text-danger d-block text-right">
                        {something.length}/200
                        
                    </small> */}
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile