import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

const Message = ({ ownMessage, message }) => {
  const selectedConvo = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"330px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={user.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConvo.userProfilePic} w={7} h={7} />

          <Text
            maxW={"330px"}
            bg={"gray.400"}
            p={1}
            color={"black"}
            borderRadius={"md"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
