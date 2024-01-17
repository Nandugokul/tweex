import { useState } from "react";
import GreenTick from "../../../public/assets/greenTick.svg";
import Image from "next/image";
type userData = {
  name: string;
  mail: string;
  password: string;
};

const UserListing = (props: userData) => {
  const [followedOrNot, setFollowedOrNot] = useState(false);
  const handleFollowUser = () => {
    setFollowedOrNot((prevFollowed) => !prevFollowed);
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
          >
            {`${followedOrNot ? "following" : "Follow"}`}
          </button>

          <button
            className={`${followedOrNot ? "block" : "hidden"}`}
            onClick={handleFollowUser}
          >
            <Image src={GreenTick} alt="done" />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserListing;
