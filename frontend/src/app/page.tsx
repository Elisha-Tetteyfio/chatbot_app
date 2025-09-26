'use client'
import { Box } from "@mui/material";
import Chat from "./components/Chat";
import Conversations from "./components/Conversations";
import { useEffect, useState } from "react";

type ConversationProps = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

export default function Home() {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [currentConversation, setCurrentConversation] = useState<ConversationProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConversations() {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`);
        const data = await response.json();
        setConversations(data);
        if (data.length > 0) setCurrentConversation(data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchConversations();
  }, []);

  async function addConversation() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      const newConversation = await res.json();
      setConversations((prev) => [...prev, newConversation]);
      setCurrentConversation(newConversation);
    }
  }

  async function deleteConversation(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setConversations((prev) => prev.filter((conversation) => conversation.id !== id));
      if (currentConversation?.id === id) {
        setCurrentConversation(null);
      }
    }
  }

  return (
    <Box className="flex p-4 h-full min-h-0 gap-4 flex-1">
      <Conversations
        items={conversations}
        currentConversation={currentConversation}
        onAdd={addConversation}
        onDelete={deleteConversation}
        onSelect={setCurrentConversation}
        loading={isLoading}
      ></Conversations>
      <Chat conversation={currentConversation}></Chat>
    </Box>
  );
}
