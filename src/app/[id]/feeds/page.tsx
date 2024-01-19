import NavBar from "@/components/navBar/NavBar";
import Post from "@/components/posts/Post";

const Feeds = () => {
  return (
    <>
      <section className="max-w-screen-lg m-auto pt-10 relative">
        <button className="bg-primary text-lg font-bold text-white px-8 py-2 absolute top-3 right-0 rounded-lg">
          Write
        </button>
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
