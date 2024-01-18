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
type userData = {
  name: string;
  mail: string;
  password: string;
  id: string;
  followedBY?: object[];
  following?: string[];
};

const UserListing = (props: userData) => {
  const app = initializeApp(firebaseConfig);
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

            console.log(followedBy);

            console.log(logedInUserIdParsed.loggedInUserId);
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
      let loggedInUser = localStorage.getItem("activeUser");
      let parsedLoggedInUser: any;
      if (loggedInUser) {
        parsedLoggedInUser = JSON.parse(loggedInUser);
      }
      try {
        const data = await getDocs(docRef);
        data.forEach(async (document) => {
          if (document.data().email === props.mail && !followedOrNot) {
            let idOfTheUserToBeFollowed = document.id;

            const userDocRef = doc(db, "users", idOfTheUserToBeFollowed);
            await updateDoc(userDocRef, {
              followedBy: arrayUnion({
                id: parsedLoggedInUser.loggedInUserId,
                mail: parsedLoggedInUser.loggedInUserMail,
              }),
            });
            const userDocForFollowing = doc(
              db,
              "users",
              parsedLoggedInUser.loggedInUserId
            );
            await updateDoc(userDocForFollowing, {
              following: arrayUnion({
                id: props.id,
                mail: props.mail,
              }),
            });
          }
          if (followedOrNot) {
            let idOfTheUserToBeUnfollowed = document.id;
            const userDocRef = doc(db, "users", idOfTheUserToBeUnfollowed);
            await updateDoc(userDocRef, {
              followedBy: arrayRemove({
                id: parsedLoggedInUser.loggedInUserId,
                mail: parsedLoggedInUser.loggedInUserMail,
              }),
            });
          }
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  };
  return (
    <>
      <div className="max-w-screen-lg m-auto p-6 flex justify-between border-b border-black/10">
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

export default UserListing;
