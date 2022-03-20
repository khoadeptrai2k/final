import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ACTIONS } from '../../../redux/actions/index';

const Newtus = () => {
    const { auth } = useSelector(state => state)
        console.log(auth)
    const dispatch = useDispatch()

    return (
        <div className="newtus my-3 d-flex">
            {/* <Avatar></Avatar>             */}
            <button className="newtusButton flex-fill"
            onClick={() => dispatch({ type: ACTIONS.STATUS, payload: true })}
            >
            {auth.userHeader.name}
            , What will you share?
            </button>
        </div>
    )
}

export default Newtus