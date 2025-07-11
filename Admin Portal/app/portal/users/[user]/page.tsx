'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import { Card, CardActionArea, Divider, Paper } from '@mui/material';
import formatTime from '@utils/formatTime';
import MUIButton from '@components/mui/muiButton';
import formatMessage from '@utils/formatMessage';

type User = {
    createdAt: string,
    cnic: string,
    name: string,
    address: string,
    district: string,
    email: string,
    mobile: string,
    phone: string,
    products?: [
        {
            productId: number,
            type: string,
            subject: string,
            productOffice: string,
            productAgainst: string,
            product: string,
            state: string,
            status: string,
            createdAt: string,
            responses? : []
        }
    ]
}

const User = () => {
  const [user, setUser] = useState<User>();

  const params = useParams();
  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${params.user}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setUser(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '90%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h2 className='font-bold text-2xl text-center my-5'>User details</h2>
        <Divider/>
        <div className='flex flex-row'>
          <div className='mx-5 my-6 flex'>
            <ul className='mr-3'>
              <li className='font-bold'>registered:</li>
              <li className='font-bold'>cnic:</li>
              <li className='font-bold'>name:</li>
              <li className='font-bold'>mobile:</li>
              <li className='font-bold'>phone:</li>
              <li className='font-bold'>email:</li>
              <li className='font-bold'>district:</li>
              <li className='font-bold'>address:</li>
            </ul>
            <ul>
              <li>{formatTime(user?.createdAt)}</li>
              <li>{user?.cnic}</li>
              <li>{user?.name}</li>
              <li>{user?.mobile}</li>
              <li>{user?.phone ? user?.phone : 'Not Provided'}</li>
              <li>{user?.email ? user?.email : 'Not Provided'}</li>
              <li>{user?.district}</li>
              <li>{user?.address}</li>
            </ul>
          </div>
        </div>
        <Divider />
        <h2 className='font-bold text-2xl text-center my-7'>{user?.products?.length} Products by user</h2>
        <div className='center flex-col'>
        {user?.products && user?.products?.length>0 ? 
        user?.products?.map((product: any) => (
            <Card key={product.productId} className='mx-5 mb-5 glassmorphism_light_hover cursor-pointer w-5/6' style={{padding: 0}}>
                <CardActionArea className='p-3' onClick={() => router.push(`/portal/products/${product.productId}`)}>
                    <h2 className='text-center font-bold text-xl mt-3'>Product # {product.productId}</h2>
                    <div className='flex'>
                        <ul className='mx-3 mb-3'>
                            <li className='font-bold'>type:</li>
                            <li className='font-bold'>subject:</li>
                            <li className='font-bold'>product:</li>
                        </ul>
                        <ul>
                            <li>{product.type}</li>
                            <li>{product.subject}</li>
                            <li>{formatMessage(product.product)}</li>
                        </ul>
                    </div>
                </CardActionArea>
            </Card>
        )) : 
        <h2 className='text-center font-semibold text-2xl my-5'>No products</h2>
        }
        </div>
      </div>
    </Paper>
  )
}

export default User