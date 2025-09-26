import { Box, Button, CircularProgress, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from "@mui/icons-material";

type ConversationProps = {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

type Props = {
  items: ConversationProps[];
  currentConversation: ConversationProps | null;
  onAdd: () => void;
  onDelete: (id: number) => void;
  onSelect: (conversation: ConversationProps) => void;
  loading: boolean;
};

export default function Conversations({items, currentConversation, onAdd, onDelete, onSelect, loading}: Props) {
  return (
    <Box className="w-[100%] h-full flex flex-col gap-4">
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        sx={{background: "#eaddff", color: "#21005d", height:"56px", width: "100%", borderRadius: "16px", minWidth: "80px", fontWeight: "500"}}
        onClick={()=>onAdd()}
      >
        Conversations
      </Button>

      {loading? <Box className="flex justify-center items-center flex-1 min-h-[100px] color-[#65558f]">
        <CircularProgress size={'48px'} color="inherit" className="text-[#65558f]"/>
      </Box>: 
        <List>
          {items.map((item)=>(
            <ListItem
              key={item.id}
              sx={{background: currentConversation?.id === item.id ? "#d8b4fe" : "#e8def8", cursor: "pointer", color: "#21005D", height:"56px", width: "100%", borderRadius: "16px", minWidth: "80px", fontWeight: "500", margin:"4px 0"}}
              onClick={() => onSelect(item)}
            >
              <ListItemText>{item.title}</ListItemText>
              <ListItemIcon
                onClick={(e) => {e.stopPropagation(); onDelete(item.id)}}
              ><Delete /></ListItemIcon>
            </ListItem>
          ))}
        </List>
      }
    </Box>
  );
}
