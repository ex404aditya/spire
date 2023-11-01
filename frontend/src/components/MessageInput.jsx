import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const selectedConvo = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationsAtom);
  const showToast = useShowToast();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;

    try {
      const res = await fetch(`/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConvo.userId,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      setMessages((messages) => [...messages, data]);

      setConversations((prevConvo) => {
        const updatedConversations = prevConvo.map((conversation) => {
          if (conversation._id === selectedConvo._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
      setMessageText("");
    } catch (error) {
      showToast("Error", error.message || error.toString(), "error");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />

        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <MdSend />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
