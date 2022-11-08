import Image from 'next/image'
import React from 'react'
import SideBarMenuItem from './SideBarMenuItem'
import {HomeIcon, DotsHorizontalIcon, EllipsisHorizontalIcon} from '@heroicons/react/24/solid';
import {BellIcon, BookmarkIcon, HashtagIcon, ListBulletIcon, EnvelopeIcon, UserIcon, ClipboardIcon, ArrowDownOnSquareStackIcon} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Sidebar() {

    const { data } = useSession();
    console.log(data)

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
                { data && (
                    <>
                    <SideBarMenuItem text="Notifications" Icon={BellIcon}></SideBarMenuItem>
                    <SideBarMenuItem text="Message" Icon={EnvelopeIcon}></SideBarMenuItem>
                    <SideBarMenuItem text="Bookmarks" Icon={BookmarkIcon}></SideBarMenuItem>
                    <SideBarMenuItem text="Lists" Icon={ClipboardIcon}></SideBarMenuItem>
                    <SideBarMenuItem text="Profile" Icon={UserIcon}></SideBarMenuItem>
                    <SideBarMenuItem text="More" Icon={ListBulletIcon}></SideBarMenuItem>
                    </>
                )       
                }
            </div>
            {/* button    */}
            
            { data ? (
            <>
            <button className='bg-blue-400 text-white rounded-full mt-5 w-56 h-10 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>

            {/* Mini Profile  */}
            <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
                <img 
                onClick={signOut}
                src={data.user.image.substring(0, data.user.image.length - 2)} 
                alt=''
                className='h-12 rounded-full xl:mr-2' ></img>
                <div className='leading-5 hidden xl:inline'>
                    <h4 className='font-bold'>{data.user.name}</h4>
                    <p>@{data.user.username}</p>
                </div>
                <EllipsisHorizontalIcon className='h-5 xl:ml-4 hidden xl:inline'/>
            </div>
            </>
            ) : 
            (
                <button 
                onClick={signIn}
                className='bg-blue-400 text-white rounded-full 
                mt-5 w-10 h-10 font-bold shadow-md hover:brightness-95 text-sm xl:w-40 xl:h-10 xl:text-lg'>Sign in</button>
            )
        }


        </div>
    )
}
