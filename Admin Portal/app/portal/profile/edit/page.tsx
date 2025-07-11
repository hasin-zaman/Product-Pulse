'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MUIButton from '@components/mui/muiButton';
import MUITextField from '@components/mui/muiTextField';
import MUISnackbar from '@components/mui/muiSnackbar';

const EditProfile = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [snackbarMessage, setSnackbarMessage]=useState('');
  const [snackbarColor, setSnackbarColor]=useState('');
  const [profile, setProfile] = useState({
    name: '',
    userName: '',
    password: '',
    oldPassword: ''
  });

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
    console.log(profile)
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const {name, userName, password, oldPassword } = profile; 

        if(password != '') {
            await axios.post("http://localhost:3001/auth/login", { userName: sessionStorage.getItem('userName'), password: oldPassword });
            await axios.patch(`http://localhost:3001/admins/${sessionStorage.getItem('userName')}`, { password }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
        }  
        
        const response=await axios.patch(`http://localhost:3001/admins/${sessionStorage.getItem('userName')}`, { name, userName }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});

        console.log(response)
        setSnackbarMessage(response.data.message);
        setSnackbarColor('success');
        setOpenSnackbar(true);
    } catch (error: any) {
      if(typeof error.response.data.message == 'string') {
        setSnackbarMessage(error.response.data.message);
      } 
      else {
        setSnackbarMessage(error.response.data.message[0]);
      }
      setSnackbarColor('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

    const getProfile = async () => {
        try {
        const res = await axios.get('http://localhost:3001/auth/profile', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
        setProfile({
            name: res.data.name,
            userName: res.data.userName,
            password: '',
            oldPassword: ''  
        });
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '100%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className='center flex-col'>
            <div className='center flex-col gap-5 w-5/6 md:w-1/2 lg:w-1/3 mt-5 mb-10 glassmorphism_light'>
                <AccountCircle style={{ fontSize: '100px' }} />
                <div className='flex flex-col gap-5 w-3/4 mt-5 mb-10'>
                    <MUITextField label="Name" variant="outlined" name='name' value={profile.name} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                    <MUITextField label="Username" variant="outlined" name='userName' value={profile.userName} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                    <MUITextField type='password' label="Old Password" variant="outlined" name='oldPassword' value={profile.oldPassword} onChange={handleChange} />
                    <MUITextField type='password' label="New Password" variant="outlined" name='password' value={profile.password} onChange={handleChange}  />
                    <div className='flex flex-end'>
                        <MUIButton size='small' disabled={isLoading} title={isLoading ? "Saving.." : "Save"} onClick={handleSubmit} style={{backgroundColor: 'rgb(32,33,36)'}} />
                    </div>
                </div>
            </div>
        </div>
        <MUISnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarColor} onClose={() => setOpenSnackbar(false)}/>
    </Paper>
  )
}

export default EditProfile