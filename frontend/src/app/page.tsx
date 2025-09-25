import { Box } from "@mui/material";
import Chat from "./components/Chat";
import Conversations from "./components/Conversations";

export default function Home() {
  return (
    <Box className="flex p-4 h-[100%] gap-4">
      <Conversations></Conversations>
      <Chat></Chat>
    </Box>
  );
}
