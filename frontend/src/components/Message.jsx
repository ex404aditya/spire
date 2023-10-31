import { Avatar, Flex, Text } from "@chakra-ui/react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"330px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            ChatGPT is slowly going to copy every extension and do it better so
            they have complete control
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />

          <Text
            maxW={"330px"}
            bg={"gray.400"}
            p={1}
            color={"black"}
            borderRadius={"md"}
          >
            ChatGPT is slowly going to copy every extension and do it better so
            they have complete control
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
