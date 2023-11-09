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
import { useEffect, useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const MessageContainer = () => {
  const showToast = useShowToast();

  const currentUser = useRecoilValue(userAtom);
  const selectedConvo = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationsAtom);

  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);

  const { socket } = useSocket();
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedConvo._id === message.conversationId) {
        setMessages((prev) => [...prev, message]);
      }

      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });

    return () => socket.off("newMessage");
  }, [socket, selectedConvo, setConversations]);

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser._id;
    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: selectedConvo._id,
        userId: selectedConvo.userId,
      });
    }

    socket.on("messagesSeen", ({ conversationId }) => {
      if (selectedConvo._id === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
    });
  }, [socket, currentUser._id, messages, selectedConvo]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedConvo.template) return;
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
  }, [showToast, selectedConvo.userId, selectedConvo.template]);

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
            <Flex
              key={message._id}
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messageEndRef
                  : null
              }
              direction={"column"}
            >
              <Message
                message={message}
                ownMessage={currentUser._id === message.sender}
              />{" "}
            </Flex>
          ))}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
