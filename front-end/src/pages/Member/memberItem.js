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
                  <p>Message</p>
              </div>
      </div>
    )
  }

export default MemberItem