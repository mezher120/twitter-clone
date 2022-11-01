import { SparklesIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Input from './Input'
import Post from './Post'

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Javier Ferrari",
      username: "mezher120",
      userImg: "https://i.pinimg.com/736x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg",
      img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      text: "nice view",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      name: "Javier Ferrari",
      username: "mezher120",
      userImg: "https://i.pinimg.com/736x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      text: "nice view",
      timestamp: "4 hours ago"
    },
  ]

  return (
    <div className='xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
        <div className='flex justify-between items-center p-3 sticky top-0 bg-white z-20 border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverEffect items-center justify-center p-4'>
                <SparklesIcon className='h-5'></SparklesIcon>
            </div>
        </div>
        <div>
            <Input></Input>
        </div>
        <div>
          {posts && posts.map(post => 
          <Post key={post.id} post={post}></Post>
            
            )}
        </div>
    </div>
  )
}
