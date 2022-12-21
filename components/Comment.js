import { async } from "@firebase/util";
import { ChartBarIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalCircleIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFullfill } from "@heroicons/react/24/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db, storage } from "../firebase";
import { useRecoilState } from "recoil";
import { modalState, postStateId } from "../atom/modalAtom";

export default function Comment({commentId, originalPostId, comment}) {

    console.log(commentId, originalPostId, comment, "aca estmoa")

    const {data} = useSession(); // uso la user session proporcionada por next-auth
    const [likes, setLikes] = useState([]);  // para almacenar los likes
    const [hasLiked, setHasLiked] = useState(false);  // para almacenar si el usuario tiene o no like del post
    const [open, setOpen] = useRecoilState(modalState)  // uso el recoil para estado global y me importo el modalstate creado en carpeta atom
    const [postId, setPostId] = useRecoilState(postStateId); // para llevarme un ID de aca

useEffect(()=> { // me traigo los likes, el id lo puse como titulo cuando lo setDoc en sendLike()
    onSnapshot(collection(db, 'posts', originalPostId, 'comment', commentId, 'likes'), (snapshot) => {
        setLikes(snapshot.docs);
    })
}, [db, originalPostId, commentId]);


useEffect(() => {   // si cambia likes [], entonces me fijo si el usuario coincide con algun like de likesm si es asi cambio hasliked
    if (likes.some(like => like.id === data?.user.uid)) {
        setHasLiked(true);
    } else {
        setHasLiked(false);
    }
}, [likes])

async function deletePost() {
    if (window.confirm("Are you sure to delete the post?")) { // para abrir una ventana con ok y cancel antes de hacer lo que prosigue
        try {
            await deleteDoc(doc(db, 'posts', originalPostId, 'comment', commentId));  // eliminar el post
            if (post.data().image) {
                await deleteObject(ref(storage, `posts/${id}/image`)); // para eliminar el storage con la imagen
            }
            console.log('post deleted')
        } catch (error) {
            console.log(error.message);
        } 
        
    }
}

async function sendLike() { 
    if (data) {
    if (hasLiked) {
        await deleteDoc(doc(db, 'posts', originalPostId, 'comment', commentId, 'likes', data?.user.uid));
        // delete y doc de firebase, selecciono la db, la collecion, segun el elemento, dentro de ahi busco carpeta likes y borro segun titulo dento
        setHasLiked(false);
    } else {

        try {
            await setDoc(doc(db, 'posts', originalPostId, 'comment', commentId, 'likes', data?.user.uid), {
                name: data.user.name,
            })
            
        } catch (error) {
            console.log(error.message)
        }
    }
    } else {
        signIn();
    }

}

  return (
    <div>
        <div className="flex border-b">
            <div>
                <img className="h-11 pt-2 rounded-full" src={comment?.userImg} alt='user-img'></img>
            </div>
            <div className="flex flex-col w-full p-2 space-y-2">
                <div className="flex justify-between">
                    <div className="space-x-1">
                        <span className="font-bold">{comment?.name}</span>
                        <span>{comment?.username}</span>
                        <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                    </div>
                    <div className="hover:bg-gray-200 hover:rounded-full cursor-pointer">
                        <EllipsisHorizontalCircleIcon className="h-7"></EllipsisHorizontalCircleIcon>
                    </div>
                </div>
                <p>{comment?.comment}</p>
                <div className="flex justify-between p-2 text-gray-400">
                   <div className="flex items-center">
                    <ChatBubbleBottomCenterIcon 
                    onClick={() => {
                        if(!data) {
                            signIn()
                        } else {   
                            setPostId(originalPostId)
                            setOpen(!open)
                        }
                    }}
                    className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-green-500"></ChatBubbleBottomCenterIcon>
                   </div>
                    {data?.user.uid === comment?.id ? (
                    <TrashIcon 
                    onClick={() => deletePost()}
                    className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-blue-600"></TrashIcon>
                    ) : ""
                    }
                    
                    <div className="flex items-center">
                    {hasLiked ? (
                    <HeartIconFullfill onClick={() => sendLike()} className="h-8 cursor-pointer p-1 text-red-500"></HeartIconFullfill>
                    ) : (
                    <HeartIcon onClick={() => sendLike()} className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-red-500"></HeartIcon>
                    )}
                    <span className="text-red-500">{likes.length === 0 ? "" : likes.length}</span>
                    </div>
                    <ShareIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1  hover:text-blue-600"></ShareIcon>
                    <ChartBarIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1  hover:text-yellow-400"></ChartBarIcon>
                </div>
            </div>
        </div>
    </div>
  )
}
