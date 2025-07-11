'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import { Card, CardActionArea, Divider, Paper } from '@mui/material';
import formatTime from '@utils/formatTime';
import MUIButton from '@components/mui/muiButton';
import formatMessage from '@utils/formatMessage';

type Admin = {
    userName: string,
    name: string, 
    role: string, 
    createdAt: string
}

const Admin = () => {
  const [admin, setAdmin] = useState<Admin>();

  const params = useParams();
  const router = useRouter();

  const getAdmin = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/admins/${params.admin}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setAdmin(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '100%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h2 className='font-bold text-2xl text-center my-5'>Admin Details</h2>
        <Divider />
        <div className='flex flex-row'>
          <div className='mx-5 my-5 flex'>
            <ul className='mr-3'>
              <li className='font-bold'>registered:</li>
              <li className='font-bold'>username:</li>
              <li className='font-bold'>name:</li>
              <li className='font-bold'>role:</li>
            </ul>
            <ul>
              <li>{formatTime(admin?.createdAt)}</li>
              <li>{admin?.userName}</li>
              <li>{admin?.name}</li>
              <li>
                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${admin?.role=='admin' ? 'bg-red-600/50 text-red-900' : 'bg-yellow-600/50 text-yellow-900'}`}>
                    {admin?.role}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default Admin