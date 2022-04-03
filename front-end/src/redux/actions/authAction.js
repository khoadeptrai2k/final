import {ACTIONS} from './index'
import { postData } from '../api/authAPI'

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

        dispatch({ 
            type: ACTIONS.ALERT, 
            payload: {
                success: res.data.msg
            } 
        })

      } catch (err) {
        dispatch({ 
            type: ACTIONS.ALERT, 
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

                dispatch({ type: ACTIONS.ALERT, payload: {} })

            } catch (err) {
                dispatch({ 
                    type: ACTIONS.ALERT, 
                    payload: {
                        error: err.response.data.msg
                    } 
                })
            }
    }
}


