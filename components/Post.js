import { async } from "@firebase/util";
import { ChartBarIcon, ChatBubbleBottomCenterIcon, EllipsisHorizontalCircleIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFullfill } from "@heroicons/react/24/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db, storage } from "../firebase";

export default function Post({post}) {
    const {data} = useSession(); // uso la user session proporcionada por next-auth
    const [likes, setLikes] = useState([]);  // para almacenar los likes
    const [hasLiked, setHasLiked] = useState(false);  // para almacenar si el usuario tiene o no like del post
    console.log(post, 'hey')

useEffect(()=> { // me traigo los likes, el id lo puse como titulo cuando lo setDoc en sendLike()
    onSnapshot(collection(db, 'posts', post.id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs);
    })
}, [db]);

useEffect(() => {   // si cambia likes [], entonces me fijo si el usuario coincide con algun like de likesm si es asi cambio hasliked
    if (likes.some(like => like.id === data?.user.uid)) {
        setHasLiked(true);
    } else {
        setHasLiked(false);
    }
}, [likes])

async function deletePost() {
    if (window.confirm("Are you sure to delete the post?")) {
        try {
            await deleteDoc(doc(db, 'posts', post.id));
            await deleteObject(ref(storage, `posts/${post.id}/image`));
            console.log('post deleted')
        } catch (error) {
            console.log(error.message);
        } 
        
    }
}

async function sendLike() { 
    if (data) {
    if (hasLiked) {
        await deleteDoc(doc(db, 'posts', post.id, 'likes', data?.user.uid));
        // delete y doc de firebase, selecciono la db, la collecion, segun el elemento, dentro de ahi busco carpeta likes y borro segun titulo dento
        setHasLiked(false);
    } else {

        try {
            await setDoc(doc(db, 'posts', post.id, 'likes', data?.user.uid), {
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
                <img className="h-20 pt-2" src={post.userImg} alt=''></img>
            </div>
            <div className="flex flex-col w-full p-2 space-y-2">
                <div className="flex justify-between">
                    <div className="space-x-1">
                        <span className="font-bold">{post.data().name}</span>
                        <span>{post.data().username}</span>
                        <Moment fromNow>{post.data().timestamp?.toDate()}</Moment>
                    </div>
                    <div className="hover:bg-gray-200 hover:rounded-full cursor-pointer">
                        <EllipsisHorizontalCircleIcon className="h-7"></EllipsisHorizontalCircleIcon>
                    </div>
                </div>
                <p>{post.data().text}</p>
                <img className="h-40 rounded-xl" src={post.data().image} alt=''></img>
                <div className="flex justify-between p-2 text-gray-400">
                    <ChatBubbleBottomCenterIcon className="h-8 hover:bg-gray-200 hover:rounded-full cursor-pointer p-1 hover:text-green-500"></ChatBubbleBottomCenterIcon>
                    {data?.user.uid === post.data().id ? (
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
