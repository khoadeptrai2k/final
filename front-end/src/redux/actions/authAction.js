import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = (res) => async (dispatch) =>{
    dispatch( {
        type: ACTIONS.LOGIN,
        payload: {user: res.data.user}
    })
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor',{
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser =  (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload:{
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}
