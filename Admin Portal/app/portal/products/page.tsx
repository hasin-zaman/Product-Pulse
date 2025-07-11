'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MUIPagination from '@components/mui/muiPagination';
import { useRouter } from 'next/navigation';
import MUISelect from '@components/mui/muiSelect';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [value, setValue] = useState('');
  const [lastCall, setLastCall] = useState('');

  const router=useRouter();

  const items = ['category'];
  const brands = ['Chocolate'];

  const getProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/products', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setProducts(res.data.products);
      setPages(res.data.totalPages);
      setLastCall('getProducts');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/products/filter/${filter}/${value}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setProducts(res.data.products);
      setLastCall('filterProducts');
      setPages(res.data.totalPages);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange=async (e: any) => {
    setFilter(e.target.value);
  }

  const handleValueChange=async (e: any) => {
    setValue(e.target.value);
  }

  const changePage=async (e: any, page: any) => {
    if(page!=currentPage){
        setCurrentPage(page);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if(filter=='all') {
      setValue('');
      getProducts();
    }
  }, [filter]);

  useEffect(() => {
    if(value!='') {
      filterProducts();
    }
  }, [value]);

  useEffect(() => {
    if(lastCall=='getProducts') {
      getProducts();
    }
    else {
      filterProducts();
    }
  }, [currentPage]);

  return (
    <>
    <table className='w-full h-full border-separate border-spacing-y-4'>
      <thead>
        <tr className='text-white text-center'>
          <th>Id</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Demand</th>
        </tr>
      </thead>
      <tbody>
        <tr className='bg-slate-50 text-center cursor-pointer hover:bg-green-200'>
            <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200 font-semibold'>13</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Chocolate</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Galaxy</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Flutes</td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-green-600/50 text-green-900`}>
                20
              </span>
            </td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-red-600/50 text-red-900`}>
                high
              </span>
            </td>
        </tr>
        <tr className='bg-slate-50 text-center cursor-pointer hover:bg-green-200'>
            <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200 font-semibold'>20</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Chocolate</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Cadbury</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Dairy Milk</td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-red-600/50 text-red-900`}>
                3
              </span>
            </td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-red-600/50 text-red-900`}>
                high
              </span>
            </td>
        </tr>
        <tr className='bg-slate-50 text-center cursor-pointer hover:bg-green-200'>
            <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200 font-semibold'>21</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Chocolate</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Cadbury</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Bubbly</td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-yellow-600/50 text-yellow-900`}>
                10
              </span>
            </td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-blue-600/50 text-blue-900`}>
                low
              </span>
            </td>
        </tr>
        <tr className='bg-slate-50 text-center cursor-pointer hover:bg-green-200'>
            <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200 font-semibold'>22</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Chocolate</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Galaxy</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Silk</td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-red-600/50 text-red-900`}>
                0
              </span>
            </td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-blue-600/50 text-blue-900`}>
                low
              </span>
            </td>
        </tr>
        <tr className='bg-slate-50 text-center cursor-pointer hover:bg-green-200'>
            <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200 font-semibold'>23</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Chocolate</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Galaxy</td>
            <td className='py-6 px-2 text-gray-900 font-semibold'>Ripple</td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-yellow-600/50 text-yellow-900`}>
                15
              </span>
            </td>
            <td className='py-6 px-2'>
              <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased bg-blue-600/50 text-blue-900`}>
                low
              </span>
            </td>
        </tr>
      </tbody>
    </table>
    <div className='flex justify-between'>
      <div className='flex gap-5'>
        <MUISelect items={items} label='Filter' value={filter} handleChange={handleFilterChange}/>
        <MUISelect label='Value' value={value} handleChange={handleValueChange} items={brands} />
      </div>
      <MUIPagination count={8} changePage={changePage} />
    </div>
    </>
  )
}

export default Products