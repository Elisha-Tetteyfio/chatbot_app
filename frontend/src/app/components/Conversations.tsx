import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from "@mui/icons-material";
import { useState } from "react";

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
  const [deleteTarget, setDeleteTarget] = useState<ConversationProps | null>(null);
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
                onClick={(e) => {e.stopPropagation(); setDeleteTarget(item)}}
              ><Delete /></ListItemIcon>
            </ListItem>
          ))}
        </List>
      }
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        sx={{width: '400px', borderRadius: '48px', textAlign: 'center', background: '#fef7ff', margin: 'auto'}}
        PaperProps={{
          sx: {
            width: 400,
            borderRadius: "24px",
            textAlign: "center",
            background: "#fef7ff"
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "#18132b36",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <DialogContent>
          <DialogContentText color="#1d1b20">
            Are you sure you want to delete{" "}{deleteTarget?.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            onClick={() => setDeleteTarget(null)}
            sx={{background: "#e8def8", padding: '8px 16px', borderRadius: '16px', color: '#1d192b', width: '40%'}}>Cancel</Button>
          <Button
            color="error"
            sx={{background: "#b3261e", padding: '8px 16px', borderRadius: '16px', color: '#ffffff', width: '40%'}}
            onClick={() => {
              if (deleteTarget) {
                onDelete(deleteTarget.id);
              }
              setDeleteTarget(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
