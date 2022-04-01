import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../redux/actions/usersAction'
import MemberItem from './Member/memberItem'

const Member = () => {

    const {auth, users} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchAllUsers(auth))
    },[dispatch, auth])

  return (
    <div style={memberStyle}> 
    MEMBER
      {users.map((member) => (
        <MemberItem key={member._id} member={member} />
      ))}
    </div>
  )
}
const memberStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem",
  };

export default Member