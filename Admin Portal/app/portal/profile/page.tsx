'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import formatTime from '@utils/formatTime';

type Profile = {
    userName: string,
    name: string, 
    role: string, 
    createdAt: string
}

const Profile = () => {
    const [profile, setProfile] = useState<Profile>();

    const getProfile = async () => {
        try { 
          const res = await axios.get('http://localhost:3001/auth/profile', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
          setProfile(res.data);
          console.log(res.data)
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
                <div className='flex flex-row'>
                    <div className='mx-5 my-5 flex'>
                        <ul className='mr-3'>
                            <li className='font-bold'>registered:</li>
                            <li className='font-bold'>username:</li>
                            <li className='font-bold'>name:</li>
                            <li className='font-bold'>role:</li>
                        </ul>
                        <ul>
                            <li>{formatTime(profile?.createdAt)}</li>
                            <li>{profile?.userName}</li>
                            <li>{profile?.name}</li>
                            <li>
                                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${profile?.role=='admin' ? 'bg-red-600/50 text-red-900' : 'bg-yellow-600/50 text-yellow-900'}`}>
                                    {profile?.role}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </Paper>
  )
}

export default Profile