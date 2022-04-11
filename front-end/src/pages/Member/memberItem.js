import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const MemberItem = ({member}) => {
    const {auth} = useSelector(state => state)


    return (
      <div class="cardMember">
              <img
                  alt=""
                  src={member.avatar}
              />
              <div class="details">
                  <h5>Name: {member.name}</h5>
                  <p><Link to={`/infor/${member._id}`}>Info Member</Link></p>
                  {
                  auth.userHeader._id === member._id
                  ? <p></p>
                  : <p><Link to={`/message/${member._id}`}>Message</Link></p>
                  }
              </div>
      </div>
    )
  }

export default MemberItem