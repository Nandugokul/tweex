import { useEffect, useState } from "react";
import GreenTick from "../../../public/assets/greenTick.svg";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import getActiveUser from "@/functions/GetActuveUserData";
type userData = {
  name: string;
  mail: string;
  password?: string;
  id: string;
  followedBY?: object[];
  following?: string[];
};

const FollowingListing = (props: userData) => {
  initializeApp(firebaseConfig);
  const db = getFirestore();
  let docRef = collection(db, "users");
  const [followedOrNot, setFollowedOrNot] = useState(false);
  type mailAndId = {
    mail: string;
    id: string;
  };
  useEffect(() => {
    const followCheck = async () => {
      try {
        const docRef = doc(db, "users", props.id);
        const logedInUserId = localStorage.getItem("activeUser");
        if (logedInUserId !== null) {
          const logedInUserIdParsed = JSON.parse(logedInUserId);

          const data = await getDoc(docRef);

          if (data.exists() && data.data()) {
            const followedBy: mailAndId[] = data.data().followedBy || [];

            const isFollowed = followedBy.some(
              (element) => element.id === logedInUserIdParsed.loggedInUserId
            );
            setFollowedOrNot(isFollowed);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    followCheck();
  }, [props.id]);

  const handleFollowUser = (e: any) => {
    setFollowedOrNot((prevFollowed) => !prevFollowed);
    async function fetchData() {
      let parsedLoggedInUser: any;
      parsedLoggedInUser = getActiveUser();
      try {
        const data = await getDocs(docRef);

        for (const document of data.docs) {
          const userData = document.data();
          const userId = document.id;

          if (userData.email === props.mail) {
            const userDocRef = doc(db, "users", userId);

            if (!followedOrNot) {
              // Follow the user
              await Promise.all([
                updateDoc(userDocRef, {
                  followedBy: arrayUnion({
                    id: parsedLoggedInUser.loggedInUserId,
                    mail: parsedLoggedInUser.loggedInUserMail,
                  }),
                }),
                updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
                  following: arrayUnion({
                    id: props.id,
                    mail: props.mail,
                  }),
                }),
              ]);
            } else {
              // Unfollow the user
              await Promise.all([
                updateDoc(userDocRef, {
                  followedBy: arrayRemove({
                    id: parsedLoggedInUser.loggedInUserId,
                    mail: parsedLoggedInUser.loggedInUserMail,
                  }),
                }),
                updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
                  following: arrayRemove({
                    id: props.id,
                    mail: props.mail,
                  }),
                }),
              ]);
            }
          }
        }
      } catch (error) {
        console.error("Error updating data: ", error);
      }
      try {
        const data = await getDocs(docRef);

        for (const document of data.docs) {
          const userData = document.data();
          const userId = document.id;

          if (userData.email === props.mail) {
            const userDocRef = doc(db, "users", userId);

            if (!followedOrNot) {
              await Promise.all([
                updateDoc(userDocRef, {
                  followedBy: arrayUnion({
                    id: parsedLoggedInUser.loggedInUserId,
                    mail: parsedLoggedInUser.loggedInUserMail,
                  }),
                }),
                updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
                  following: arrayUnion({
                    id: props.id,
                    mail: props.mail,
                  }),
                }),
              ]);
            } else {
              // Unfollow the user
              await Promise.all([
                updateDoc(userDocRef, {
                  followedBy: arrayRemove({
                    id: parsedLoggedInUser.loggedInUserId,
                    mail: parsedLoggedInUser.loggedInUserMail,
                  }),
                }),
                updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
                  following: arrayRemove({
                    id: props.id,
                    mail: props.mail,
                  }),
                }),
              ]);
            }
          }
        }
      } catch (error) {
        console.error("Error updating data: ", error);
      }
    }
    fetchData();
  };
  return (
    <>
      <div
        className={`max-w-screen-lg m-auto p-6 flex justify-between border-b border-black/10 ${
          followedOrNot ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center space-x-8">
          <div className="border border-black/50 rounded-full w-12 h-12"></div>
          <h1 className="font-bold text-lg text-black/50">{props.name}</h1>
        </div>
        <div className="flex items-center justify-center text-center w-32">
          <button
            className={`bg-primary px-9 py-2 m-0 rounded-lg text-white font-bold ${
              followedOrNot ? "hidden" : "block"
            }`}
            onClick={handleFollowUser}
            value={props.mail}
          >
            {`${followedOrNot ? "following" : "Follow"}`}
          </button>

          <button
            className={`${followedOrNot ? "block" : "hidden"}`}
            onClick={handleFollowUser}
            value={props.mail}
          >
            <Image src={GreenTick} alt="done" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FollowingListing;
