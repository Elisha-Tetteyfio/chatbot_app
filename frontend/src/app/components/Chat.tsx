import { Avatar, Box, Divider } from "@mui/material";

export default function Chat() {
  const items = ["Conversation 1", "Conversation 2"];

  return (
    <Box className="p-0 h-full bg-[#fffff] rounded-2xl"
      sx={{overflow: "auto", flex: 1}}
    >
      <div className="flex gap-3 items-center py-4 px-4">
        <Avatar src="bot_avatar.png"></Avatar>
        <div>Chatbot</div>
      </div>
      <Divider></Divider>
    </Box>
  );
}
