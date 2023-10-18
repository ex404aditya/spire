import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message || error.toString(), "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }

  return (
    <>
      <UserHeader user={user} />
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
