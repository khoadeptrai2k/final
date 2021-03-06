import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {Dropdown} from 'react-bootstrap'
import { deleteComment } from '../../../../redux/actions/commentAction';

const CommentMenu = ({post, comment, setOnEdit}) => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleRemove = () => {
        if(post.userId === auth.userHeader._id || comment.user._id === auth.userHeader._id){
            dispatch(deleteComment({post, auth, comment}))
        }
    }

    const MenuItem = () => {
        return(
            <>
                <Dropdown.Item className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item" onClick={handleRemove}>
                    <span className="">Remove</span>
                </Dropdown.Item>
            </>
        )
    }

  return (
    <div className="menu">
        {
            (post.userId === auth.userHeader._id || comment.user._id === auth.userHeader._id) &&
            <Dropdown className="nav-item dropdown">
                <Dropdown.Toggle id="moreLink">
                    More
                </Dropdown.Toggle>

                <Dropdown.Menu aria-labelledby="moreLink">
                        {
                            post.userId=== auth.userHeader._id
                            ? comment.user._id === auth.userHeader._id
                                ? MenuItem()
                                : <Dropdown.Item className="dropdown-item" onClick={handleRemove}>
                                    <span className="material-icons">Remove</span>
                                </Dropdown.Item>
                            : comment.user._id === auth.userHeader._id && MenuItem()
                        }
                </Dropdown.Menu>

            </Dropdown>

        }
    </div>
  )
}

export default CommentMenu