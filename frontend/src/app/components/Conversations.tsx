import { Box, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from "@mui/icons-material";

export default function Conversations() {
  const items = ["Conversation 1", "Conversation 2"];

  return (
    <Box className="w-[25%] h-full">
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{background: "#eaddff", color: "#21005D", height:"56px", width: "100%", borderRadius: "16px", minWidth: "80px", fontWeight: "500"}}
      >
        Conversations
      </Button>

      <List>
        {items.map((c,i)=>(
          <ListItem
            sx={{background: "#eaddff", color: "#21005D", height:"56px", width: "100%", borderRadius: "16px", minWidth: "80px", fontWeight: "500", margin:"4px"}}
            key={i}
           >
            <ListItemText>{c}</ListItemText>
            <ListItemIcon><Delete /></ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
