import ACTIONS from './index'
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

export const fetchUser = (auth, id) => async (dispatch) => {
    dispatch({type: ACTIONS.GET_ID, payload: id})
    try {
            const res = getData(`infor/${id}`, auth.token)

            const users = await res
            dispatch({
                type: ACTIONS.GET_USER,
                payload: users.data
            })
    } catch (error) {
        dispatch({
        payload: {
            error: error.response.data.msg 
          }
        })
    }
}

// export const dispatchGetUser =  (res) => {
//     return {
//         type: ACTIONS.GET_USER,
//         payload:{
//             user: res.data,
//             isAdmin: res.data.role === 1 ? true : false
//         }
//     }
// }
