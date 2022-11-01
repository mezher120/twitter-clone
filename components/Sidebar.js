import Image from 'next/image'
import React from 'react'
import SideBarMenuItem from './SideBarMenuItem'
import {HomeIcon, DotsHorizontalIcon, EllipsisHorizontalIcon} from '@heroicons/react/24/solid';
import {BellIcon, BookmarkIcon, HashtagIcon, ListBulletIcon, EnvelopeIcon, UserIcon, ClipboardIcon, ArrowDownOnSquareStackIcon} from '@heroicons/react/24/outline'
export default function Sidebar() {
    return (
        <div className='hidden sm:flex flex-col fixed h-full p-2 xl:items-start'>
            {/* Twitter Logo     */}
            <div className='hoverEffect mb-5 xl:p-2'>
                <Image 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png' 
                width="50" 
                height="50">
                </Image>
            </div>

            {/* bar   */}
            <div>
                <SideBarMenuItem text="Home" Icon={HomeIcon} active></SideBarMenuItem>
                <SideBarMenuItem text="Explore" Icon={HashtagIcon}></SideBarMenuItem>
                <SideBarMenuItem text="Notifications" Icon={BellIcon}></SideBarMenuItem>
                <SideBarMenuItem text="Message" Icon={EnvelopeIcon}></SideBarMenuItem>
                <SideBarMenuItem text="Bookmarks" Icon={BookmarkIcon}></SideBarMenuItem>
                <SideBarMenuItem text="Lists" Icon={ClipboardIcon}></SideBarMenuItem>
                <SideBarMenuItem text="Profile" Icon={UserIcon}></SideBarMenuItem>
                <SideBarMenuItem text="More" Icon={ListBulletIcon}></SideBarMenuItem>
            </div>
            {/* button    */}

            <button className='bg-blue-400 text-white rounded-full mt-5 w-56 h-10 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

            {/* Mini Profile  */}
            <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
                <img 
                src='https://i.pinimg.com/736x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg' 
                alt=''
                className='h-12 rounded-full xl:mr-2' ></img>
                <div className='leading-5 hidden xl:inline'>
                    <h4 className='font-bold'>Javier Ferrari</h4>
                    <p>@javierferrari</p>
                </div>
                <EllipsisHorizontalIcon className='h-5 xl:ml-4 hidden xl:inline'/>
            </div>


        </div>
    )
}
