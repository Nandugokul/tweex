"use client";
import Post from "@/components/posts/Post";
import AddPost from "@/functions/AddPost";
import getActiveUser from "@/functions/GetActuveUserData";

import { useState } from "react";
const Feeds = () => {
  const [postInputSection, setPostInputSection] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postData, setPostData] = useState("");

  const HandleAddPost = async () => {
    let activeUser = getActiveUser();
    if (activeUser) {
      const resp = await AddPost(
        activeUser.loggedInUserId,
        activeUser.loggedInUserName,
        postData
      );
    }
  };

  return (
    <>
      <section className="max-w-screen-lg m-auto pt-10 relative">
        <button
          onClick={() => {
            setPostModalOpen(true);
          }}
          className="bg-primary text-lg font-bold text-white px-8 py-2 absolute top-3 right-0 rounded-lg"
        >
          Write
        </button>
        <div
          className={`w-full h-full bg-black/60 fixed top-0 z-30 left-0 ${
            postModalOpen ? "grid" : "hidden"
          }`}
        >
          <section className="bg-white max-w-screen-md m-auto transform place-items-center h-1/2 p-4 w-1/2 rounded-md shadow-lg">
            <textarea
              onChange={(e) => {
                setPostData(e.target.value);
              }}
              className="h-3/4 border border-black/50 w-full resize-none p-2 focus:outline-primary text-black/60"
              placeholder="Post it!"
            ></textarea>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => {
                  setPostModalOpen(false);
                }}
                className=" text-red-600 px-8 py-2 rounded-md font-bold hover:underline underline-offset-4"
              >
                cancel
              </button>
              <button
                onClick={HandleAddPost}
                className="bg-primary text-white px-8 py-2 rounded-md font-bold"
              >
                Post
              </button>
            </div>
          </section>
        </div>
        <section className="mt-6">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </section>
      </section>
    </>
  );
};
export default Feeds;
