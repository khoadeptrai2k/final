import ACTIONS  from "../actions";

const initialState = {
    users: [],
    ids: []

    // isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return action.payload
                    
        case ACTIONS.GET_USER:
            return {
                ...state,
                users: [...state.users,action.payload.user]
            }
        case ACTIONS.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };      

        default:
            return state
    }
}

export default authReducer