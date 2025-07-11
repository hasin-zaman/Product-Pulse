'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MUIDrawer from '@components/mui/muiDrawer'
import MUIHeader from '@components/mui/muiHeader'
import RootLoader from '@components/rootLoader';

interface Props {
  children: React.ReactNode;
}

const PortalLayout: React.FC<Props> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return !loading ? (
    <Box sx={{ display: 'flex', height: '100%'}}>
      <MUIDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <MUIHeader isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}
        style={{ backgroundColor: '#454545', height: '100%', minHeight: '100vh' }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  ) : ( <RootLoader /> )
}

export default PortalLayout
