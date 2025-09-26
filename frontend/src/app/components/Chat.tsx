import { Avatar, Box, CircularProgress, Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { SendOutlined } from "@mui/icons-material";

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
  const [input, setInput] = useState('');
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function sendMessage() {
    if (input.trim()) {
      setIsAwaitingResponse(true);
      setMessages((prev) => [...prev, 
        { content: input, sender: 'user', id: -1 },
        { content: "* * *", sender: 'bot', id: -2},
      ]);
      setInput('');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversation?.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, sender: 'user' }),
      });
      if (res.ok) {
        const newMessages = await res.json();
        setMessages(newMessages);
      }
      setIsAwaitingResponse(false);
    }
  };

  useEffect(() => {
    if (!conversation) {setIsLoading(true); return};
    
    async function getMessages(){
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${conversation?.id}/messages`)
        .then((res) => res.json())
        .then(setMessages)
        .catch(console.error);
      
      setIsLoading(false)
    }

    getMessages()
  }, [conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      {isLoading? (
        <Box className="flex justify-center items-center flex-1 min-h-[100px] color-[#65558f]">
          <CircularProgress size={'48px'} color="inherit" className="text-[#65558f]"/>
        </Box>
      ) : (
        <>
          <Box className="flex-1 min-h-0 overflow-y-auto">
            <Box className="flex justify-center px-4 py-2">
              { 
                conversation?.created_at
                  ? new Date(conversation.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"
              }
            </Box>
            {messages.map((message) => (
              <Message sender={message.sender} message={message.content} key={message.id}></Message>
            ))}
            <div ref={bottomRef} />
          </Box>

          <Box className="flex items-center gap-3 px-4 py-2 min-h-[44px] border-none">
            <TextField
              disabled={isAwaitingResponse}
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Reply to Chatbot"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={sendMessage} edge="end" disabled={!input.trim()}>
                      <SendOutlined color={input.trim() ? 'primary' : 'disabled'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#ece6f0',
                minHeight: '44px',
                borderRadius: '28px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiInputBase-input': {
                  padding: '10px 16px',
                },
                transition: 'box-shadow 0.2s, border 0.2s',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '28px',
                  '& fieldset': {
                    border: input ? '1px solid #79747e' : 'transparent',
                  },
                  '&:hover fieldset': {
                    border: input ? '1px solid #79747e' : 'transparent',
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
