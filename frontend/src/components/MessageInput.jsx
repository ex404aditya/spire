import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";

const MessageInput = () => {
  return (
    <form>
      <InputGroup>
        <Input w={"full"} placeholder="Type a message" />
        <InputRightElement>
          <MdSend />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
