import React from 'react'

export default function SideBarMenuItem({text, Icon, active}) {
  return (
    <div className='hoverEffect flex items-center justify-center xl:justify-start space-x-3 text-gray-700'>
        <Icon className='h-7' ></Icon>
        <span className={`${active && "font-bold"} hidden xl:inline `}>{text}</span>
    </div>
  )
}
