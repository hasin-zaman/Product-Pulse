'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MUIPagination from '@components/mui/muiPagination';
import { useRouter } from 'next/navigation';
import formatMessage from '@utils/formatMessage';

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const router=useRouter();

  const getResponses = async () => {
    try {
      const res = await axios.get('http://localhost:3001/responses', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}, params: { page: currentPage, limit: 5}});
      setResponses(res.data.responses);
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
    getResponses();
  }, []);

  useEffect(() => {
    getResponses();
  }, [currentPage]);

  return (
    <>
      <table className='w-full border-separate border-spacing-y-4'>
        <thead>
          <tr className='text-white text-center'>
            <th>id</th>
            <th>Product id</th>
            <th>Response</th>
            <th>Admin</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {
          responses.length>0 && responses.map((response: any) => (
            <tr key={response.responseId} className='bg-slate-50 text-center cursor-pointer hover:bg-green-200' onClick={()=>router.push(`/portal/responses/${response.responseId}`)}>
              <td className='py-3 px-4 text-gray-900 bg-gray-200 hover:bg-green-200'>{response.responseId}</td>
              <td className='py-6 px-2 text-gray-900'>{response.product.productId}</td>
              <td className='py-6 px-2 text-gray-900'>{formatMessage(response.response)}</td>
              <td className='py-6 px-2 text-gray-900'>{response.admin.name}</td>
              <td className='py-6 px-2 text-gray-900'>
                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${response?.status=='unread' ? 'bg-orange-600/50 text-orange-900' : 'bg-green-600/50 text-green-900'}`}>
                 {response.status}
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

export default Responses