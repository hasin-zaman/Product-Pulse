'use client';

import React, { useState } from 'react'
import axios from 'axios'
import { Paper } from '@mui/material';
import MUIButton from '@components/mui/muiButton';
import MUITextField from '@components/mui/muiTextField';
import MUISnackbar from '@components/mui/muiSnackbar';
import { useParams } from 'next/navigation';

const RegisterResponse = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [snackbarMessage, setSnackbarMessage]=useState('');
  const [snackbarColor, setSnackbarColor]=useState('');
  const [response, setResponse] = useState('');

  const params = useParams();

  const handleChange = (e: any) => {
    setResponse(e.target.value);
    console.log(response);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res=await axios.post(`http://localhost:3001/responses/${params.product}/${sessionStorage.getItem('userName')}`, { response: response }, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});

      setSnackbarMessage(res.data.message);
      setSnackbarColor('success');
      setOpenSnackbar(true);

      setResponse('');
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
        <h2 className='font-bold text-4xl inline'>Response</h2>
        <div className='flex flex-col gap-5 w-5/6 mt-5 mb-10 glassmorphism_light'>
          <MUITextField multiline rows={10} label="Response" variant="outlined" name='response' value={response} onChange={handleChange}  />
          <div className='flex flex-end'>
            <MUIButton size='small' disabled={isLoading} title={isLoading ? "Registering.." : "Register"} onClick={handleSubmit} style={{backgroundColor: 'rgb(32,33,36)'}} />
          </div>
        </div>
      </div>
      <MUISnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarColor} onClose={() => setOpenSnackbar(false)}/>
    </Paper>
  )
}

export default RegisterResponse