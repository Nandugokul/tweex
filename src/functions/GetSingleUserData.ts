import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

initializeApp(firebaseConfig);
const db = getFirestore();


const getSingleUserData = async(id:string)=>{
    
    const docRef =doc(db,"users",id)
    let data =  await getDoc(docRef)
    return data.data()
}

export default getSingleUserData