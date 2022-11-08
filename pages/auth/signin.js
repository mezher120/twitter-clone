import React from 'react'
import {getProviders, signIn} from 'next-auth/react'

export default function signin({providers}) {
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <img 
      className='hidden md:inline rotate-6 p-0 m-0'
      src='https://cdn0.iconfinder.com/data/icons/popular-social-media-colored/48/JD-14-512.png' alt=''></img>
      <div className='flex flex-col items-center justify-center space-y-8'>
        <img 
        className='h-14 my-3'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png' alt=''>        
        </img>
        <p className='italic'>"This is for learning purpose"</p>
        {Object.values(providers).map(provider => (
          
          <button 
          className='bg-red-400 text-white shadow-md hover:bg-red-600 p-2 rounded-full text-center'
          onClick={() => signIn(provider.id, {callbackUrl: '/'})}
          >Sign in with {provider.name}</button>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
}
