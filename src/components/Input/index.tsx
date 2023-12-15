import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  borderRadius?: string;
  bgColor?: string;
  border?: string;
  height?: string;
  color?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  borderRadius,
  bgColor,
  border = '1px solid #186F65',
  height = '56px',
  color,
  onChange = () => {},
  disabled = false,
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
          color: color,
          ml: "5px"
        }}
      >
        {label}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        name={placeholder}
        onChange={onChange}
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            border: border,
            height: height,
          pl: "15px",
          },
          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            border: "0px",
          },
          width: '100%',
          '&:hover': {
            border: 'none',
            outline: 'none',
          },
        }}
      />
    </Box>
  );
};

export default InputWithLabel;
