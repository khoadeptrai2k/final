import ACTIONS from './index'
import axios from 'axios'
import { postData, getData } from '../api/authAPI'

export const dispatchLogin = (user) => async (dispatch) =>{
    try {
        const res = await postData('login', user)
        dispatch({ 
            type: ACTIONS.LOGIN, 
            payload: {
                token: res.data.access_token, 
                userHeader: res.data.user
            } 
        })
        localStorage.setItem("firstlogin", true);
      } catch (err) {
        dispatch({ 
          payload: {
            error: err.response.data.msg 
          }
      })
}}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstlogin")
    if(firstLogin){
            try {
                const res = await postData('refresh_token')
                dispatch({ 
                    type: ACTIONS.LOGIN, 
                    payload: {
                        token: res.data.access_token, 
                        userHeader: res.data.user
                    } 
                })
            } catch (err) {
                dispatch({ 
                    payload: {
                        error: err.response.data.msg
                    } 
                })
            }
    }
}

// export const fetchUser = async (token) => {
//     const res = await axios.get('/user/infor', {
//         headers: {Authorization: token}
//     })
//     return res
// }

// export const dispatchGetUser =  (res) => {
//     return {
//         type: ACTIONS.GET_USER,
//         payload:{
//             user: res.data,
//             isAdmin: res.data.role === 1 ? true : false
//         }
//     }
// }
