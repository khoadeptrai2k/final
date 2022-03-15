import ACTIONS  from "../actions";

const initialState = {
    // user:[],
    // isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return action.payload
                    
        // case ACTIONS.GET_USER:
        //     return {
        //         ...state,
        //         user: action.payload.user,
        //         isAdmin: action.payload.isAdmin
        //     }
        default:
            return state
    }
}

export default authReducer