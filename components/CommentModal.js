import { useRecoilState } from "recoil"
import {modalState, postStateId} from '../atom/modalAtom'
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { CameraIcon, FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Moment from "react-moment";
import {useSession } from 'next-auth/react'
import { useRouter } from "next/router";   // es como el Router de React


export default function CommentModal() {

    const {data: session} = useSession(); // extraigo data y la renombro como session
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postStateId);
    const [post, setPost] = useState("");
    const [input, setInput] = useState("");
    const router = useRouter();


    useEffect(() => {
        onSnapshot(doc(db, 'posts', postId), (snapshot) => {
          setPost(snapshot)
        });
      }, [postId, db])

      console.log(post)

    async function sendComment(params) {
      await addDoc(collection(db, "posts", postId, "comment"), { //agregamos documento, en la colleccion posts de 
 // la db segun el postId que lo saca de la var global segun el cuadro apretado, y nombramos el nuevo doc que va 
 // tener dentro de posts y creamos el objeto a agregar
        comment: input,
        name: session.user.name,
        username: session.user.username,
        userImg: session.user.image,
        timestamp: serverTimestamp() // fx de firebase para hora del momento
      })

      setOpen(!open)
      setInput("")
      router.push(`/posts/${postId}`)
    }

  return (
    <div>
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
