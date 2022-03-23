import {imageUpload} from '../../components/untils/imageUpload'
import { getData , patchData } from '../api/authAPI'
import {ACTIONS} from './index'


export const fetchUser = ({auth, id}) => async (dispatch) => {
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

export const updateProfileUser = ({dataUser, avatar, auth}) => async (dispatch) => {
    console.log(dataUser)

    if(!dataUser.name)
    return dispatch({payload: {error: "Please add your name."}})

    if(dataUser.name.length > 25)
    return dispatch({payload: {error: "Your name too long."}})

    // if(data.something.length > 200)
    // return dispatch({payload: {error: "About something to you, short introduction"}})

    try {
        let media;

        if(avatar) media = await imageUpload([avatar])

        const res = await patchData("update", {
            ...dataUser,
            avatar: avatar ? media[0].url : auth.userHeader.avatar
        }, auth.token)

        console.log(res)

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

    } catch (err) {
        dispatch({
            payload: {error: err.response.data.msg}
        })
    }
}