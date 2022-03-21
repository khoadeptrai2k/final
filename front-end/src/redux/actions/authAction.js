import ACTIONS from './index'
import { postData, getData, patchData } from '../api/authAPI'

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

export const updateProfileUser = ({userData, avatar, auth}) => async (dispatch) => {
    if(!userData.name)
    return dispatch({payload: {error: "Please add your name."}})

    if(userData.name.length > 25)
    return dispatch({payload: {error: "Your name too long."}})

    if(userData.something.length > 200)
    return dispatch({payload: {error: "Your story too long."}})

    try {
        let media;
        dispatch({payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar])

        const res = await patchData("update", {
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token)

        dispatch({
            type: ACTIONS.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar,
                }
            }
        })

        dispatch({payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({
            payload: {error: err.response.data.msg}
        })
    }
}
