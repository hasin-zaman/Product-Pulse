'use client';

import React, { useState } from 'react'
import axios from 'axios'
import { Paper } from '@mui/material';
import MUIButton from '@components/mui/muiButton';
import MUITextField from '@components/mui/muiTextField';
import MUISnackbar from '@components/mui/muiSnackbar';
import MUIRadioButtons from '@components/mui/muiRadioButtons';
import { useRouter } from 'next/navigation';

const RegisterAdmin = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [snackbarMessage, setSnackbarMessage]=useState('');
  const [snackbarColor, setSnackbarColor]=useState('');
  const [form, setForm] = useState({
    name: '',
    userName: '',
    password: '',
    reEnterPassword: '',
    role: ''
  });

  const router = useRouter();

  const buttons = [
    { label: 'Admin', value: 'admin' },
    { label: 'Sub-admin', value: 'sub-admin' }
  ];

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form)
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const { name, userName, password, reEnterPassword, role } = form;
        if(password!=reEnterPassword) {
            setSnackbarMessage('Passwords do not match.');
            setSnackbarColor('error');
            setOpenSnackbar(true);
        }
        else {
            const response=await axios.post("http://localhost:3001/admins", { name, userName, password, role }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});

            setSnackbarMessage(response.data.message);
            setSnackbarColor('success');
            setOpenSnackbar(true);

            router.push('/portal/admins')
        }
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

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '100%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className='center flex-col'>
        <h2 className='font-bold text-4xl inline mt-5'>Register</h2>
        <h2 className='font-bold text-4xl inline'>Admin</h2>
        <div className='flex flex-col gap-5 w-5/6 md:w-1/2 lg:w-1/3 mt-5 mb-10 glassmorphism_light'>
          <MUITextField label="Name" variant="outlined" name='name' value={form.name} onChange={handleChange}  />
          <MUITextField label="Username" variant="outlined" name='userName' value={form.userName} onChange={handleChange}  />
          <MUITextField type='password' label="Password" variant="outlined" name='password' value={form.password} onChange={handleChange}  />
          <MUITextField type='password' label="Re-enter password" variant="outlined" name='reEnterPassword' value={form.reEnterPassword} onChange={handleChange}  />
          <MUIRadioButtons buttons={buttons} name='role' selectedValue={form.role} onChange={handleChange} />
          <div className='flex flex-end'>
            <MUIButton size='small' disabled={isLoading} title={isLoading ? "Registering.." : "Register"} onClick={handleSubmit} style={{backgroundColor: 'rgb(32,33,36)'}} />
          </div>
        </div>
      </div>
      <MUISnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarColor} onClose={() => setOpenSnackbar(false)}/>
    </Paper>
  )
}

export default RegisterAdmin