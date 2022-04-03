import { ACTIONS } from '../actions/index'

const initialState = {}

const alertReducer = (state = initialState, action) => {
    switch (action.type){
        case ACTIONS.ALERT:
            return action.payload;
        default:
            return state;
    }
}


export default alertReducer