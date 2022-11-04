//Conectamos con Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//importamos las funciones de firebase con las instrucciones que nos dan en el link
import { getFirestore, collection, doc, addDoc, getDocs, getDoc, deleteDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX-2GrfDU6GUjm1X2xLRuxoo4UQXmglvk",
    authDomain: "ejerciciobd-10424.firebaseapp.com",
    projectId: "ejerciciobd-10424",
    storageBucket: "ejerciciobd-10424.appspot.com",
    messagingSenderId: "357893991732",
    appId: "1:357893991732:web:f0b8ecfb781af408f54961"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Este objeto db es nuestra conexion a la base de datos
const db = getFirestore();

//Cuando me pasen un titulo y una descripcion va a guardar un documento dentro de la coleccion de tasks y vas a pasar un objeto con titulo y descripcion
export const saveTask = (title, description) =>
    addDoc(collection(db, 'Usuarios'), { title, description });


//llamamos a getDocs que busca en la collection con la conexion db la coleccion tasks
export const getTasks = () => getDocs(collection(db, 'Usuarios'));

//lo mismo que lo anterior pero en tiempo real, en este caso hay que pasarle una funcion de callback
export const onGetTasks = callback => onSnapshot(collection(db, 'Usuarios'), callback);

// hacemos una funcion de callback llamada id. Va a buscar el doc en la conexion db dentro de tasks y va a eliminar el que tenga id
export const deleteTask = id => deleteDoc(doc(db, 'Usuarios', id));

export const getTask = id => getDoc(doc(db, 'Usuarios', id));

//Esto es lo que queremos decir con newFields
    //newFields = {
    //     title: 'titulo',
    //     description: 'description'
    // }
export const updateTask = (id, newFields) => updateDoc(doc(db, 'Usuarios', id), newFields)



// getfirestore para conectarnos a firestore
// collection para las colecciones dentro de la base de datos
// addDoc para añadir documentos a la base de datos
// getDocs para recoger documentos de la base de datos
// onSnapshot para actualizar cuando los datos cambien
// doc nos permite seleccionar un solo documento de la coleccion
// GetDoc selecciona una unica tarea