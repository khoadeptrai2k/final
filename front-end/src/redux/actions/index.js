export const ACTIONS = {

    //User

    LOGIN: 'LOGIN',
    GET_TOKEN: 'GET_TOKEN',
    GET_USER: 'GET_USER',
    GET_ID:'GET_USER_ID',
    GET_ALL_USERS: 'GET_ALL_USERS',
    GET_POST: 'GET_POST',
    GET_POSTS: 'GET_POSTS',

    //POST

    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    LIKE: 'LIKE',

    //STATUS

    STATUS: 'STATUS'
    

}

export default ACTIONS

export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}

export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}