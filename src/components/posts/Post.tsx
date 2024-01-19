const Post = () => {
  return (
    <>
      <div className="w-full shadow-md rounded-sm my-2 p-2">
        <div className="grid grid-cols-10">
          <div className="border border-black/50 rounded-full h-12 w-12 col-span-1"></div>
          <h1 className="text-black/50 font-bold text-xl col-span-7 flex items-center ">
            name
          </h1>
          <p className="text-black/50 font-light text-sm col-span-2 flex items-end ">
            time
          </p>
          <p className="col-span-full pt-4 pb-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
            quis ad culpa aspernatur ullam tempora minus aperiam corrupti odio,
            magni voluptas impedit perferendis veritatis! Quod omnis
            voluptatibus numquam porro? Autem consequatur voluptatum non nihil
            ratione ad consequuntur assumenda adipisci mollitia.
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
