import React from 'react'
import {Link} from 'react-router-dom'
import moment  from 'moment'
const UserCardMessage = ({member, msg}) => {

  const showMsg = (member) => {
    return(
        <>
            <div>
                {member.text}
            </div>
            {
                member.media.length > 0 && 
                <div>
                    {member.media.length} Media
                </div>
            }
        </>
    )
}
  return (
        <div className="show_user d-flex p-2 align-items-center justify-content-between">
                <img src={member.avatar} alt="Avatar" className="avatarsmall"/>
                <div style={{display: 'flex',flexDirection:'column'}}>
                <span className="text-dark mt-1">
                  <Link to={`/infor/${member._id}`} style={{ textDecoration: 'none', color:'black' }} className="d-flex align-items-center">{member.name}</Link>
                </span>

                  <small style={{opacity:0.7}}>
                    {
                      msg 
                      ? showMsg(member)
                      : member.name
                    }
                  </small>
                </div>

            {/* </Link> */}
        </div>
  )
}

export default UserCardMessage