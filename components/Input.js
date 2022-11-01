import { CameraIcon, FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function Input() {
  return (
    <div className='flex items-center border-b border-gray-200 space-x-3'>
        <img 
        className='h-20 rounded-r-full cursor-pointer hover:brightness-95 self-start pt-2'
        src='https://i.pinimg.com/736x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg' 
        alt=''></img>
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
