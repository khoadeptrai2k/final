import ACTIONS from './index'
import { getData } from '../api/authAPI'

export const fetchAllUsers = (auth) => async (dispatch) => {
    const res = await getData('all_infor', auth.token)
    try {
        dispatch({type: ACTIONS.GET_ALL_USERS, payload: res.data})
    } catch (error) {
        dispatch({ 
            payload: {
              error: error.response.data.msg 
            }
        })
    }
}

