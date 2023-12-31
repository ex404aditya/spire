import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import { BsChatRightDots } from "react-icons/bs";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const ChatPage = () => {
  const showToast = useShowToast();
  const [loadingConvo, setLoadingConvo] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);

  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const [selectedConvo, setSelectedConvo] = useRecoilState(
    selectedConversationAtom
  );

  const currentUser = useRecoilValue(userAtom);
  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
            return conversation;
          }
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(`/api/messages/conversations`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConvo(false);
      }
    };
    getConversations();
  }, [showToast, setConversations]);

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast("Error", data.error, "error");
        return;
      }

      const selfMessaging = searchedUser._id === currentUser._id;
      if (selfMessaging) {
        showToast("Error", "You can not message yourself", "error");
      }

      const existingConversation = conversations.find(
        (conversation) => conversation.participants[0]._id === searchedUser._id
      );
      if (existingConversation) {
        setSelectedConvo({
          _id: existingConversation._id,
          userId: searchedUser._id,
          userProfilePic: searchedUser.profilePic,
        });
        return;
      }

      const templateConversation = {
        template: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };

      setConversations((prevConvo) => [...prevConvo, templateConversation]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{
        base: "100%",
        md: "80%",
        lg: "750px",
      }}
      p={4}
      transform={"translateX(-50%)"}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}
      >
        <Flex
          flex={30}
          gap={2}
          maxW={{
            sm: "250px",
            md: "full",
          }}
          flexDirection={"column"}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your conversations
          </Text>

          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for a user"
              />
              <Button
                onClick={handleConversationSearch}
                isLoading={searchingUser}
                size={"sm"}
              >
                <Search2Icon />
              </Button>
            </Flex>
          </form>
          {loadingConvo &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                p={"1"}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={"10"} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}
          {!loadingConvo &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]._id
                )}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConvo._id && (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <BsChatRightDots size={80} />
            <Text fontSize={20}>Select a conversation to start messaging </Text>
          </Flex>
        )}
        {selectedConvo._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
