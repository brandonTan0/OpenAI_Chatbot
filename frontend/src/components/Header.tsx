import React from 'react';
import { AppBar, Toolbar }from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo />
                <div>
                    {auth?.isLoggedIn ? (
                        <>
                          <NavigationLink 
                            to='/chat' 
                            bg='#000' 
                            text='Go To Chat' 
                            textColor='#fff'
                          />
                          <NavigationLink 
                            to='/' 
                            bg='#000' 
                            text='Logout' 
                            textColor='#fff'
                            onClick={auth.logout}
                          />
                        </>
                    ) : (
                        <>
                          <NavigationLink 
                            to='/login' 
                            bg='#000' 
                            text='Login' 
                            textColor='#fff'
                          />
                          <NavigationLink 
                            to='/signup' 
                            bg='#000' 
                            text='Signup' 
                            textColor='#fff'
                          />
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;