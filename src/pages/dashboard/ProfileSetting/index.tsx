import InputWithLabel from "@/components/Input";
import Layout from "@/components/Layout/Layout";
import ProfileHeader from "@/components/dashboardComponent/subscriptionHeader";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDropzone } from "react-dropzone";
import ProfileAvatar from "@/_assets/svg/profileAvatar.svg"

import React, { useState } from "react";
import Image from "next/image";


const ProfileSetting = () => {
  const [Gender, setGender] = React.useState("");
  const [droppedImage, setDroppedImage] = useState(
    null
  );
  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDroppedImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: 'image/*', // Accepts any image file type
  });
  return (
    <div>
      <Layout>
        <ProfileHeader title="Profile Settings" description="" />
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            borderRadius: "14.994px",
            bgcolor: "#FFF",
            border: " 1.669px solid #E2E7F0",
            p: "26px 30px",
            mt: "26px",
          }}
        >
          <Box flex={1}>
            <Box>
            <div {...getRootProps()} style={{ cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  <Box
                    sx={{
                      borderRadius: "12.737px",
                      p: "30px",
                      bgcolor :"#F6F9FB"
                    }}
                  >
                    <Box>
                    {droppedImage ? (
                      <img
                        src={droppedImage}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />) : <Box sx={{
                        width :"106.812px",
                        height: "106.812px",
                      }}>
                        <Image src={ProfileAvatar} alt="" width={100}/>
                        </Box>}
                    </Box>

                  </Box>
                </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <InputWithLabel
                color="#474E60"
                label="First Name"
                placeholder="First Name"
                borderRadius="47.202px"
                bgColor="#F6F9FB"
                border="0px"
              />
              <InputWithLabel
                color="#474E60"
                label="Last Name"
                placeholder="Last Name"
                borderRadius="47.202px"
                bgColor="#F6F9FB"
                border="0px"
              />
            </Box>
          </Box>
          <Box flex={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <InputWithLabel
                color="#474E60"
                label="Email"
                placeholder="Email"
                borderRadius="47.202px"
                bgColor="#F6F9FB"
                border="0px"
              />
              <InputWithLabel
                color="#474E60"
                label="Age"
                placeholder="Age"
                borderRadius="47.202px"
                bgColor="#F6F9FB"
                border="0px"
              />
              <FormControl fullWidth>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                  }}
                >
                  Gender
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Gender}
                  onChange={handleChange}
                  sx={{
                    marginTop: "10px",
                    borderRadius: "50px",
                      backgroundColor: "#F6F9FB",
                      border: "0px",
                    width: "100%",

                  }}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <InputWithLabel
                color="#474E60"
                label="Phone"
                placeholder="Phone"
                borderRadius="47.202px"
                bgColor="#F6F9FB"
                border="0px"
              />
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default ProfileSetting;
