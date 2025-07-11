'use client';

import MUIButton from '@components/mui/muiButton';
import MUISnackbar from '@components/mui/muiSnackbar';
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {

  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [snackbarMessage, setSnackbarMessage]=useState('');
  const [snackbarColor, setSnackbarColor]=useState('');
  const [form, setForm] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const login = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
      try {
        const response=await axios.post("http://localhost:3001/auth/login", form);
        Cookies.set('accessToken', response.data.accessToken);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("userName", response.data.admin.userName);
        sessionStorage.setItem("role", response.data.admin.role);

        setSnackbarMessage(response.data.message);
        setSnackbarColor('success');
        setOpenSnackbar(true);
          
        router.push('/portal');
      } 
      catch (error: any) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarColor('error');
        setOpenSnackbar(true);
      } 
      finally {
        setIsLoading(false);
      }
  }

  return (
    <section className='min-h-screen min-w-screen center theme_background'>
      <div className='w-5/6 md:w-1/2 lg:w-1/3 min-h-screen center flex-col'>
        <div className='rounded-full bg-slate-50 w-32 h-32 center'>
          <Image src='/assets/images/logo.png' alt='Logo' width={120} height={120} className='object-contain' />
        </div>
        <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism_dark" onSubmit={login}>
          <h1 className='font-bold text-2xl text-center text-white'>Login</h1>
          <label>
            <span className="font-satoshi font-semibold text-base text_whitesmoke">
              Username
            </span>
            <input required placeholder="Enter your username" className="form_input" name='userName' value={form.userName} onChange={handleChange} />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text_whitesmoke">
              Password
            </span>
            <input type='password' required placeholder="Enter your password" className="form_input" name='password' value={form.password} onChange={handleChange} />
          </label>
          <div className="flex flex-end mx-3 mb-5 gap-4 center">
            <MUIButton type='submit' disabled={isLoading} title={isLoading ? "Logging in" : "Login"} style={{backgroundColor: 'rgb(32,33,36)'}}/>
          </div>
        </form>
      </div>
      <MUISnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarColor} onClose={() => setOpenSnackbar(false)}/>
    </section>
  )
}

export default Login