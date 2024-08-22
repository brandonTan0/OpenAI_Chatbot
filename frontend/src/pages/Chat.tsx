import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sendChatRequest, getUserChats, deleteUserChats } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
    role: "user" | "assistant";
    content: string;
};

const Chat = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const handleSubmit = async() => {
      console.log(inputRef.current?.value);
      const content = inputRef.current?.value as string;
      if(inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage: Message = { role:"user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]); 
    };
    useLayoutEffect(() => {
      if(auth?.isLoggedIn && auth.user) {
        toast.loading("Loading Chats", { id: "loadchats" });
        getUserChats().then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Loading Complete", { id: "loadchats" });
        }).catch(err => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
      }
    },[auth]);

    useEffect(() => {
      if (!auth?.user) {
        return navigate("/login");
      }
    }, [auth]);
 
    const handleDelete = async() => {
      try {
        toast.loading("Deleting Chats", { id: "deleteChats" });
         await deleteUserChats();
        setChatMessages([]); 
        toast.success("Deleted Chats Successfully", { id: "deleteChats" });
      } catch(err) {
        console.log(err);
        toast.error("Failed to Delete Chats", { id: "deleteChats" });
      } 
    }

    const onEnter = async (event: React.KeyboardEvent) => {
      if(event.key === 'Enter') {
        event.preventDefault();
        await handleSubmit();
      }
    };

    return (
    <Box 
      sx={{ 
        display: 'flex', 
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
        <Box sx={{ display: { md: "flex", xs: "none", sm: 'none' }, flex: 0.2, flexDirection: "column" }}>
            <Box 
              sx={{ 
                display: "flex",
                width: "100%",
                height: "60vh",
                bgcolor: "rgb(17,29,39)",
                borderRadius: 5,
                flexDirection: "column",
                mx: 3,
                my: "auto",
              }}
            >
                <Avatar 
                  sx={{ 
                    mx: "auto", 
                    my: 2, 
                    bgcolor: "white", 
                    color: "black", 
                    fontWeight: 700,
                  }}
                >
                    { auth?.user?.name[0] } 
                    { auth?.user?.name.split(" ")[1][0] }
                </Avatar>
                <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                  You are talking to a ChatBOT
                </Typography>
                <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 2, padding: 3 }}>
                    Please note that responses are generated based on pre-existing data and should not be considered 
                    professional advice. Always consult a qualified expert or professional for specific guidance.
                </Typography>
                <Button 
                  sx={{ 
                    width: "200px", 
                    my: "auto", 
                    color: "white", 
                    fontWeight: "700", 
                    borderRadius: 3, 
                    mx: "auto", 
                    bgcolor: red[300],
                    ":hover": {
                        bgcolor: red.A400,
                    }
                  }}
                  onClick={ handleDelete }
                >Clear Conversation</Button>
            </Box>
        </Box>
        <Box sx={{ display: "flex", flex: {md: 0.8, sm: 1, xs: 1 }, flexDirection: "column", px: 3 }}>
            <Typography sx={{ fontSize: "40px", color: "white", mb: 2, mx: "auto" }}>
                Model - GPT 4o mini
            </Typography>
            <Box 
              sx={{ 
                width: "95%", 
                height: "60vh", 
                borderRadius: 3, 
                mx: "auto", 
                display: "flex", 
                flexDirection: "column", 
                overflow: "scroll",
                overflowX: "hidden",
                overflowY: "auto",
                scrollBehavior: "smooth",
              }}
            >
              { chatMessages.map((chat, index) => (
                  //@ts-ignore
                  <ChatItem content={ chat.content } role={ chat.role } key={ index } />
                )) }
            </Box>
            <div 
              style={{
                width:"97%",
                padding:"20px",
                borderRadius:8,
                backgroundColor:"rgb(17,27,39)",
                display:"flex",
                margin: "auto",
                marginTop: "10px",
              }}
            >
              <input 
                ref={ inputRef }
                onKeyDown={ onEnter }
                type="text"
                style={{
                  width:"100%",
                  backgroundColor:"transparent",
                  color:"white",
                  fontSize:"20px",
                  padding:"10px",
                  border:"none",
                  outline:"none",
                }}
              />
              <IconButton onClick={ handleSubmit } sx={{ ml:"auto", color:"white", mr: "none"}}>
                <IoMdSend />
              </IconButton>
            </div>
        </Box>
    </Box>
    );
};

export default Chat;