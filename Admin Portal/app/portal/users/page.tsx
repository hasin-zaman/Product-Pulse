'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MUIPagination from '@components/mui/muiPagination';
import { useRouter } from 'next/navigation';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const router=useRouter();

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setUsers(res.data.users);
      setPages(res.data.totalPages);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changePage=async (e: any, page: any) => {
    if(page!=currentPage){
        setCurrentPage(page);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <>
      <table className='w-full border-separate border-spacing-y-4'>
        <thead>
          <tr className='text-white text-center'>
            <th>Cnic</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>District</th>
            <th>No. of products</th>
          </tr>
        </thead>
        <tbody>
        {
          users.length>0 && users.map((user: any) => (
            <tr key={user.cnic} className='bg-slate-50 text-center cursor-pointer hover:bg-green-200' onClick={()=>router.push(`/portal/users/${user.cnic}`)}>
              <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200'>{user.cnic}</td>
              <td className='py-6 px-2 text-gray-900'>{user.name}</td>
              <td className='py-6 px-2 text-gray-900'>{user.mobile}</td>
              <td className='py-6 px-2 text-gray-900'>{user.email ? user.email : 'Not Provided'}</td>
              <td className='py-6 px-2 text-gray-900'>{user.district}</td>
              <td className='py-6 px-2 text-gray-900'>
                <span className={`rounded-full px-4 py-px text-xs font-semibold uppercase antialiased ${user.products.length==0 ? 'bg-orange-600/50 text-orange-900' : user.products.length>0 && user.products.length<=5 ? 'bg-green-600/50 text-green-900' : user.products.length>5 && user.products.length<=15 ? 'bg-yellow-600/50 text-yellow-900' : 'bg-red-600/50 text-red-900' }`}>
                  {user.products.length}
                </span>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <div className='flex justify-end'>
        <MUIPagination count={pages} changePage={changePage} />
      </div>
    </>
  )
}

export default Users