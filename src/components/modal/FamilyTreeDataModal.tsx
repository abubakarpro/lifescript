import { uploadImage } from "@/store/slices/chatSlice";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CameraIcon from "../../_assets/svg/cameraIcon.svg";
import Profile from "../../_assets/svg/profile.svg";
import GlobelBtn from "../button/Button";
import CustomizationDialog from "./CustomizationDialog";
const FamilyTreeDataModal = ({
  familyModal,
  setFamilyModal,
  nodeData,
  selectedRelation,
  onSubmit,
}) => {
  //   const [familyModal, setFamilyModal] = useState(false);
  const dispatch: any = useDispatch();
  const [selectedValueGender, setSelectedValueGender] = useState();
  const [selectedValueLiving, setSelectedValueLiving] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueLocation, setInputValueLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfDeath, setDateOfDeath] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [droppedImage, setDroppedImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const maxDate = new Date();

  useEffect(() => {
    if (nodeData?.isSpouse === true) {
      setSelectedValueGender(nodeData?.spouseGender || "");
      setInputValueName(nodeData?.spouseName || "");
      setInputValueLocation(nodeData?.spouseLocation || "");
      setDateOfBirth(
        nodeData?.spouseBorn !== null ? new Date(nodeData?.spouseBorn) : null
      );
      setSelectedValueLiving(nodeData?.spouseDied ? "Deceased" : "Living");
      setShowDatePicker(nodeData.spouseDied ? true : false);
      setDateOfDeath(
        nodeData?.spouseDied !== null ? new Date(nodeData?.spouseDied) : null
      );
      setImageLink(nodeData?.spouseImage || "");
    } else if (nodeData?.isSpouse === false) {
      setSelectedValueGender(nodeData?.gender || "");
      setInputValueName(nodeData?.name || "");
      setInputValueLocation(nodeData?.location || "");
      setDateOfBirth(nodeData?.born !== null ? new Date(nodeData?.born) : null);
      setSelectedValueLiving(nodeData?.died ? "Deceased" : "Living");
      setShowDatePicker(nodeData.died ? true : false);
      setDateOfDeath(nodeData?.died !== null ? new Date(nodeData?.died) : null);
      setImageLink(nodeData?.image || "");
    }
  }, [nodeData]);

  const handleSubmit = () => {
    onSubmit({
      relationType: selectedRelation,
      isSpouse: nodeData?.isSpouse || false,
      name: inputValueName,
      gender: selectedValueGender,
      born: dateOfBirth,
      died: showDatePicker ? dateOfDeath : null,
      image: imageLink,
      location: inputValueLocation,
    });
  };

  const handleInputChangeName = (event) => {
    if (event.target.value.length <= 20) {
      setInputValueName(event.target.value);
    }
  };

  const handleInputChangeLocation = (event) => {
    if (event.target.value.length <= 20) {
      setInputValueLocation(event.target.value);
    }
  };

  useEffect(() => {
    // setSelectedValueGender( || "MySelf");
  }, []);

  const handleChange = (event) => {
    setSelectedValueGender(event.target.value);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleDateOfDeathChange = (date) => {
    setDateOfDeath(date);
  };

  const isDateOfBirthValid = (date) => {
    return dateOfDeath ? date <= dateOfDeath : true;
  };

  // Function to check if the date of death is before the date of birth
  const isDateOfDeathValid = (date) => {
    return dateOfBirth ? date >= dateOfBirth : true;
  };

  const handleLivingStatusChange = (event) => {
    setSelectedValueLiving(event.target.value);
    setShowDatePicker(event.target.value === "Deceased");
    if (event.target.value === "Living") {
      setDateOfDeath(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);

      // Make API request
      uploadImageonCloud(formData);
    },
  });

  const uploadImageonCloud = (formData) => {
    dispatch(uploadImage(formData))
      .unwrap()
      .then((res) => {
        toast.success("image uploaded successfully");
        setImageLink(res);
        setDroppedImage(res);
      })
      .catch(() => toast.error("Failed to upload image"));
  };

  return (
    <div>
      <CustomizationDialog
        open={familyModal}
        title={selectedRelation ? `Add ${selectedRelation}` : "Update Info"}
        // title="Add father of Haseeb"
        handleClose={() => {
          setFamilyModal(false);
        }}
        customStyles={{
          width: { md: "500px", sm: "400px", xs: "100%" },
        }}
      >
        <Box
          sx={{
            height: "75vh",
            overflowY: "auto",
            p: "10px 10px",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                width: { md: "100px", sm: "90px", xs: "80px" },
                height: { md: "100px", sm: "90px", xs: "80px" },
                borderRadius: "50%",
                border: "1px solid #30422E",
                position: "relative",
                flexShrink: "0",
              }}
              {...getRootProps()}
            >
              {imageLink ? (
                <img
                  // src={Profile}
                  src={imageLink || Profile}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <Image
                  src={Profile}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              )}
              <Box
                sx={{
                  width: { md: "23px", sm: "18px", xs: "16px" },
                  height: { md: "23px", sm: "18px", xs: "16px" },
                  bgcolor: "#B6B6B6",
                  position: "absolute",
                  right: "-2px",
                  bottom: "10px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={CameraIcon}
                  alt=""
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
              </Box>
            </Box>
            <Box {...getRootProps()}>
              <GlobelBtn btnText="Change Profile" />
            </Box>
          </Box>

          <RadioGroup value={selectedValueGender} onChange={handleChange}>
            <Typography
              sx={{
                mt: "20px",
                fontSize: { md: "16.06px", sm: "14px", xs: "12px" },
                color: "#171725",
              }}
            >
              Gender
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <FormControlLabel
                  value="Male"
                  checked={selectedValueGender === "Male"}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked .MuiSvgIcon-root": {
                          fill: "rgba(25, 112, 101, 1)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        ml: { md: 0.6, sm: 0.5, xs: 0.25 },
                        fontSize: { md: "15px", sm: "14px", xs: "12px" },
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Male
                    </Typography>
                  }
                />
              </Box>
              <Box>
                <FormControlLabel
                  value="Female"
                  checked={selectedValueGender === "Female"}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked .MuiSvgIcon-root": {
                          fill: "rgba(25, 112, 101, 1)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, 0.6)",
                        ml: { md: 0.6, sm: 0.5, xs: 0.25 },
                        fontSize: { md: "15px", sm: "14px", xs: "12px" },
                      }}
                    >
                      Female
                    </Typography>
                  }
                />
              </Box>
              <Box>
                <FormControlLabel
                  value="Unknown"
                  checked={selectedValueGender === "Unknown"}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked .MuiSvgIcon-root": {
                          fill: "rgba(25, 112, 101, 1)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        ml: { md: 0.6, sm: 0.5, xs: 0.25 },
                        fontSize: { md: "15px", sm: "14px", xs: "12px" },
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Unknown
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </RadioGroup>
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Typography
              sx={{
                color: "#171725",
                fontSiz: { md: "16.06px", sm: "14px", xs: "12px" },
                mb: "10px",
              }}
            >
              Full Name
            </Typography>
            <TextField
              placeholder="* Enter text (20 characters limit)"
              value={inputValueName}
              onChange={handleInputChangeName}
              inputProps={{ maxLength: 20 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "17px",
                  border: "1px solid #30422E",
                  height: "35px",
                  pl: "5px",
                  fontSize: "14px",
                },
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                },
                width: "100%",
                "&:hover": {
                  border: "none",
                  outline: "none",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Typography
              sx={{
                color: "#171725",
                fontSiz: { md: "16.06px", sm: "14px", xs: "12px" },
                mb: "10px",
              }}
            >
              Location of Birth
            </Typography>
            <TextField
              placeholder="Enter text (20 characters limit)"
              value={inputValueLocation}
              onChange={handleInputChangeLocation}
              inputProps={{ maxLength: 20 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "17px",
                  border: "1px solid #30422E",
                  height: "35px",
                  pl: "5px",
                  fontSize: "14px",
                },
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                },
                width: "100%",
                "&:hover": {
                  border: "none",
                  outline: "none",
                },
              }}
            />
          </Box>

          <Box mt={"20px"}>
            <Typography
              sx={{
                color: "#171725",
                fontSiz: { md: "16.06px", sm: "14px", xs: "12px" },
                mb: "10px",
                mt: "20px",
              }}
            >
              Date of Birth
            </Typography>
            <DatePicker
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              maxDate={maxDate}
              // shouldDisableDate={(date) => !isDateOfBirthValid(date)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "17px",
                  border: "1px solid #30422E",
                  height: "35px",
                  pl: "5px",
                  fontSize: "14px",
                },
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                },
                width: "100%",
                "&:hover": {
                  border: "none",
                  outline: "none",
                },
              }}
            />
          </Box>

          <RadioGroup
            value={selectedValueLiving}
            onChange={handleLivingStatusChange}
          >
            <Typography
              sx={{
                mt: "20px",
                fontSize: "16.06px",
                color: "#171725",
              }}
            >
              Living
            </Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box>
                <FormControlLabel
                  value="Living"
                  checked={selectedValueLiving === "Living"}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked .MuiSvgIcon-root": {
                          fill: "rgba(25, 112, 101, 1)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        ml: { md: 0.6, sm: 0.5, xs: 0.25 },
                        fontSize: { md: "15px", sm: "14px", xs: "12px" },
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Living
                    </Typography>
                  }
                />
              </Box>
              <Box>
                <FormControlLabel
                  value="Deceased"
                  checked={selectedValueLiving === "Deceased"}
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked .MuiSvgIcon-root": {
                          fill: "rgba(25, 112, 101, 1)",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, 0.6)",
                        ml: { md: 0.6, sm: 0.5, xs: 0.25 },
                        fontSize: { md: "15px", sm: "14px", xs: "12px" },
                      }}
                    >
                      Deceased
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </RadioGroup>

          {showDatePicker && (
            <Box mt={"20px"}>
              <Typography
                sx={{
                  color: "#171725",
                  fontSiz: { md: "16.06px", sm: "14px", xs: "12px" },
                  mb: "10px",
                }}
              >
                Date of Death
              </Typography>
              <DatePicker
                maxDate={maxDate}
                value={dateOfDeath}
                minDate={dateOfBirth}
                onChange={handleDateOfDeathChange}
                // shouldDisableDate={(date) => !isDateOfDeathValid(date)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "17px",
                    border: "1px solid #30422E",
                    height: "35px",
                    pl: "5px",
                    fontSize: "14px",
                  },
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "0px",
                  },
                  width: "100%",
                  "&:hover": {
                    border: "none",
                    outline: "none",
                  },
                }}
              />
            </Box>
          )}

          <Box mt={"20px"}>
            <GlobelBtn
              btnText="Submit"
              color="white"
              bgColor="#30422E"
              onClick={handleSubmit}
              disabled={!inputValueName}
              width="100%"
            />
          </Box>
        </Box>
      </CustomizationDialog>
    </div>
  );
};

export default FamilyTreeDataModal;
