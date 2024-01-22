import firebase from "firebase/compat/app";

type post = {
  userName: string;
  postId: string;
  post: string;
  time: firebase.firestore.Timestamp;
  userId: string;
};

const Post = (props: post) => {
  const date = props.time.toDate().toLocaleString();
  return (
    <>
      <div className="w-full shadow-md rounded-sm my-2 p-2">
        <div className="grid grid-cols-10">
          <div className="border border-black/50 rounded-full h-12 w-12 col-span-1"></div>
          <h1 className="text-black/50 font-bold text-xl col-span-7 flex items-center ">
            {props.userName}
          </h1>
          <p className="text-black/50 font-light text-sm col-span-2 flex items-end ">
            {date}
          </p>
          <p className="col-span-full pt-4 pb-2 text-black/70">{props.post}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
