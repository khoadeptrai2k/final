import axios from 'axios';
 
const url = 'http://localhost:4000/post';

export const fetchPosts = () => axios.get(`${url}/getPosts`);
export const createPost = (newPost) => axios.post(`${url}/createPost`, newPost);
export const likePost = (id) => axios.patch(`${url}/likePosts/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/updatePos${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/deletePost/${id}`);