'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import MUIButton from './muiButton';

const drawerWidth = 230;

export default function MUIHeader(props: any) {
  const { toggleDrawer } = props;

  const pathname=usePathname();
  const router=useRouter();

  let title='';

  const parts=pathname.split('/');

  if(pathname.startsWith('/portal/products/') && parts.length==5) {
    title=`Product # ${parts[3]} | Responses`;
  }
  else if(pathname.startsWith('/portal/products/')) {
    title=`Product # ${parts[3]}`;
  }
  else if(pathname.startsWith('/portal/users/')) {
    title='User';
  }
  else if(pathname.startsWith('/portal/responses/')) {
    title='Response';
  }
  else if(pathname.startsWith('/portal/admins/') && pathname!='/portal/admins/register') {
    title='Admin';
  }
  else {
    switch(pathname) {
      case '/portal': title='Home'; break;
      case '/portal/profile': title='My Profile'; break;
      case '/portal/profile/edit': title='Edit Profile'; break;
      case '/portal/products': title='Products'; break;
      case '/portal/users': title='Reviews'; break;
      case '/portal/responses': title='Messages'; break;
      case '/portal/admins': title='Admins'; break;
      case '/portal/admins/register': title='Admin Registration'; break;
      default: title='Admin Portal'
    }
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'rgb(32,33,36)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          {
            title=='Admins' ? 
            <MUIButton title='Register Admin' style={{ background: 'linear-gradient(#153b61, #1b4b6b, #1e5e9b)', marginLeft: 'auto' }} onClick={()=>router.push('/portal/admins/register-admin')}/> : 
            title=='My Profile' ? 
            <MUIButton title='Edit Profile' style={{ background: 'linear-gradient(#153b61, #1b4b6b, #1e5e9b)', marginLeft: 'auto' }} onClick={()=>router.push('/portal/profile/edit')}/> :
            null
          }
        </Toolbar>
      </AppBar>
    </>
  );
}
