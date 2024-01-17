"use client";
import firebaseConfig from "@/firebaseConfig/FireBaseConfig";
import UserListing from "./UserListing";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);

const UserListRendering = () => {
  type fireBaseUserData = {
    name: string;
    email: string;
    password: string;
  };
  const [fireBaseStoredUsers, setFireBaseStoredUsers] = useState<
    fireBaseUserData[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users");

      try {
        const querySnapshot = await getDocs(usersCollection);
        querySnapshot.forEach((doc) => {
          setFireBaseStoredUsers(doc.data().users);
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  type UserData = {
    name: string;
    mail: string;
    password: string;
    uniqueId: string;
    cPassword: string;
  };
  return (
    <>
      {fireBaseStoredUsers.map((item) => (
        <UserListing
          key={item.email}
          name={item.name}
          mail={item.email}
          password={item.password}
        />
      ))}
    </>
  );
};

export default UserListRendering;
