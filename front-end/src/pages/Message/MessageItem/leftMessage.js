import React, { useState, useEffect} from 'react'
import ACTIONS from '../../../redux/actions'
import { getData } from '../../../redux/api/authAPI'
import { useSelector, useDispatch } from 'react-redux'
import UserCardMessage from '../userCardMessage';
import { useNavigate, useParams } from 'react-router-dom';
import {addUser, getConversations} from '../../../redux/actions/messageAction'


const LeftMessage = () => {
    const { auth, message } = useSelector(state => state)
    const dispatch = useDispatch()

    const [searchUsers, setSearchUsers] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return setSearch([]);
        try {
            const res = await getData(`search?name=${search}`, auth.token)
            setSearchUsers(res.data.user)
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch(addUser({user, message}))
        return navigate(`/message/${user._id}`)
    }

    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }

    useEffect(() =>{
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch,auth,message.firstLoad])


  return (
    <>
        <form className="message_header" onClick={handleSearch} >
            <input type="text" value={search}
            placeholder="Enter to Search..."
            onChange={e => setSearch(e.target.value)} />

            <button type="submit">Search</button>
        </form>

        <div className="message_chat_list">
            {
                searchUsers.length !== 0
                ?   <>
                    {
                        searchUsers.map(user => (
                            <div key={user._id} className={`message_user ${isActive(user)}`} 
                            onClick={() => handleAddUser(user)}>
                                <UserCardMessage member={user} />
                            </div>
                        ))
                    }
                    </>
                : 
                    <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCardMessage member={user} msg={true} />
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    </>
  )
}

export default LeftMessage