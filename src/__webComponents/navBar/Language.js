import Check from "@/__webAssets/svgs/check.svg";
import EN from "@/__webAssets/svgs/EN.svg";
import SP from "@/__webAssets/svgs/SP.svg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import i18n from "i18next";
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from "./NavBar.module.css";

const CustomDropdownIcon = (props) => {
  return <KeyboardArrowDownIcon {...props} style={{ color: '#E1683B' }} />;
};

export default function SelectLabels() {
  const [selectedValue, setSelectedValue] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsDropdownOpen(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



    const handleChange = useCallback((event) => {
      const value = event.target.value;
      setSelectedValue(value);
      changeLanguage(value === 10 ? "en" : "sp");
    }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const renderValue = useMemo(() => (value) => {
    return value === 10 ? "EN" : "ES";
  }, []);

  return (
    <Box sx={{ position: "relative"}}>
      <FormControl sx={{ minWidth: 70, backgroundColor: "white", border:"1px", borderRadius:"5px" }}>
        <Select
          value={selectedValue}
          onChange={handleChange}
          open={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          onOpen={() => setIsDropdownOpen(true)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select language' }}
          renderValue={renderValue}
          IconComponent={CustomDropdownIcon}
          MenuProps={{
            PaperProps: {
              style: {
                marginTop: '8px',
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            getContentAnchorEl: null,
          }}
          sx={{
            height: 44,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E1683B',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E1683B',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E1683B',
            },
            '& .MuiSelect-select': {
              color: '#E1683B',
            },
          }}
        >
          <MenuItem
            value={10}
            disableRipple
            className={`${styles.option} ${styles.optiontop} ${selectedValue === 10 && styles.optionsBg}`}
          >
            EN
            <Box sx={{ position: "absolute", left: "15px", top: "17px" }}>
              <Image src={EN} alt="English" width={25} height={25} />
            </Box>
            {selectedValue === 10 && (
              <Box sx={{ position: "absolute", right: "15px", bottom: "20px" }}>
                <Image src={Check} alt="check" width={17} />
              </Box>
            )}
          </MenuItem>
          <MenuItem
            value={20}
            className={`${styles.option} ${selectedValue === 20 && styles.optionsBg}`}
          >
            ES
            <Box sx={{ position: "absolute", left: "15px", bottom: "8px" }}>
              <Image src={SP} alt="Spanish" width={25} height={25} />
            </Box>
            {selectedValue === 20 && (
              <Box sx={{ position: "absolute", right: "15px", bottom: "20px" }}>
                <Image src={Check} alt="check" width={17} />
              </Box>
            )}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}