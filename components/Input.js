import { CameraIcon, FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Input() {

    const {data} = useSession();
    const newImage = data && data.user.image.substring(0, data.user.image.length - 2);


  return (
    <>
    {data && (
    <div className='flex items-center border-b border-gray-200 space-x-3'>
        <img 
        onClick={signOut}
        className='h-20 w-20 rounded-full cursor-pointer hover:brightness-95 self-start m-2'
        src={newImage}
        alt=' '></img>
        <div className='w-full'>
            <div>
                <textarea className='w-full border-none focus:ring-0' rows='3' placeholder='What"s happening'></textarea>
            </div>
            <div className='flex justify-between border-t border-gray-200 pt-2'>
                <div className='flex space-x-1'>
                    <CameraIcon className='h-12 text-sky-500 p-2 hoverEffect'> </CameraIcon>
                    <FaceSmileIcon className='h-12 text-sky-500 p-2 hoverEffect'></FaceSmileIcon>
                </div>
                    <button className='bg-blue-400 text-white rounded-full w-20 mr-2 h-10 font-bold shadow-md hover:brightness-95 text-lg'>Tweet</button>
            </div>
        </div>
    </div>
    )
    }  
    </>
  )
}
