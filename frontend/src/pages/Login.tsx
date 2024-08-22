import React, { useEffect } from 'react';
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography, useTheme } from '@mui/material';
import CustomizedInput from '../components/shared/CustomizedInput';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
      primary: {
        main: '#616161', 
      },
    },
  });

const Login = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log(email, password);
        try {
            toast.loading("Signing In...", { id: "login" });
            await auth?.login(email, password);
            toast.success("Signed In Successfully", { id: "login" });
        } catch(err) {
            console.log(err);
            toast.error("Sign In Failed", { id: "login" });
        }
    };

    // Redirect to chat if user is already logged in
    useEffect(() => {
      if (auth?.user) {
        return navigate('/chat');
      }
    }, [auth]);
    return (
        <Box width={"100%"} height={"10%"} display="flex" flex={1} sx={{ margin:"auto" }}>

            <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none", marginLeft: "auto" }}>
                <img src='openai.png' alt='logo' style={{width: "500px" }}/>
            </Box>

            <ThemeProvider theme={theme}>
                <Box 
                  display="flex" 
                  flex={{ xs: 1, md: 0.5}} 
                  justifyContent="center"   
                  alignItems="center"
                  padding={2}
                  ml="auto"
                  mr="auto"
                  mt={16}
                  flexDirection="column"
                  sx={{ backgroundColor: "white", borderRadius: '10px', border: '3px solid #212020'}}
                >
                    <Typography component="h1" variant="h5" sx={{ color:"#212020" }}>
                      Sign in
                    </Typography>
                    <Box component="form" sx={{ mt: 1, }} onSubmit={ (handleSubmit) }>
                        <CustomizedInput name="email" label="Email Address" type="email" />
                        <CustomizedInput name="password" label="Password" type="password" />
                        <FormControlLabel 
                            sx={{ color: "#212020"}}
                            control={<
                            Checkbox value="remember" 
                            color="primary" 
                            sx={{
                                '&.MuiCheckbox-root': {
                                  color: '#cacaca',
                                },
                                '&.Mui-checked': {
                                  color: '#212020',
                                },
                              }}
                            />}
                            label="Remember me"
                        />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        className='button'
                      >
                        Sign In 
                      </Button>
                    </Box>
                </Box>
            </ThemeProvider>
        </Box>
    )
};

export default Login;