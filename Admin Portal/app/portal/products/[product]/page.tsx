'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import { Card, CardActionArea, Divider, Paper } from '@mui/material';
import formatTime from '@utils/formatTime';
import MUIButton from '@components/mui/muiButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Product = {
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
  },
  responses? : []
}

const Product = () => {
  const [product, setProduct] = useState<Product>();

  const params = useParams();
  const router = useRouter();

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/products/${params.product}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setProduct(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '90%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className='center mt-3 flex-col'>
          <h2 className='font-bold text-2xl inline max-lg:mr-auto max-lg:ml-3'>Product details</h2>
          <MUIButton title='Post Response' style={{ background: 'linear-gradient(#15613b, #186b4b, #199b5e)', margin: '0 12px 0 auto', position: 'relative', bottom: '31px' }} onClick={()=>router.push(`/portal/products/${params.product}/register-response`)}/>
        </div>
        <Divider className='relative bottom-6'/>
        <div className='flex flex-row'>
          <div className='mx-5 flex relative bottom-5'>
            <ul className='mr-3'>
              <li className='font-bold'>time:</li>
              <li className='font-bold'>type:</li>
              <li className='font-bold'>office:</li>
              <li className='font-bold'>against:</li>
              <li className='font-bold'>status:</li>
              <li className='font-bold'>state:</li>
              <li className='font-bold'>subject:</li>
              <li className='font-bold'>product:</li>
            </ul>
            <ul>
              <li>{formatTime(product?.createdAt)}</li>
              <li>{product?.type}</li>
              <li>{product?.productOffice}</li>
              <li>{product?.productAgainst}</li>
              <li>
                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${product?.status=='unread' ? 'bg-yellow-600/50 text-yellow-900' : product?.status=='in_process' ? 'bg-blue-600/50 text-blue-900' : 'bg-green-600/50 text-green-900'}`}>
                  {product?.status}
                </span>
              </li>
              <li>
                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${product?.state=='new' ? 'bg-green-600/50 text-green-900' : product?.state=='pending' ? 'bg-blue-600/50 text-blue-900' : 'bg-red-600/50 text-red-900'}`}>
                  {product?.state}
                </span>
              </li>
              <li>{product?.subject}</li>
              <li>{product?.product}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex flex-row'>
        <Card className='mx-5 mb-5 glassmorphism_light_hover cursor-pointer w-1/2 max-lg:w-3/4' style={{padding: 0}}>
          <CardActionArea className='p-3' onClick={() => router.push(`/portal/users/${product?.user.cnic}`)}>
            <h2 className='text-center font-bold text-2xl'>User Details</h2>
            <div className='flex'>
              <ul className='mr-3'>
                <li className='font-bold'>name:</li>
                <li className='font-bold'>cnic:</li>
                <li className='font-bold'>mobile:</li>
                <li className='font-bold'>email:</li>
              </ul>
              <ul>
                <li>{product?.user.name}</li>
                <li>{product?.user.cnic}</li>
                <li>{product?.user.mobile}</li>
                <li>{product?.user.email ? product?.user.email : 'Not provided'}</li>
              </ul>
            </div>
          </CardActionArea>
        </Card>
        <div className='ml-auto mr-5 mb-5 flex items-end'>
          <MUIButton variant='text' title={`${product?.responses?.length} Responses`} icon={<KeyboardArrowRightIcon />} style={{color: 'black', float: 'bottom'}} onClick={()=>router.push(`/portal/products/${product?.productId}/responses`)}/>
        </div>
      </div>
    </Paper>
  )
}

export default Product