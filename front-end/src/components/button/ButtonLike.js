import React from 'react'
import { Button } from '@material-ui/core/';

const ButtonLike = ({like, handleUnLike, handleLike}) => {
  return (
    <>
        {
            like ? <Button size="small" color="primary" className='far fa-heart text-danger' onclick={handleUnLike}>UnLike</Button>
            : <Button size="small" color="primary" className='far fa-heart ' onClick={handleLike}>Like</Button>
        }
    </>
  )
}

export default ButtonLike