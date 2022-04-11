import { ACTIONS } from '../actions/index'

const socketReducer = (state = [], action) => {
    switch(action.type){
        case ACTIONS.SOCKET:
            return action.payload
        default:
            return state
    }
}

export default socketReducer