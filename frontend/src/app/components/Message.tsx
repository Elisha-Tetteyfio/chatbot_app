import { Avatar, Box } from "@mui/material";

type Props = {
  sender: "user" | "bot";
  message: string
}

export default function Message ({sender, message}: Props) {
  const isUser = sender === "user";
  const avatarSrc = isUser ? "/user_avatar.png" : "/bot_avatar.png";

  return (
    <Box className={`flex items-center gap-3 px-4 py-2 ${
        isUser ? "flex-row-reverse" : ""
      }`}>
      <Avatar src={avatarSrc} alt={sender} />
      <Box 
        className={`py-2 px-4 max-w-[336px] min-h-[44px] rounded-[20px] ${
          isUser ? "rounded-br-[8px] bg-[#625b71] text-[#ffffff]" :
              "rounded-bl-[8px] bg-[#ece6f0] text-[#49454f]" }`}
      >
        {message}
      </Box>
    </Box>
  );
}
