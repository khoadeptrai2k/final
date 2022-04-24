import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import { showErrMsg, showSuccessMsg } from '../components/untils/notification/notification'
import { postData } from '../redux/api/authAPI'
const ActivateEmail = () => {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activateEmail = async () =>{
                 try {
                     const res = await postData('activation', {activation_token})
                     setSuccess(res.data.msg)
                     
                 } catch (err) {
                     err.response.data.msg && setErr()
                     
                 }
            }
            activateEmail()
        }
    },[activation_token])

    return (
        <div className='page_active'>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
  )
}

export default ActivateEmail