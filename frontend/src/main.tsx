import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import './index.css';
//import { createTheme, ThemeProvider } from '@mui/material';
//import { BrowserRouter } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import axios from 'axios';
//import { Toaster } from 'react-hot-toast';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Home from './pages/Home';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

axios.defaults.baseURL = 'https://openai-chatbot-api.onrender.com/api/v1';
axios.defaults.withCredentials = true;

/*const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: 'white' },
  }
});*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        {/*<ThemeProvider theme = { theme }>
          <Toaster position='top-center' />
          <App />*/}
          <Home />
        
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

