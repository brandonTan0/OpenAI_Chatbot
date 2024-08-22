import { TextField } from "@mui/material";


type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomizedInput = (props: Props) => {
    return <TextField 
        name={ props.name } 
        label={props.label} 
        type={ props.type } 
        margin="normal"
        required
        fullWidth
        autoComplete="email"
        autoFocus
        color="primary"
        sx = {{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#cacaca', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'white', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#cacaca', // Border color when focused
              },
              backgroundColor: 'white', // Background color
            },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'blue', // Label color when focused
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'blue', // Border color for the focused state
              },
        }}
    />;
};

export default CustomizedInput;