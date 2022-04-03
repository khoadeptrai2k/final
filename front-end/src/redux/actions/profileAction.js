import {imageUpload} from '../../components/untils/imageUpload'
import { getData , patchData } from '../api/authAPI'
import {ACTIONS} from './index'


export const fetchUser = ({id}) => async (dispatch) => {

    dispatch({type: ACTIONS.GET_ID, payload: id})
    try {
            const res = getData(`infor/${id}`)
            const resAuthPost = getData(`authPost/${id}`)
            
            const users = await res
            const authPost = await resAuthPost
            dispatch({
                type: ACTIONS.GET_USER,
                payload: users.data
            })
            dispatch({
                type: ACTIONS.GET_POSTS,
                payload: {...authPost.data, _id: id}
            })
    } catch (error) {
        dispatch({
            type: ACTIONS.ALERT,
            payload: {error: error.response.data.msg}
        })
    }
}

export const updateProfileUser = ({dataUser, avatar, auth}) => async (dispatch) => {


    if(!dataUser.name)
    return dispatch({type: ACTIONS.ALERT, payload: {error: "Please add your name."}})

    if(dataUser.name.length > 25)
    return dispatch({type: ACTIONS.ALERT, payload: {error: "Your name too long."}})

    if(dataUser.something.length > 200)
    return dispatch({type: ACTIONS.ALERT, payload: {error: "About something to you, short introduction"}})

    try {
        let media;
        dispatch({type: ACTIONS.ALERT, payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar])

        const res = await patchData("update", {
            ...dataUser,
            avatar: avatar ? media[0].url : auth.userHeader.avatar
        }, auth.token)


        dispatch({
            type: ACTIONS.LOGIN,
            payload: {
                 ...auth,
                user: {
                    ...auth.userHeader, 
                    ...dataUser,
                    avatar: avatar ? media[0].url : auth.userHeader.avatar,
                }
            }
        })

        dispatch({type: ACTIONS.ALERT, payload: {success: res.data.msg}})

    } catch (error) {
        dispatch({
            type: ACTIONS.ALERT,
            payload: {error: error.response.data.msg}
        })
    }
}