import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const MessageContainer = () => {
  const showToast = useShowToast();
  const [selectedConvo, setSelectedConvo] = useRecoilState(
    selectedConversationAtom
  );
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${selectedConvo.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [showToast, selectedConvo.userId]);

  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.100", "gray.dark")}
      borderRadius={"md"}
      p={2}
      flexDirection={"column"}
    >
      {/* MessageHeader */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedConvo.userProfilePic} size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          {selectedConvo.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider />
      <Flex
        flexDir={"column"}
        p={4}
        gap={4}
        my={4}
        height={"650px"}
        overflowY={"auto"}
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />

                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessages &&
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              ownMessage={currentUser._id === message.sender}
            />
          ))}
      </Flex>
      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
