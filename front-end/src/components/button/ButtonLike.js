import React from 'react'
import { Button } from '@material-ui/core/';

const ButtonLike = ({like, handleUnLike, handleLike}) => {
  return (
    <>
        {
            like ? <Button size="small" color="primary" className='text-danger' onClick={handleUnLike}>UnLike</Button>
            : <Button size="small" color="primary" className='' onClick={handleLike}>Like</Button>
        }
    </>
  )
}

export default ButtonLike