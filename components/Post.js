import { ChartBarIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalCircleIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";


export default function Post({post}) {
  return (
    <div>
        <div className="flex border-b">
            <div>
                <img className="h-20 pt-2" src={post.userImg} alt=''></img>
            </div>
            <div className="flex flex-col w-full p-2 space-y-2">
                <div className="flex justify-between">
                    <div className="space-x-1">
                        <span className="font-bold">{post.name}</span>
                        <span>{post.username}</span>
                        <span>{post.timestamp}</span>
                    </div>
                    <div className="hover:bg-gray-200 hover:rounded-full cursor-pointer">
                        <EllipsisHorizontalCircleIcon className="h-7"></EllipsisHorizontalCircleIcon>
                    </div>
                </div>
                <p>{post.text}</p>
                <img className="h-40 rounded-xl" src={post.img} alt=''></img>
                <div className="flex justify-between p-2 text-gray-400">
                    <ChatBubbleBottomCenterIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-green-500"></ChatBubbleBottomCenterIcon>
                    <TrashIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-blue-600"></TrashIcon>
                    <HeartIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-red-500"></HeartIcon>
                    <ShareIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1  hover:text-blue-600"></ShareIcon>
                    <ChartBarIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1  hover:text-yellow-400"></ChartBarIcon>
                </div>
            </div>
        </div>
    </div>
  )
}
