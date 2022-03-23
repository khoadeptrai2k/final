import ACTIONS  from "../actions";

const initialState = {

    // isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return action.payload;
                       

        default:
            return state
    }
}

export default authReducer