import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import { initializeApp } from "firebase/app";
import { updateDoc, doc, getFirestore, arrayUnion, getDoc, setDoc } from "firebase/firestore";

initializeApp(firebaseConfig);
const db = getFirestore();

const AddPost = async (userId: string, userName: string, post: string) => {
    const postIdGenerator = () => {
        return userId + "-" + crypto.randomUUID();
    }

    const postRef = doc(db, "posts", userId);

    try {
        const docSnap = await getDoc(postRef);
        const currentData = docSnap.data();

        if (docSnap.exists()) {
            await updateDoc(postRef, {
                posts: arrayUnion({
                    post: post,
                    userId: userId,
                    userName: userName,
                    postId: postIdGenerator()
                })
            });
        } else {
            await setDoc(postRef, {
                posts: [{
                    post: post,
                    userId: userId,
                    userName: userName,
                    postId: postIdGenerator()
                }]
            });
        }

        console.log("Post added successfully");
    } catch (error) {
        console.error("Error adding post:", error);
    }
};

export default AddPost;
