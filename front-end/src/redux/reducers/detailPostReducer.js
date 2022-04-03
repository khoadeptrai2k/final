import { ACTIONS } from '../actions/index'
import { EditData } from '../actions/index'

const detailPostReducer = (state = [], action) => {
    switch (action.type){
        case ACTIONS.GET_POST:
            return [...state, action.payload]
        case ACTIONS.UPDATE:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailPostReducer