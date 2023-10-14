import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={3300}
        replies={838}
        postImg="/post-1.jpg"
        postTitle="What Kegan Level are you?"
      />
      <UserPost
        likes={8860}
        replies={438}
        postImg="/post-2.jpg"
        postTitle="gaze into the abyss and the abyss gazes into you"
      />

      <UserPost
        likes={939}
        replies={78}
        postImg="/post-3.jpg"
        postTitle="The saddest person on earth."
      />
      <UserPost
        likes={1220}
        replies={457}
        postTitle="Your LLM agents suck because you expect them to reason over a poorly defined problem space w/o clear boundaries. They should be using tools and writing code. They should be operating on smaller units of a task. Generating “thoughts” is a waste of tokens"
      />
    </>
  );
};

export default UserPage;
