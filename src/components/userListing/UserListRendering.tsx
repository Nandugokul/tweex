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
    id: string;
  };
  const [fireBaseStoredUsers, setFireBaseStoredUsers] = useState<
    fireBaseUserData[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      let dataArray: fireBaseUserData[] = [];
      try {
        const snapshots = await getDocs(usersCollection);
        let data: fireBaseUserData[] = snapshots.docs.map((doc) => {
          return doc.data() as fireBaseUserData;
        });
        setFireBaseStoredUsers(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {fireBaseStoredUsers.map((item) => (
        <UserListing
          key={item.email}
          name={item.name}
          mail={item.email}
          password={item.password}
          id={item.id}
        />
      ))}
    </>
  );
};

export default UserListRendering;
