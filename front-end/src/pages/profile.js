import React, { useEffect, useState } from 'react'

import InfoUser from '../pages/Profile/Info'
import PostUser from '../pages/Profile/postUser'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../redux/actions/profileAction'
import { useParams } from 'react-router-dom'


const ProfileUser = () => {
    
    const { profile, auth } = useSelector(state => state)
    console.log(profile)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(fetchUser({id}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <div>
            
            <InfoUser auth={auth} profile={profile} dispatch={dispatch} id={id}/>
            <PostUser auth={auth} profile={profile} dispatch={dispatch} id={id}/>

        </div>
    )
}

export default ProfileUser