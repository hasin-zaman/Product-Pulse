'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MUIPagination from '@components/mui/muiPagination';
import { useRouter } from 'next/navigation';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstCall, setFirstCall] = useState(false);

  const router=useRouter();

  const getAdmins = async () => {
    try {
      let res;
      if(firstCall==false) {
        await Promise.all([
          res = await axios.get('http://localhost:3001/admins', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}}),
          new Promise(resolve => setTimeout(resolve, 3000))
        ])
        setFirstCall(true);
      } 
      else {
        res = await axios.get('http://localhost:3001/admins', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      }
      
      setAdmins(res.data.admins);
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
    getAdmins();
  }, []);

  useEffect(() => {
    getAdmins();
  }, [currentPage]);

  return (
    <>
      <table className='w-full border-separate border-spacing-y-4'>
        <thead>
          <tr className='text-white text-center'>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
        {
          admins.length>0 && admins.map((admin: any) => (
            <tr key={admin.userName} className='bg-slate-50 text-center cursor-pointer hover:bg-green-200' onClick={()=>router.push(`/portal/admins/${admin.userName}`)}>
              <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200'>{admin.userName}</td>
              <td className='py-6 px-2 text-gray-900'>{admin.name}</td>
              <td className='py-6 px-2 text-gray-900'>
                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${admin?.role=='admin' ? 'bg-red-600/50 text-red-900' : 'bg-yellow-600/50 text-yellow-900'}`}>
                 {admin.role}
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

export default Admins