import Button from '@mui/material/Button';

export default function MUIButton(props: any) {

  return (
    <Button 
    variant={props.variant ? props.variant : 'contained'}
    size={props.size ? props.size : 'medium'} 
    disabled={props.disabled}
    endIcon={props.icon ? props.icon : null}
    sx={{minWidth: '130px','&:hover': {backgroundColor: props.color}}}
    style={props.style}
    type={props.type}
    onClick={props.onClick}
    >
        {props.title}
    </Button>
  );
}
