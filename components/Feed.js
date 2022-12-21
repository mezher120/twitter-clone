import { SparklesIcon } from '@heroicons/react/24/outline'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Input from './Input'
import Post from './Post'
import { AnimatePresence, motion } from "framer-motion"

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      console.log(snapshot.docs, 'en fedd');
      setPosts(snapshot.docs);
    })
  },[]);

  // console.log(posts, "here i am")

  // console.log(posts[0].data(), 'en fededede')



  // const posts = [
  //   {
  //     id: "1",
  //     name: "Javier Ferrari",
  //     username: "mezher120",
  //     userImg: "https://i.pinimg.com/736x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg",
  //     img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  //     text: "nice view",
  //     timestamp: "2 hours ago"
  //   },
  //   {
  //     id: "2",
  //     name: "Javier Ferrari",
  //     username: "mezher120",
  //     userImg: "https://i.pinimg.com/736x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg",
  //     img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  //     text: "nice view",
  //     timestamp: "4 hours ago"
  //   },
  // ]

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
          <AnimatePresence>
            
          {posts && posts.map(post => 
          <motion.div key={post.data().id}
          initial= { {opacity: 0} }
          animate = { {opacity: 1} }
          exit = { {opacity: 0} }
          transition = { {duration: 1}}
          >

            <Post key={post.data().id} post={post}></Post>

          </motion.div>
            
            )}
          </AnimatePresence>
        </div>
    </div>
  )
}
