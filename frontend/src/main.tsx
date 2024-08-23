import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

axios.defaults.baseURL = 'https://openai-chatbot-j6t5.onrender.com/api/v1';
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: 'white' },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme = { theme }>
          <Toaster position='top-center' />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
