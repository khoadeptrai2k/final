import React from 'react'
import {Link} from 'react-router-dom'

const UserCardMessage = ({member}) => {

  return (
        <div className="show_user d-flex p-2 align-items-center justify-content-between">
            {/* <Link to={`/infor/${member._id}`} style={{ textDecoration: 'none' }} className="d-flex align-items-center"> */}
                <img src={member.avatar} alt="Avatar" className="avatarsmall"/>
                <span className="text-dark mt-1">{member.name}</span>
            {/* </Link> */}
        </div>
  )
}

export default UserCardMessage