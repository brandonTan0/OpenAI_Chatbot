import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
    if(message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
    //return message;
}

function isCodeBlock(str: string) {
    return (
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("//") ||
        str.includes("python")
    ); 
}

function removeHashtags(message: string) {
    return message.replace(/###/g, '');
}

const chatItem = ({ 
    content,
    role,
} : {
    content: string;
    role: "user" | "assistant";
  }) => {
    const messageBlock = extractCodeFromString(content);
    const auth = useAuth();
    return role === "assistant" ? (
        <Box sx={{ display:"flex", p:2, bgcolor:"black",  gap:2 }}>
            <Avatar sx={{ ml: 0 }}>
                <img src="openai.png" alt="openai" width="30px"/>
            </Avatar>
            <Box>
                {!messageBlock && (
                    <Typography fontSize="20px">{ content }</Typography> 
                )}
                {messageBlock && 
                messageBlock.length && 
                messageBlock.map((block) => {
                    const newBlock = removeHashtags(block);
                    return isCodeBlock(newBlock) ? (
                    <SyntaxHighlighter 
                      style={ coldarkDark } 
                      language="javascript">
                        { removeHashtags(newBlock) }
                    </SyntaxHighlighter> 
                  ) : (
                    <Typography fontSize="20px">{ newBlock }</Typography>
                  )}
                )}
            </Box>
        </Box>
    ) : (
        <Box sx={{ display:"flex", p:2, bgcolor:"#7b7b85", gap:2 }}>
            <Avatar sx={{ ml: 0, bgcolor:"black", color:"white" }}>
                { auth?.user?.name[0] } 
                { auth?.user?.name.split(" ")[1][0] }
            </Avatar>
            <Box>
                <Typography fontSize="20px" sx={{ color:"black" }}>
                    { content }
                </Typography>
            </Box>
        </Box>
    )
}

export default chatItem;