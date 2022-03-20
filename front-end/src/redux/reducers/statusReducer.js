import ACTIONS from '../actions/index';


const statusReducer = (state = false, action) => {
    switch (action.type){
        case ACTIONS.STATUS:
            return action.payload;
        default:
            return state;
    }
}


export default statusReducer