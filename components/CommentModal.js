import { useRecoilState } from "recoil"
import {modalState, postStateId} from '../atom/modalAtom'
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { CameraIcon, FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Moment from "react-moment";
import {signOut } from 'next-auth/react'


export default function CommentModal() {

    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postStateId);
    const [post, setPost] = useState("");
    const [input, setInput] = useState("");


    useEffect(() => {
        onSnapshot(doc(db, 'posts', postId), (snapshot) => {
          setPost(snapshot)
        });
      }, [postId, db])

      console.log(post)

    function sendComment(params) {
      console.log("hello")
    }

  return (
    <div>Modal

        {open && (
            <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            className='w-[90%] max-w-lg absolute  top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-lg shadow-md '>
            <div className="p-1">
              <div className="border-b border-gray-200 py-1">
                <div onClick={() => setOpen(!open)} className="hover:bg-gray-300 rounded-full h-8 w-8 cursor-pointer flex justify-center items-center">
                  <XMarkIcon className="h-8"></XMarkIcon>
                </div>
              </div>  
              <div className="flex justify-start items-center space-x-2 pt-2">

              <img 
              className="h-11 rounded-full" 
              src={post?.data()?.userImg} 
              alt='user-img'>

              </img>
              <h4 className="font-bold" >{post?.data()?.name}</h4>
            <span>@{post?.data()?.username} - {" "}</span>
            <span>
            <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
              </div>
              <p className="p-2 ml-10 text-gray-600">{post?.data()?.text}</p>
        <div className='flex items-center space-x-3'>
        <div className='w-full'>
            <div>
                <textarea 
                className='w-full border-none focus:ring-0' 
                rows='3' 
                placeholder='Tweet your reply'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                ></textarea>
            </div>
            <div className='flex justify-between border-t border-gray-200 pt-2'>
                <div className='flex space-x-1' >
                    <div onClick={() => filePickerRef.current.click()}>
                    <CameraIcon className='h-12 text-sky-500 p-2 hoverEffect'> </CameraIcon>
                    {/* <input className='hidden' type='file' ref={filePickerRef} onChange={(e) => addImageOnPost(e)} ></input> */}
                    </div>
                    <FaceSmileIcon className='h-12 text-sky-500 p-2 hoverEffect'></FaceSmileIcon>
                </div>
                    <button 
                    onClick={()=> sendComment()}
                    disabled={!input.trim()}
                    className='bg-blue-400 text-white rounded-full w-20 mr-2 h-10 font-bold shadow-md hover:brightness-95 text-lg'
                    >Tweet</button>
            </div>
        </div>
    </div>
            </div>

            </Modal>
        )}
    </div>
  )
}
