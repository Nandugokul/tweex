import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

initializeApp(firebaseConfig)
const db =getFirestore()


const FetchPostsFromFireBase =async(userId:string)=>{
    const docRef =doc(db,"posts",userId)
    let posts = await getDoc(docRef)
    return posts.data()
}

export default FetchPostsFromFireBase