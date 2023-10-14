import {
  Avatar,
  Box,
  Text,
  Flex,
  VStack,
  Link,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { BsGlobe2 } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  const toast = useToast();
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Link copied",
        status: "success",
        description: "Profile link copied successfully",
        duration: 3000,
        isClosable: true,
      });
    });
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Will Deepu
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>willdeepu</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              spire.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Will Deepu" src="/will-deepu.png" size={"xl"} />
        </Box>
      </Flex>
      <Text>
        On pause from being online, am not reachable anywhere for foreseeable
        future (except maybe for email will@depue.net, but no promises).
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>20.5K followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>depue.design</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsGlobe2 size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Spire</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          pb="3"
          color={"gray.light"}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
