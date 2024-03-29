import PostIcon from "../../../public/assets/post.svg";
import FollowerIcon from "../../../public/assets/followers.svg";
import FollowingIcon from "../../../public/assets/following.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserListing from "../userListing/UserListing";
import getActiveUser from "@/functions/GetActuveUserData";
import FetchPostsFromFireBase from "@/functions/GetPost";
import { Timestamp } from "firebase/firestore";
import SelfPost from "../posts/SelfPost";
import FollowingListing from "../followingAndFollower/FollowingListing";

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

type props = {
  followers: WholeUserData[];
  following: WholeUserData[];
  numberOfPosts: any;
};

type post = {
  post: string;
  postId: string;
  time: Timestamp;
  userId: string;
  userName: string;
};

const PostFollowersFollowing = (props: props) => {
  const [followerFollowingTab, setFllowerFollowingTab] = useState("post");
  let activeUser = getActiveUser();
  const [postsFromFireBase, setPostsFromFireBase] = useState<post[]>([]);

  useEffect(() => {
    const postFetch = async () => {
      if (activeUser) {
        const posts = await FetchPostsFromFireBase(activeUser.loggedInUserId);
        if (posts && posts.posts !== undefined) {
          const sortedPosts = posts.posts.sort(
            (a: any, b: any) =>
              b.time.seconds - a.time.seconds ||
              b.time.nanoseconds - a.time.nanoseconds
          );
          setPostsFromFireBase(sortedPosts);
          // setPostsFromFireBase(posts.posts);
          props.numberOfPosts(posts.posts.length);
        } else {
          console.log("Posts data is undefined or missing.");
        }
      }
    };
    postFetch();
  }, [props.followers, props.following]);

  return (
    <>
      <section className="flex space-x-20 max-w-screen-md m-auto justify-center ">
        <div
          className={`relative flex space-x-3 items-center pb-1 cursor-pointer ${
            followerFollowingTab == "post" ? "border-b border-black" : ""
          } `}
          onClick={() => {
            setFllowerFollowingTab("post");
          }}
        >
          <Image src={PostIcon} alt="post" priority width={30} />
          <h1
            className={`text-sm  mt-1 ${
              followerFollowingTab == "post" ? "text-black" : "text-black/50"
            }`}
          >
            Posts
          </h1>
        </div>
        <div
          className={`relative flex space-x-3 items-center pb-1 cursor-pointer ${
            followerFollowingTab == "following" ? "border-b border-black" : ""
          } `}
          onClick={() => {
            setFllowerFollowingTab("following");
          }}
        >
          <Image src={FollowingIcon} alt="post" priority width={20} />
          <h1
            className={`text-sm  mt-1 ${
              followerFollowingTab == "following"
                ? "text-black"
                : "text-black/50"
            }`}
          >
            Following
          </h1>
        </div>
        <div
          className={`relative flex space-x-3 items-center pb-1 cursor-pointer ${
            followerFollowingTab == "follower" ? "border-b border-black" : ""
          } `}
          onClick={() => {
            setFllowerFollowingTab("follower");
          }}
        >
          <Image src={FollowerIcon} alt="post" priority width={20} />
          <h1
            className={`text-sm  mt-1 ${
              followerFollowingTab == "follower"
                ? "text-black"
                : "text-black/50"
            }`}
          >
            Followers
          </h1>
        </div>
      </section>
      <section>
        <div
          className={`${followerFollowingTab == "post" ? "block" : "hidden"}`}
        >
          {postsFromFireBase.map((post) => {
            return (
              <SelfPost
                key={post.postId}
                userName={post.userName}
                postId={post.postId}
                post={post.post}
                time={post.time}
                userId={post.userId}
              />
            );
          })}
        </div>
        <div
          className={`${
            followerFollowingTab == "following" ? "block" : "hidden"
          }`}
        >
          {props.following.map((user) => {
            return (
              <FollowingListing
                key={user.id}
                name={user.name}
                mail={user.email}
                id={user.id}
              />
            );
          })}
        </div>

        <div
          className={`${
            followerFollowingTab == "follower" ? "block" : "hidden"
          }`}
        >
          {props.followers.map((user) => {
            if (activeUser?.loggedInUserId != user.id) {
              return (
                <UserListing
                  key={user.id}
                  name={user.name}
                  mail={user.email}
                  id={user.id}
                />
              );
            }
          })}
        </div>
      </section>
    </>
  );
};
export default PostFollowersFollowing;
