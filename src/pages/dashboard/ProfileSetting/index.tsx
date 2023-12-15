import InputWithLabel from "@/components/Input";
import Layout from "@/components/Layout/Layout";
import ProfileHeader from "@/components/dashboardComponent/subscriptionHeader";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDropzone } from "react-dropzone";
import ProfileAvatar from "@/_assets/svg/profileAvatar.svg";

import React, { useState } from "react";
import Image from "next/image";
import CountryCode from "@/components/dashboardComponent/AutoComplete";
import TransitionsDialog from "@/components/modal/TransitionDialog";

const ProfileSetting = () => {
  const [Gender, setGender] = React.useState("");
  const [droppedImage, setDroppedImage] = useState(null);
  const [profile, setProfile] = useState(false)
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
            flexWrap: "wrap",
          }}
        >
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              minWidth: "280px",
              mt: { xs: "20px", sm: "0px" },
            }}
          >
            <Box>
            <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "#474E60"
                  }}
                >
                  Set Profile Image
                </Typography>
              <div style={{ cursor: "pointer" }}>
                <input {...getInputProps()} />
                <Box
                  sx={{
                    borderRadius: "12.737px",
                    p: "30px",
                    bgcolor: "#F6F9FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: "106.812px",
                      height: "106.812px",
                    }}
                  >
                    {droppedImage ? (
                      <img
                        src={droppedImage}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "106.812px",
                          height: "106.812px",
                        }}
                      >
                        <Image
                          src={ProfileAvatar}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box {...getRootProps()}>
                    <Button
                      sx={{
                        height: { sx: "25px", md: "30px", lg: "45px" },
                        borderRadius: "26.267px",
                        border: " 0.71px solid #197065",
                        p: { xs: "8px 20px", lg: "10.358px 26.989px" },
                        fontSize: { xs: "12px", md: "14px", lg: "18.752px" },
                        color: "#197065",
                        textTransform: "capitalize",
                      }}
                    >
                      Change Profile
                    </Button>
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
          <Box flex={1} minWidth={"300px"}>
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
                    color: "#474E60"
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
                    px: "15px",
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "0px",
                    },
                  }}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "#474E60"
                  }}
                >
                  Phone
                </Typography>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "50px",
                  backgroundColor: "#F6F9FB",
                  pl: "20px"
                }}>
                <CountryCode/>
                <TextField
                  variant="outlined"
                  placeholder={"Phone"}
                  name="Phone"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                      backgroundColor: "#F6F9FB",
                    },
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "0px",
                    },
                    width: "100%",
                  }}
                />
                </Box>

              </Box>
              
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "end"
        }}>
          <Button
            sx={{
              height: { sx: "25px", md: "30px", lg: "45px" },
              borderRadius: "26.267px",
              border: " 0.71px solid #197065",
              p: { xs: "8px 20px", lg: "10.358px 26.989px" },
              fontSize: { xs: "12px", md: "14px", lg: "18.752px" },
              color: "white",
              textTransform: "capitalize",
              bgcolor: "#197065",
              mt: "24px",
              "&:hover": {
                bgcolor: "#197065",
              },
            }}
            onClick={()=>{
              setProfile(true);
            }}
          >
            Save Changes
          </Button>
        </Box>

        <TransitionsDialog
        open={profile}
        heading="Save Changes"
        description="Do you want to save the changes"
        cancel={() => {
          setProfile(false);
        }}
        closeModal={() => {
          setProfile(false);
        }}
        proceed={()=>{}}
        proceedText="Save Changes"
        cancelText="Don’t Save"
      />
      </Layout>
    </div>
  );
};

export default ProfileSetting;
