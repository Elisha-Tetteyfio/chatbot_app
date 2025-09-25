import { Avatar, Box, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

type ConversationProps = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

type MessageProps = {
  id: number;
  sender: "bot" | "user";
  content: string;
};

export default function Chat({conversation}: { conversation:ConversationProps | null }) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
   const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversation) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversation.id}/messages`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  }, [conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if(!conversation){
     return <div className="flex-1 flex items-center justify-center italic text-2xl text-[#f0d1f9]">No conversation selected</div>;
  }

  return (
    <Box
      className="p-0 bg-white rounded-2xl flex flex-col flex-1"
      sx={{ minHeight: 0 }}
    >
      <Box className="flex gap-3 items-center py-4 px-4">
        <Avatar src="bot_avatar.png"></Avatar>
        <div>Chatbot</div>
      </Box>
      <Divider></Divider>
      <Box className="flex-1 min-h-0 overflow-y-auto">
        <Box className="flex justify-center px-4 py-2">{new Date(conversation?.created_at).toLocaleString('en-US', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Box>
        {messages.map((message) => (
          <Message sender={message.sender} message={message.content}></Message>
        ))}
        <div ref={bottomRef} />
      </Box>
    </Box>
  );
}
