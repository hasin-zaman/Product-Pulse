import * as React from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';

const FormField = styled(TextField)`
  width: 100%;
  background-color: #eef2e6;
  border-radius: 7px;

  & .MuiInputLabel-root {
    color: black;
  }
`;

export default function MUITextField(props: any) {
  return (
    <FormField
        label={props.label}
        variant={props.variant}
        disabled={props.disabled}
        name={props.name}
        value={props.value || props.defaultValue}
        onChange={props.onChange}
        multiline={props.multiline}
        rows={props.rows}
        placeholder={props.placeholder}
        style={props.style}
        type={props.type}
        InputLabelProps={props.InputLabelProps}
    />
  );
}
