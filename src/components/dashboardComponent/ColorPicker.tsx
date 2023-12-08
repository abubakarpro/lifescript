import { Box, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { BlockPicker, ColorResult } from "react-color";

const ColorPickerComponent = ({setSelectedColor, selectedColor}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
  };

  const handleInputClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputColor = event.target.value;
    setSelectedColor(inputColor);
  };

  return (
    <div>
      <Box>
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
          }}
        >
          Colour Palette*
        </Typography>
        <TextField
          variant="outlined"
          placeholder={"Colour Palette*"}
          name="text"
          ref={inputRef}
          type="text"
          value={selectedColor}
          onClick={handleInputClick}
          onChange={handleInputChange}
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: "white",
            },
            width: "100%",
          }}
        />
      </Box>
      {displayColorPicker && (
        <div ref={colorPickerRef} style={{ position: "absolute", zIndex: 2 }}>
          <BlockPicker color={selectedColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPickerComponent;
