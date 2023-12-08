import Layout from "@/components/Layout/Layout";
import ColorPickerComponent from "@/components/dashboardComponent/ColorPicker";
import SelectBookCoverCard from "@/components/dashboardComponent/SelectBookCoverCard";
import SelectBookCoverHeader from "@/components/dashboardComponent/SelectBookCoverHeader";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileIcon from "@/_assets/svg/fileIcon.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const EditBookCover = () => {
  const router = useRouter();
  const {BookCoverCheck} = router.query;  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [byline, setByline] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("#197065");
  const [droppedImage, setDroppedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  };

  const handleBylineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setByline(event.target.value);
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
        <Box pb="25px">
          <SelectBookCoverHeader />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: "40px", md: "50px", lg: "70px" },
              mt: "20px",
            }}
          >
            <Box flex={"1"} display="flex" flexDirection="column" gap="24px" minWidth={"300px"}>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                  }}
                >
                  Title*
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={"Title*"}
                  name="title"
                  onChange={handleTitleChange}
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
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                  }}
                >
                  Subtitle*
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={"Subtitle*"}
                  name="Subtitle"
                  onChange={handleSubtitleChange}
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
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                  }}
                >
                  Byline
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={"Byline"}
                  name="Byline"
                  onChange={handleBylineChange}
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
              <ColorPickerComponent
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
              />
              <Box
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  padding: "14px 0px",
                  textAlign: "center",
                  fontWeight: "500",
                  p: "6px",
                  border: " 0.355px solid #197065",
                  borderRadius: "7.099px",
                }}
              >
                <div {...getRootProps()} style={{ cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  <Box
                    sx={{
                      border: "2px dashed #D3D3D3",
                      borderRadius: "7.099px",
                      p: "10px 0px",
                    }}
                  >
                    <Box>
                      <Image src={FileIcon} alt="" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                        color: "#D3D3D3",
                      }}
                    >
                      Drag & Drop files here
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                        color: "#D3D3D3",
                      }}
                    >
                      or
                    </Typography>
                    <Button
                      sx={{
                        height: "25px",
                        borderRadius: "26.267px",
                        border: " 0.71px solid #197065",
                        p: " 6.744px 11.714px",
                        fontSize: "10.649px",
                        color: "#197065",
                      }}
                    >
                      Browse Files
                    </Button>
                  </Box>
                </div>
              </Box>
            </Box>
            <Box flex={"1"}>              
              <SelectBookCoverCard
                landScape={BookCoverCheck == "true" ? true : false}
                title={title}
                subtitle={subtitle}
                Byline={byline}
                ColourPalette={selectedColor}
                droppedImage={droppedImage}
              />

              <Box display="flex" gap="30px" mt="30px" justifyContent="flex-end">
                <Button
                  sx={{
                    height: {sx: "25px", md: "30px", lg:"45px"},
                    borderRadius: "26.267px",
                    border: " 0.71px solid #197065",
                    p: { xs: '8px 20px', lg:"10.358px 26.989px"},
                    fontSize: {xs: "12px", md: '14px' ,lg:"18.752px"},
                    color: "#197065",
                    textTransform: "capitalize",
                  }}
                  onClick={()=>{
                    router.push("/dashboard/BookCover/SelectBookCover")
                  }}
                >
                  Change Cover
                </Button>
                <Button
                  sx={{
                    height: {sx: "25px", md: "30px", lg:"45px"},
                    borderRadius: "26.267px",
                    border: " 0.71px solid #197065",
                    p: { xs: '8px 20px', lg:"10.358px 26.989px"},
                    fontSize: {xs: "12px", md: '14px' ,lg:"18.752px"},
                    color: "white",
                    textTransform: "capitalize",
                    bgcolor: "#197065",
                    "&:hover": {
                      bgcolor: "#197065",
                    }
                  }}
                  onClick={() => {
                    router.push(`/dashboard/BookCover/ViewBookCover?BookCoverCheck=${BookCoverCheck}`)
                  }}
                >
                  Save Cover
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default EditBookCover;
