"use client";

import FetchUserDataFromFireBase from "@/functions/GetWholeUserData";
import { useEffect, useState } from "react";

const Profile = () => {
  let userData = localStorage.getItem("activeUser");

  let parsedData;
  if (userData !== null) {
    parsedData = JSON.parse(userData);
  } else {
    console.log("No user data found in localStorage");
  }
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let name = localStorage.getItem("activeUser");
    if (name !== null) {
      let parsedName = JSON.parse(name);
      setUserName(parsedName.loggedInUserName);
    } else {
      console.log("activeUser is null in localStorage");
    }
  }, []);

  useEffect(() => {
    const getWholeUserData = async () => {
      let WholeUserData = await FetchUserDataFromFireBase();
      console.log(WholeUserData);
    };
    getWholeUserData();
  }, []);

  return (
    <>
      <section className="max-w-screen-lg m-auto">
        <header className="my-8 border-b border-black/30">
          <div className="flex items-center">
            <div className="flex items-center space-x-24 w-1/4">
              <div className="border border-black/40 w-28 h-28 rounded-full"></div>
            </div>
            <h1 className="text-3xl text-black/50">{userName}</h1>
          </div>
          <div className="flex">
            <div className="w-1/4"></div>
            <div className="space-x-16 mb-6">
              <span className="text-black/40">Posts :</span>
              <span className="text-black/40">Following :</span>
              <span className="text-black/40">Followers :</span>
            </div>
          </div>
        </header>
      </section>
    </>
  );
};
export default Profile;
