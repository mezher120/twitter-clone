import React from 'react'

export default function Users({user}) {
  return (
    <div className='flex justify-between items-center hover:bg-gray-200 rounded-xl p-1 cursor-default'>
        <img className='rounded-full' src={user.picture.thumbnail}></img>
        <div>
            <p className='font-bold'>{user.name.first} {user.name.last}</p>
            <p className='text-gray-500'>{user.login.username}</p>
        </div>
        <button className='bg-blue-400 text-white shadow-md rounded-xl p-2'>Follow</button>
    </div>
  )
}
