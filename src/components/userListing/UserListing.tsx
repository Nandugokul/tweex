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

const UserListing = (props: userData) => {
  initializeApp(firebaseConfig);
  const db = getFirestore();
  let docRef = collection(db, "users");
  const [followedOrNot, setFollowedOrNot] = useState(false);
  type mailAndId = {
    mail: string;
    id: string;
  };

  const [refreshData, setRefreshData] = useState(false);

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
  }, [props.id, refreshData]);

  // const handleFollowUser = (e: any) => {
  //   setFollowedOrNot((prevFollowed) => !prevFollowed);
  //   async function fetchData() {
  //     let loggedInUser = localStorage.getItem("activeUser");
  //     let parsedLoggedInUser: any;
  //     if (loggedInUser) {
  //       parsedLoggedInUser = JSON.parse(loggedInUser);
  //     }
  //     try {
  //       const data = await getDocs(docRef);

  //       for (const document of data.docs) {
  //         const userData = document.data();
  //         const userId = document.id;

  //         if (userData.email === props.mail) {
  //           const userDocRef = doc(db, "users", userId);

  //           if (!followedOrNot) {
  //             // Follow the user
  //             await Promise.all([
  //               updateDoc(userDocRef, {
  //                 followedBy: arrayUnion({
  //                   id: parsedLoggedInUser.loggedInUserId,
  //                   mail: parsedLoggedInUser.loggedInUserMail,
  //                 }),
  //               }),
  //               updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
  //                 following: arrayUnion({
  //                   id: props.id,
  //                   mail: props.mail,
  //                 }),
  //               }),
  //             ]);
  //           } else {
  //             // Unfollow the user
  //             await Promise.all([
  //               updateDoc(userDocRef, {
  //                 followedBy: arrayRemove({
  //                   id: parsedLoggedInUser.loggedInUserId,
  //                   mail: parsedLoggedInUser.loggedInUserMail,
  //                 }),
  //               }),
  //               updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
  //                 following: arrayRemove({
  //                   id: props.id,
  //                   mail: props.mail,
  //                 }),
  //               }),
  //             ]);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error updating data: ", error);
  //     }
  //     try {
  //       const data = await getDocs(docRef);

  //       for (const document of data.docs) {
  //         const userData = document.data();
  //         const userId = document.id;

  //         if (userData.email === props.mail) {
  //           const userDocRef = doc(db, "users", userId);

  //           if (!followedOrNot) {
  //             // Follow the user
  //             await Promise.all([
  //               updateDoc(userDocRef, {
  //                 followedBy: arrayUnion({
  //                   id: parsedLoggedInUser.loggedInUserId,
  //                   mail: parsedLoggedInUser.loggedInUserMail,
  //                 }),
  //               }),
  //               updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
  //                 following: arrayUnion({
  //                   id: props.id,
  //                   mail: props.mail,
  //                 }),
  //               }),
  //             ]);
  //           } else {
  //             // Unfollow the user
  //             await Promise.all([
  //               updateDoc(userDocRef, {
  //                 followedBy: arrayRemove({
  //                   id: parsedLoggedInUser.loggedInUserId,
  //                   mail: parsedLoggedInUser.loggedInUserMail,
  //                 }),
  //               }),
  //               updateDoc(doc(db, "users", parsedLoggedInUser.loggedInUserId), {
  //                 following: arrayRemove({
  //                   id: props.id,
  //                   mail: props.mail,
  //                 }),
  //               }),
  //             ]);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error updating data: ", error);
  //     }
  //   }
  //   fetchData();
  // };

  const handleFollowUser = async (e: any) => {
    setFollowedOrNot((prevFollowed) => !prevFollowed);
    let parsedLoggedInUser: any;
    parsedLoggedInUser = getActiveUser();
    const fetchDataAndUpdate = async () => {
      try {
        const data = await getDocs(docRef);

        for (const document of data.docs) {
          const userData = document.data();
          const userId = document.id;

          if (userData.email === props.mail) {
            const userDocRef = doc(db, "users", userId);

            const followUpdates = !followedOrNot
              ? {
                  followedBy: arrayUnion({
                    id: parsedLoggedInUser.loggedInUserId,
                    mail: parsedLoggedInUser.loggedInUserMail,
                  }),
                }
              : {
                  followedBy: arrayRemove({
                    id: parsedLoggedInUser.loggedInUserId,
                    mail: parsedLoggedInUser.loggedInUserMail,
                  }),
                };

            const followingUpdates = !followedOrNot
              ? {
                  following: arrayUnion({
                    id: props.id,
                    mail: props.mail,
                  }),
                }
              : {
                  following: arrayRemove({
                    id: props.id,
                    mail: props.mail,
                  }),
                };

            await Promise.all([
              updateDoc(userDocRef, followUpdates),
              updateDoc(
                doc(db, "users", parsedLoggedInUser.loggedInUserId),
                followingUpdates
              ),
            ]);
          }
        }
      } catch (error) {
        console.error("Error updating data: ", error);
      }
    };

    await fetchDataAndUpdate();
  };

  window.addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (
      clickedElement &&
      (clickedElement as Element).classList.contains("followButton")
    ) {
      setRefreshData(!refreshData);
    }
  });

  return (
    <>
      <div className="max-w-screen-lg m-auto p-6 flex justify-between border-b border-black/10">
        <div className="flex items-center space-x-8">
          <div className="border border-black/50 rounded-full w-12 h-12"></div>
          <h1 className="font-bold text-lg text-black/50">{props.name}</h1>
        </div>
        <div className="flex items-center justify-center text-center w-32">
          <button
            className={`bg-primary px-9 py-2 m-0 rounded-lg text-white font-bold followButton ${
              followedOrNot ? "hidden" : "block"
            }`}
            onClick={handleFollowUser}
            value={props.mail}
          >
            {`${followedOrNot ? "following" : "Follow"}`}
          </button>

          <button
            className={`followButton ${followedOrNot ? "block" : "hidden"}`}
            onClick={handleFollowUser}
            value={props.mail}
          >
            <Image src={GreenTick} alt="done" className="followButton" />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserListing;
