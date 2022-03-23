import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer';
import users from './usersReducer';
import posts from './postsReducer';
import status from './statusReducer'
import profile from './profileReducer'
export const reducers = combineReducers({
    auth,
    token,
    users,
    posts, 
    status,
    profile,
})