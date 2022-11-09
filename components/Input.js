import { CameraIcon, FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { db, storage } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function Input() {

    const {data} = useSession();
    const newImage = data && data.user.image.substring(0, data.user.image.length - 2);
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);

    async function sendPost() {  //creamos funcion asyncrona para postear en db y subir imagen
        
        const docRef = await addDoc(collection(db, "posts"), {  // metodo addDOc para subir a la db que importamos de firebase
            id: data.user.uid,                                  // e indicamos que colleccion/carpeta crear
            text: input,
            userImg: data.user.image,
            timestamp: serverTimestamp(),
            name: data.user.name,
            username: data.user.username
        })
        
        const imageRef = ref(storage, `posts/${docRef.id}/image`);  
        // creo referencia para la imagen, la guardo en imageRef para usar luego.
        // uso ref de firebase, donde agarro la storage que exporte de firebase.js
        // luego le paso la ruta donde la voy a alojar. le pongo el user.id para reconocerla para subir al post luego
        if (selectedFile) {  // si hay imagen seleccionada
            await uploadString(imageRef, selectedFile, "data_url")  
            // subir con metodo de firebase a la referencia creada para la imagen, 
            // el stringURL creado con metodos js, como un data_url
            .then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                // luego nos bajamos con metodo de firebase, desde la ref, 
                await updateDoc(doc(db, 'posts', docRef.id), { image: downloadURL })
                }
                //metodos de firebase updateDoc luego entro a los docs de mi db, en carpeta
                // posts y le doy la referencia actualizar con el docRef.id en lineas anteriores
                // le paso al updatedoc lo que quiero agregar
            );
        }

        setInput("");
        setSelectedFile(null);
    }

    const addImageOnPost = (e) => {
        const reader = new FileReader(); // metodo js para leer archivo;
        console.log(reader);
        console.log(e.target.files);
        if (e.target.files[0]) {    // todos metodos js para llegar a tener una string de url del archivo
            reader.readAsDataURL(e.target.files[0]);  // usado para leer el contenido del especificado de file
        }

        reader.onload = (readerEvent) => {  // para cargar reader luego de haber terminado de leer as data url
            setSelectedFile(readerEvent.target.result);  // manda el elemento en target result
        }

    }


  return (
    <>
    {data && (
    <div className='flex items-center border-b border-gray-200 space-x-3'>
        <img 
        onClick={signOut}
        className='h-20 w-20 rounded-full cursor-pointer hover:brightness-95 self-start m-2'
        src={newImage}
        alt=' '></img>
        <div className='w-full'>
            <div>
                <textarea 
                className='w-full border-none focus:ring-0' 
                rows='3' 
                placeholder='What"s happening'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                ></textarea>
            </div>
            {selectedFile && (
                <>
                <div className='relative'>
                    <XMarkIcon className='h-10 absolute cursor-pointer shadow-md rounded-full bg-white' onClick={() => setSelectedFile(null)}></XMarkIcon>
                    <img src={selectedFile} alt=''></img>
                </div>
                </>
                
            )}
            <div className='flex justify-between border-t border-gray-200 pt-2'>
                <div className='flex space-x-1' >
                    <div onClick={() => filePickerRef.current.click()}>
                    <CameraIcon className='h-12 text-sky-500 p-2 hoverEffect'> </CameraIcon>
                    <input className='hidden' type='file' ref={filePickerRef} onChange={(e) => addImageOnPost(e)} ></input>
                    </div>
                    <FaceSmileIcon className='h-12 text-sky-500 p-2 hoverEffect'></FaceSmileIcon>
                </div>
                    <button 
                    onClick={()=> sendPost()}
                    disabled={!input.trim()}
                    className='bg-blue-400 text-white rounded-full w-20 mr-2 h-10 font-bold shadow-md hover:brightness-95 text-lg'
                    >Tweet</button>
            </div>
        </div>
    </div>
    )
    }  
    </>
  )
}
