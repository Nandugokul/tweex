import UserListing from "../userListing/UserListing";

type props = {
  tabToShow: string;
};

const FollowersAndFollowing = (props: props) => {
  return (
    <section className="max-w-screen-md m-auto mt-4">
      <UserListing name={"ljasklfdj"} mail={"kjj"} id={"jaljdsafj"} />
      <UserListing name={"ljasklfdj"} mail={"kjj"} id={"jaljdsafj"} />
    </section>
  );
};

export default FollowersAndFollowing;
