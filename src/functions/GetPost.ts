import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

initializeApp(firebaseConfig)
const db =getFirestore()
const docRef =collection(db,"posts")


const FetchPostsFromFireBase =async()=>{

}