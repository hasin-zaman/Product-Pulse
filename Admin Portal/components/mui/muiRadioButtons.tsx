import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function MUIRadioButtons(props: any) {
  
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" color='success'>Role</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name={props.name} value={props.selectedValue} onChange={props.onChange}>
        {props.buttons && props.buttons.length>0 && props.buttons.map((button: any) => (
            <FormControlLabel key={button.value} value={button.value} label={button.label} control={<Radio color='success' />} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
