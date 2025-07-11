'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import { Card, CardActionArea, Divider, Paper } from '@mui/material';
import formatTime from '@utils/formatTime';

type Response = {
  responseId: number,
  response: string,
  status: string,
  createdAt: string,
  admin?: {
    userName: string,
    password: string,
    name: string,
    role: string,
    createdAt: string
  },
  product?: {
    productId: number,
    type: string,
    subject: string,
    productOffice: string,
    productAgainst: string,
    product: string,
    state: string,
    status: string,
    createdAt: string,
    user: {
      cnic: string,
      name: string,
      address: string,
      district: string,
      email: string,
      mobile: string,
      phone: string,
    }
  }
}

const Response = () => {
  const [response, setResponse] = useState<Response>();

  const params = useParams();
  const router = useRouter();

  const getResponse = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/responses/${params.response}`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } });
      setResponse(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '90%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h2 className='font-bold text-2xl text-center my-3'>Response details</h2>
        <Divider className='mb-5' />
        <div className='flex flex-row justify-between'>
          <div className='mx-5 mb-5 flex'>
            <ul className='mr-3'>
              <li className='font-bold'>time:</li>
              <li className='font-bold'>status:</li>
              <li className='font-bold'>response:</li>
            </ul>
            <ul>
              <li>{formatTime(response?.createdAt)}</li>
              <li>
                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${response?.status == 'unread' ? 'bg-orange-600/50 text-orange-900' : 'bg-green-600/50 text-green-900'}`}>
                  {response?.status}
                </span>
              </li>
              <li>{response?.response}</li>
            </ul>
          </div>
          {sessionStorage.getItem('role') == 'admin' ?
            <Card className='mx-5 mb-5 glassmorphism_light_hover cursor-pointer w-1/3 hidden md:block' style={{ padding: 0 }}>
              <CardActionArea className='p-3' onClick={() => router.push(`/portal/admins/${response?.admin?.userName}`)}>
                <h2 className='text-center font-bold text-xl'>Admin Details</h2>
                <div className='flex'>
                  <ul className='mr-3'>
                    <li className='font-bold'>name:</li>
                    <li className='font-bold'>role:</li>
                  </ul>
                  <ul>
                    <li>{response?.admin?.name}</li>
                    <li>{response?.admin?.role}</li>
                  </ul>
                </div>
              </CardActionArea>
            </Card> :
            null}
        </div>
      </div>
      {sessionStorage.getItem('role') == 'admin' ?
      <Card className='mx-auto mb-5 glassmorphism_light_hover cursor-pointer w-5/6 block md:hidden' style={{ padding: 0 }}>
        <CardActionArea className='p-3' onClick={() => router.push(`/portal/products/${response?.product?.productId}`)}>
          <h2 className='text-center font-bold text-xl'>Admin Details</h2>
          <div className='flex'>
            <ul className='mr-3'>
              <li className='font-bold'>name:</li>
              <li className='font-bold'>role:</li>
            </ul>
            <ul>
              <li>{response?.admin?.name}</li>
              <li>{response?.admin?.role}</li>
            </ul>
          </div>
        </CardActionArea>
      </Card> : 
      null}
      <Card className='mx-auto mb-5 glassmorphism_light_hover cursor-pointer w-5/6' style={{ padding: 0 }}>
        <CardActionArea className='p-3' onClick={() => router.push(`/portal/products/${response?.product?.productId}`)}>
          <h2 className='text-center font-bold text-xl'>Product Details</h2>
          <div className='flex'>
            <ul className='mr-3'>
              <li className='font-bold'>id:</li>
              <li className='font-bold'>type:</li>
              <li className='font-bold'>subject:</li>
              <li className='font-bold'>product:</li>
            </ul>
            <ul>
              <li>{response?.product?.productId}</li>
              <li>{response?.product?.type}</li>
              <li>{response?.product?.subject}</li>
              <li>{response?.product?.product}</li>
            </ul>
          </div>
        </CardActionArea>
      </Card>
    </Paper>
  )
}

export default Response