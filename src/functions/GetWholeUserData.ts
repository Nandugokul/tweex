import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import firebaseConfig from "@/firebaseConfig/FireBaseConfig";

type WholeUserData = {
  email: string;
  followedBy?: followdata[];
  id: string;
  name: string;
  password?: string;
  following?: followdata[];
};
type followdata = {
  id: string;
  mail: string;
};

initializeApp(firebaseConfig);
const db = getFirestore();
const wholeUserDatRef = collection(db, "users");

const FetchUserDataFromFireBase = async () => {
  try {
    const userData = await getDocs(wholeUserDatRef);
    let data: WholeUserData[] = userData.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as WholeUserData);
    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};

export default FetchUserDataFromFireBase;
