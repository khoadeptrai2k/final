import React from 'react'
import {Link} from 'react-router-dom'

const UserCardMessage = ({member}) => {

  return (
        <div className="show_user d-flex p-2 align-items-center justify-content-between">
            {/* <Link to={`/infor/${member._id}`} style={{ textDecoration: 'none' }} className="d-flex align-items-center"> */}
                <img src={member.avatar} alt="Avatar" className="avatarsmall"/>
                <div style={{display: 'flex',flexDirection:'column'}}>
                  <span className="text-dark mt-1">{member.name}</span>

                  <small style={{opacity:0.7}}>
                  {
                    member.text || member.media
                  }
                  </small>
                </div>

            {/* </Link> */}
        </div>
  )
}

export default UserCardMessage