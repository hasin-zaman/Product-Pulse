import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function MUIPagination({ count, changePage }: any) {
  return (
    <Pagination count={count} shape="rounded" color="primary" siblingCount={1} onChange={changePage} 
    sx={{
      '& .MuiPaginationItem-page': {
        color: 'whitesmoke',
      },
      '& .MuiPaginationItem-icon': {
        color: 'whitesmoke',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
        background: 'linear-gradient(#153b61, #1b4b6b, #1e5e9b)',
        color: 'white'
      },
    }}
    />
  );
}