'use client';

import * as React from 'react';
import { Box, Divider, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, PeopleAlt, AccountCircle, Inventory, RateReview, Forum } from '@mui/icons-material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import MUIButton from './muiButton';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react'

const drawerWidth = 230;

export default function MUIDrawer(props: any) {
  const { window, isDrawerOpen, toggleDrawer } = props;
  const [isLoading, setIsLoading]=React.useState(false);
  const [role, setRole] = useState<string | null>();

  const pathname=usePathname();
  const router=useRouter();

  const logout=async ()=>{
    try {
      setIsLoading(true);
      Cookies.remove('accessToken');
      sessionStorage.clear();
      router.push('/');
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setRole(sessionStorage.getItem('role'));
  }, []);

  const drawer = (
    <div className='theme_background min-h-full'>
      <Toolbar />
      <div className='center pb-4'>
        <div className='rounded-full bg-slate-50 w-24 h-24 center'>
          <Image src='/assets/images/logo.png' alt='Logo' width={90} height={90} className='object-contain' />
        </div>
      </div>
      <Divider />
      <List>
        <ListItem disablePadding selected={pathname==='/portal'} style={{ color: pathname === '/portal' ? 'white' : 'whitesmoke', backgroundColor: pathname === '/portal' ? 'rgba(255, 255, 255, 0.1)' : 'transparent', borderLeft: pathname === '/portal' ? '3px solid white' : '3px solid transparent' }}>
          <ListItemButton disableRipple={pathname==='/portal'} style={{cursor: pathname === '/portal' ? 'default' : 'pointer'}} onClick={pathname==='/portal' ? ()=>{} : ()=>router.push('/portal')}>
            <ListItemIcon style={{color: pathname === '/portal' ? 'white' : 'whitesmoke'}}><Home /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding selected={pathname.startsWith('/portal/products')} style={{ color: pathname.startsWith('/portal/products') ? 'white' : 'whitesmoke', backgroundColor: pathname.startsWith('/portal/products') ? 'rgba(255, 255, 255, 0.1)' : 'transparent', borderLeft: pathname.startsWith('/portal/products') ? '3px solid white' : '3px solid transparent' }}>
          <ListItemButton disableRipple={pathname==='/portal/products'} style={{cursor: pathname === '/portal/products' ? 'default' : 'pointer'}} onClick={pathname==='/portal/products' ? ()=>{} : ()=>router.push('/portal/products')}>
            <ListItemIcon style={{color: pathname.startsWith('/portal/products') ? 'white' : 'whitesmoke'}}><Inventory /></ListItemIcon>
            <ListItemText primary='Products' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding selected={pathname.startsWith('/portal/users')} style={{ color: pathname.startsWith('/portal/users') ? 'white' : 'whitesmoke', backgroundColor: pathname.startsWith('/portal/users') ? 'rgba(255, 255, 255, 0.1)' : 'transparent', borderLeft: pathname.startsWith('/portal/users') ? '3px solid white' : '3px solid transparent' }}>
          <ListItemButton disableRipple={pathname==='/portal/users'} style={{cursor: pathname === '/portal/users' ? 'default' : 'pointer'}} onClick={pathname==='/portal/users' ? ()=>{} : ()=>router.push('/portal/users')}>
            <ListItemIcon style={{color: pathname.startsWith('/portal/users') ? 'white' : 'whitesmoke'}}><RateReview /></ListItemIcon>
            <ListItemText primary='Reviews' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding selected={pathname.startsWith('/portal/messages')} style={{ color: pathname.startsWith('/portal/messages') ? 'white' : 'whitesmoke', backgroundColor: pathname.startsWith('/portal/messages') ? 'rgba(255, 255, 255, 0.1)' : 'transparent', borderLeft: pathname.startsWith('/portal/messages') ? '3px solid white' : '3px solid transparent' }}>
          <ListItemButton disableRipple={pathname==='/portal/messages'} style={{cursor: pathname === '/portal/messages' ? 'default' : 'pointer'}} onClick={pathname==='/portal/messages' ? ()=>{} : ()=>router.push('/portal/messages')}>
            <ListItemIcon style={{color: pathname.startsWith('/portal/messages') ? 'white' : 'whitesmoke'}}><Forum /></ListItemIcon>
            <ListItemText primary='Messages' />
          </ListItemButton>
        </ListItem>
        {role=='admin' ? 
          <ListItem disablePadding selected={pathname.startsWith('/portal/admins')} style={{ color: pathname.startsWith('/portal/admins') ? 'white' : 'whitesmoke', backgroundColor: pathname.startsWith('/portal/admins') ? 'rgba(255, 255, 255, 0.1)' : 'transparent', borderLeft: pathname.startsWith('/portal/admins') ? '3px solid white' : '3px solid transparent' }}>
            <ListItemButton disableRipple={pathname==='/portal/admins'} style={{cursor: pathname === '/portal/admins' ? 'default' : 'pointer'}} onClick={pathname==='/portal/admins' ? ()=>{} : ()=>router.push('/portal/admins')}>
              <ListItemIcon style={{color: pathname.startsWith('/portal/admins') ? 'white' : 'whitesmoke'}}><PeopleAlt /></ListItemIcon>
              <ListItemText primary='Admins' />
            </ListItemButton>
          </ListItem> :
          null
        }
      </List>
      <Divider />
      <ListItem disablePadding selected={pathname.startsWith('/portal/profile')} style={{ color: pathname.startsWith('/portal/profile') ? 'white' : 'whitesmoke', backgroundColor: pathname.startsWith('/portal/profile') ? 'rgba(255, 255, 255, 0.1)' : 'transparent', borderLeft: pathname.startsWith('/portal/profile') ? '3px solid white' : '3px solid transparent' }}>
          <ListItemButton disableRipple={pathname==='/portal/profile'} style={{cursor: pathname === '/portal/profile' ? 'default' : 'pointer'}} onClick={pathname==='/portal/profile' ? ()=>{} : ()=>router.push('/portal/profile')}>
            <ListItemIcon style={{color: pathname.startsWith('/portal/profile') ? 'white' : 'whitesmoke'}}><AccountCircle /></ListItemIcon>
            <ListItemText primary='My Profile' />
          </ListItemButton>
      </ListItem>
      <Divider />
      <div className='center mt-16'>
        <MUIButton disabled={isLoading} title={isLoading ? "Logging out" : "Logout"} onClick={()=>logout()} style={{backgroundColor: 'rgb(32,33,36)'}}/>
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, minHeight: '100%' }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          ModalProps={{keepMounted: true}}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, minHeight: '100%' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: '0', minHeight: '100%' }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  );
}