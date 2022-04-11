import React, { useEffect, useState } from 'react'

import InfoUser from '../pages/Profile/Info'
import PostUser from '../pages/Profile/postUser'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'


const ProfileUser = () => {
    
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(fetchUser({id}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <Grid container alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={12} >
                <InfoUser auth={auth} profile={profile} dispatch={dispatch} id={id}/>
            </Grid>
        </Grid>

    )
}

export default ProfileUser