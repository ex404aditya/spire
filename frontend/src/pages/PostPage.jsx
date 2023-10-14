import {
  Avatar,
  Flex,
  Image,
  Text,
  Box,
  Divider,
  Center,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

function PostPage() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/will-deepu.png" size={"md"} name="Will Deepu" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              willdeepu
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>What Kegan Level are you?</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src="/post-1.jpg" w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          838 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
        <Text color={"gray.light"} fontSize={"sm"}>
          {3300 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>
            {" "}
            Get the app to like, reply and post.
          </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      <Comment
        comment="imo im the 3rd one my agency has no bounds"
        createdAt="2d"
        likes={100}
        username="johnycash"
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment="imo im the 1st  one my agency has no bounds"
        createdAt="4d"
        likes={21}
        username="kentdodd"
        userAvatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
        comment="imo im the 4th one my agency has no bounds"
        createdAt="11h"
        likes={440}
        username="kanyewest"
        userAvatar="https://bit.ly/code-beast"
      />
    </>
  );
}

export default PostPage;
