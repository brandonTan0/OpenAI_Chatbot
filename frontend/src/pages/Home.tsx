import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TypingAnim from '../components/typer/TypeAnim';

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    return (
      <Box width="100%" height="100%">
        <Box 
          sx={{ 
            display:"flex", 
            width:"100%", 
            flexDirection:"column", 
            alignItems:"center", 
            mx:"auto",
            mt:3, 
            }}
        >
            <Box>
                <TypingAnim/>
            </Box>
            <Box 
              sx={{ 
                width:"100%", 
                display: { md: "flex", sm:"none", xs:"none" },
                flexDirection:{ md:"row", xs:"column" }, 
                gap: 5, 
                my: 20, 
                justifyContent: "center", 
                alignItems: "center",
                height: "50vh",
              }}
            >
                <img 
                  src="robot.png" 
                  alt="robot" 
                  style={{ width:"200px", margin:"auto" }} 
                />
                <img 
                  src="chat.png"
                  alt="chatbot"
                  style={{ display:"flex", 
                    width: isBelowMd ? "80%" : "60%",
                    borderRadius: 20, 
                    boxShadow:"-5px -5px 105px #64f3d5", 
                    margin:"auto",
                }}
                />
                <img 
                  className="rotate"
                  src="openai.png" 
                  alt="openai" 
                  style={{ width:"200px", margin:"auto" }} 
                />
            </Box>
        </Box>
      </Box>
    )
};

export default Home;