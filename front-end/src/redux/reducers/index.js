import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer';
import users from './usersReducer';
import posts from './postsReducer'

export const reducers = combineReducers({
    auth,
    token,
    users,
    posts, 
})