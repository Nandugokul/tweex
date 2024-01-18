import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/firebaseConfig/FireBaseConfig";

initializeApp(firebaseConfig);
const db = getFirestore();
const wholeUserDatRef = collection(db, "users");

const FetchUserDataFromFireBase = async () => {
  try {
    const userData = await getDocs(wholeUserDatRef);
    return userData.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};
export default FetchUserDataFromFireBase;
