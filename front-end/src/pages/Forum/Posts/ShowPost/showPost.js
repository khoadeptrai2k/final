import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ShowPost = ({post}) => {
console.log(post)
  return (
    <div className="show_post">

    <form>
        <div className="info_post">

            <span>
                <i className="fas fa-camera"/>
                <p>Change</p>

            </span>
        </div>

        <div className="form-group">
            <label htmlFor="fullname">{post.creator}</label>

        </div>

        <div className="form-group">
            <label htmlFor="message">{post.message}</label>

        </div>

        <div className="form-group">
                <label htmlFor="address">Address</label>
        </div>

        <div className="form-group">
                <label htmlFor="story">Story</label>


                <small className="text-danger d-block text-right">

                </small>
        </div>

        <button className="btn btn-info w-100" type="submit">Save</button>
        <button className="btn btn-danger btn_close">Close</button>
    </form>
</div>
  )
}

export default ShowPost