import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select }  from '@mui/material';
import styled from 'styled-components';

const CustomSelect = styled(Select)`
  &.Mui-focused fieldset {
    border-color: green !important;
  }
`;

const CustomInputLabel = styled(InputLabel)`
  &.Mui-focused {
    color: green !important;
  }
`;

export default function MUISelect(props: any) {

  return (
    <Box sx={{ minWidth: 180, backgroundColor: '#eef2e6', borderRadius: '5px' }}>
      <FormControl fullWidth>
        <CustomInputLabel id="demo-simple-select-label">{props.label}</CustomInputLabel>
        <CustomSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.label}
          onChange={props.handleChange}
          MenuProps={{ disableScrollLock: true }}
        >
          {props.items && props.items.length>0 && props.items.map((item : any) => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
    </Box>
  );
}