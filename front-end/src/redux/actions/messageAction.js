import { ACTIONS } from './index';
import {postData, getData} from '../api/authAPI'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES'
}   


export const addUser = ({user, message}) => async (dispatch) =>{
    if(message.users.every(item => item._id !== user._id)){
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text:'',media:[]}})
    }
}

export const addMessage = ({msg, auth, socket}) => async (dispatch) =>{
    dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})

    socket.emit('createMessage', {...msg})
    try{
        await postData('message',msg,auth.token)
    }catch (error) {
        dispatch({type:ACTIONS.ALERT, payload:{error:error.response.data.msg}})
    }
}

export const getConversations = ({auth}) => async (dispatch) =>{
    try{
        const res = await getData('conversations', auth.token)
        let newArr = [];
        res.data.conversations.forEach(item =>{
            item.recipients.forEach(cv => {
                if(cv._id !== auth.userHeader._id){
                    newArr.push({...cv, text: item.text, media: item.media})
                }
            })
        })
        dispatch({type: MESS_TYPES.GET_CONVERSATIONS, payload: {newArr, result: res.data.result}})

    }catch(error){
        dispatch({type:ACTIONS.ALERT, payload:{error:error.response.data.msg}})
    }
}

export const getMessages = ({auth, id}) => async (dispatch) =>{
    try{
        const res = await getData(`message/${id}`,auth.token)
        dispatch({type: MESS_TYPES.GET_MESSAGES, payload:res.data})

    }catch(error){
        dispatch({type:ACTIONS.ALERT, payload:{error:error.response.data.msg}})

    }
}