import { ACTIONS } from '../actions/index';

const initialState = {
    users: [],
    ids: [],
    postAuth: [],
}


const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            }
        case ACTIONS.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };      
        case ACTIONS.GET_POSTS:
            return{
                ...state,
                postAuth: [...state.postAuth, action.payload]
            }

        default:
            return state
    }
}

export default profileReducer