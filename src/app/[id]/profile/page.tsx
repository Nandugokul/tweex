"use client";

import PostFollowersFollowing from "@/components/postFollowerFollowing/PostFollowersFollowing";
import getActiveUser from "@/functions/GetActuveUserData";
import getSingleUserData from "@/functions/GetSingleUserData";
import FetchUserDataFromFireBase from "@/functions/GetWholeUserData";
import { useEffect, useState } from "react";
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

const Profile = () => {
  let userData = localStorage.getItem("activeUser");
  const [followersData, setFollowersData] = useState({
    following: [],
    followedBy: [],
  });

  let parsedData;
  if (userData !== null) {
    parsedData = JSON.parse(userData);
  } else {
    console.log("No user data found in localStorage");
  }
  const [userName, setUserName] = useState("");
  const [tabToShow, setTabToShow] = useState("");
  const [firestoreWholeUserData, setFireStoreWholeUserData] = useState<
    WholeUserData[]
  >([]);
  const [userIsFollowedBy, setUserIsFollowedBy] = useState<WholeUserData[]>([]);
  const [userIsFollowing, setUserIsFollowing] = useState<WholeUserData[]>([]);
  useEffect(() => {
    const activeUser = getActiveUser();
    if (activeUser) {
      setUserName(activeUser.loggedInUserName);
      const singleUserData = async () => {
        let userData = await getSingleUserData(activeUser.loggedInUserId);
        if (userData) {
          setFollowersData({
            following: userData.following,
            followedBy: userData.followedBy,
          });
        }
      };
      singleUserData();
    }
  }, []);

  useEffect(() => {
    const activeUser = getActiveUser();
    const getWholeUserData = async () => {
      try {
        const wholeUserData = await FetchUserDataFromFireBase();
        if (wholeUserData) {
          setFireStoreWholeUserData(wholeUserData);
          if (activeUser) {
            let activeUserId = activeUser.loggedInUserId;
            let followersData = wholeUserData.filter((item) => {
              if (item.following && item.following.length > 0) {
                return item.following.map((user) => user.id == activeUserId);
              }
            });
            setUserIsFollowing(followersData);
            let followingData = wholeUserData.filter((item) => {
              if (item.followedBy && item.followedBy.length > 0) {
                return item.followedBy.map((user) => user.id == activeUserId);
              }
            });
            setUserIsFollowedBy(followingData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    getWholeUserData();
  }, []);

  return (
    <>
      <section className="max-w-screen-lg m-auto">
        <header className="mt-8 mb-6 border-b border-black/30">
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
              <span className="text-black/40">
                Following :{" "}
                {followersData.following && followersData.following.length}
              </span>
              <span className="text-black/40">
                Followers :{" "}
                {followersData.followedBy && followersData.followedBy.length}
              </span>
            </div>
          </div>
        </header>
        <PostFollowersFollowing
          following={userIsFollowedBy}
          followers={userIsFollowing}
        />
      </section>
    </>
  );
};
export default Profile;
