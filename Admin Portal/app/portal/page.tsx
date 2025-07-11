'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';

type ProductDetails = {
  totalProducts: number,
  totalGeneralProducts: number,
  totalChildRelatedProducts: number,
  totalUnreadProducts: number,
  totalInProcessProducts: number,
  totalResolvedProducts: number,
  totalNewProducts: number,
  totalPendingProducts: number,
  totalCriticalProducts: number
}

type UserDetails = {
  totalUsers: number
}

const Portal = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [userDetails, setUserDetails] = useState<UserDetails>();

  const getProductDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3001/products/details', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setProductDetails(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users/details', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setUserDetails(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
    
  useEffect(() => {
    getProductDetails();
    getUserDetails();
  }, []);

  return (
    <div className='center flex-wrap gap-5'>
      <div className='bg-stone-300 w-96 h-64 rounded-2xl'>
        <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
          <h2 className='font-semibold font-sans text-2xl'>Products</h2>
          <h2 className='text-center font-semibold text-8xl my-auto'>85</h2>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-blue-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Brands</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>12</h2>
          </div>
        </div>
        <div className='bg-purple-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Categories</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>17</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-yellow-500 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>High-demand products</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>39</h2>
          </div>
        </div>
        <div className='bg-yellow-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Mid-demand products</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>13</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-yellow-200 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Low-demand products</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>33</h2>
          </div>
        </div>
        <div className='bg-red-200 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>New stock</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>863</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-red-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Intermediate stock</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>789</h2>
          </div>
        </div>
        <div className='bg-red-500 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Old stock</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>285</h2>
          </div>
        </div>
      </div>
      <div className='bg-gray-300 w-96 h-64 rounded-2xl'>
        <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
          <h2 className='font-semibold font-sans text-2xl'>Stock</h2>
          <h2 className='text-center font-semibold text-8xl my-auto'>1937</h2>
        </div>
      </div>
    </div>
  )
}

export default Portal