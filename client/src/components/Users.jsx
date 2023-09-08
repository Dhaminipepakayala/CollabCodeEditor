import React from 'react'
import Avatar from 'react-avatar'

const Users = ({uname}) => {
  return (
    
        <div className='usersEach'>
        <Avatar classname="avatar" name={uname} size={50} round="14px" />
        <h5 className="uname" name="username" style={{color:'white'}}>{uname}</h5>
        </div>
    
  )
}

export default Users