"use client";

import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

const Profile = () => {
  let userData = localStorage.getItem("activeUser");

  if (userData !== null) {
    let parsedData = JSON.parse(userData);
    console.log(parsedData);
  } else {
    console.log("No user data found in localStorage");
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  useEffect(() => {
    const fetchDataFromFireBase = async () => {
      const data = doc(db, "users", "userDetails");

      try {
        const snapShots = await getDoc(data);
        const userData = snapShots.data();

        if (userData && userData.users) {
          const userWithMatchingEmail = userData.users.find(
            (user: any) => user.email === "nandugokul.mec@gmail.com"
          );

          if (userWithMatchingEmail) {
            console.log("User Details:", userWithMatchingEmail);
          } else {
            console.log("User not found with email nandugokul.mec@gmail.com");
          }
        } else {
          console.log("No 'users' array in the data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataFromFireBase();
  }, []);

  return (
    <>
      <section className="max-w-screen-lg m-auto">
        <header>
          <div className="flex items-center space-x-24">
            <div className="border border-black/40 w-32 h-32 rounded-full"></div>
            <h1 className="text-3xl text-black/50">name</h1>
          </div>
        </header>
      </section>
    </>
  );
};
export default Profile;
