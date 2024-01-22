import firebase from "firebase/compat/app";

type post = {
  userName: string;
  postId: string;
  post: string;
  time: firebase.firestore.Timestamp;
  userId: string;
};

const SelfPost = (props: post) => {
  const date = props.time.toDate().toLocaleString();
  return (
    <>
      <div className="w-full shadow-md rounded-sm my-2 p-2 ">
        <div className="flex ">
          <div className="w-[10%]">
            <div className="border border-black/50 rounded-full h-12 w-12 "></div>
          </div>
          <div className="w-[65%] flex items-center">
            <h1 className="text-black/50 ">{props.post}</h1>
          </div>

          <p className="text-black/50 font-light text-sm  flex items-end justify-end w-[25%] ">
            {date}
          </p>
        </div>
      </div>
    </>
  );
};

export default SelfPost;
