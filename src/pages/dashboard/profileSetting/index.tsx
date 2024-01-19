import ProfileAvatar from "@/_assets/svg/ui-user-profile.svg";
import Layout from "@/components/Layout/Layout";
import ProfileHeader from "@/components/dashboardComponent/subscriptionHeader";
import {
  Box,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserProfile,
  selectUser,
  updateUserProfile,
} from "@/store/slices/authSlice";
import { uploadImage } from "@/store/slices/chatSlice";

import InputWithLabel from "@/components/Input";
import GlobelBtn from "@/components/button/Button";
import CountrySelect from "@/components/dashboardComponent/AutoComplete";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ProfileSetting = () => {
  const userData = useSelector(selectUser);
  const [gender, setGender] = useState("");
  const [droppedImage, setDroppedImage] = useState(null);
  const [profile, setProfile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [countryValue, setCountryValue] = useState("92");
  const dispatch: any = useDispatch();
  const { t } = useTranslation();

  function filterEmptyProperties(data) {
    const filteredData = {};

    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
        filteredData[key] = data[key];
      }
    }

    return filteredData;
  }

  const handleUpdateProfile = () => {
    setProfile(false);
    const fullData = {
      name: fullName,
      dateOfBirth: selectedDate,
      profileImage: userImage,
      phone: countryValue + ":" + userPhone,
      gendetr: gender,
    };
    const updateData = filterEmptyProperties(fullData);
    dispatch(updateUserProfile(fullData))
      .unwrap()
      .then(() => toast.success("Profile updated successfully"))
      .catch(() => toast.error("Failed to update profile"));
  };
  const handleChangeGender = (event: SelectChangeEvent) => {
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
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);

      // Make API request
      dispatch(uploadImage(formData))
        .unwrap()
        .then((res) => setUserImage(res));
    },
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (userData?._id) {
      setSelectedDate(new Date(userData?.dateOfBirth.toString()));
      setGender(userData?.gender);
      setFullName(userData?.name);
      setUserEmail(userData?.email);
      if (userData?.phone) {
        const [countryValue, userPhone] = userData?.phone?.split(":");
        setUserPhone(userPhone);
        setCountryValue(countryValue);
      }
      userData?.profileImage && setUserImage(userData?.profileImage);
    }
  }, [userData]);

  return (
    <Box
      sx={{
        p: { sm: "0px", xs: "10px" },
      }}
    >
      <Layout>
        <ProfileHeader
          title={`${t("profileSetting.AccountSettings")}`}
          description=""
        />
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            borderRadius: "14.994px",
            bgcolor: "#FFF",
            border: " 1.669px solid #E2E7F0",
            p: { md: "26px 30px", sm: "20px 20px", xs: "16px" },
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
                  color: "black",
                }}
              >
                {t("profileSetting.SetProImg")}
              </Typography>
              <div style={{ cursor: "pointer" }}>
                <input {...getInputProps()} />
                <Box
                  sx={{
                    borderRadius: "12.737px",
                    p: "22px",
                    bgcolor: "#F6F9FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "15px",
                    height: "158px",
                  }}
                >
                  <Box
                    sx={{
                      width: "106.812px",
                      height: "106.812px",
                    }}
                  >
                    {userImage ? (
                      <img
                        src={userImage}
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
                    <GlobelBtn
                      btnText={`${t("profileSetting.changeProBtn")}`}
                    />
                  </Box>
                </Box>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                mt: "20px",
              }}
            >
              <InputWithLabel
                color="#474E60"
                label={`${t("profileSetting.fullName")}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={`${t("profileSetting.fullName")}`}
                borderRadius="47.202px"
                bgColor="#F6F9FB"
                border="0px"
              />
              <InputWithLabel
                color="#474E60"
                label={`${t("profileSetting.Email")}`}
                value={userEmail}
                disabled={true}
                placeholder={`${t("profileSetting.Email")}`}
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
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "black",
                  }}
                >
                  {`${t("profileSetting.DOB")}`}
                </Typography>
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    console.log("date", date);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                      backgroundColor: "#F6F9FB",
                      border: "0px",
                      // height: height,
                      pl: "15px",
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

              <FormControl fullWidth>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "black",
                  }}
                >
                  {`${t("profileSetting.Gender")}`}
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  onChange={handleChangeGender}
                  sx={{
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
                  <MenuItem value={"Male"}>{t("profileSetting.male")}</MenuItem>
                  <MenuItem value={"Female"}>
                    {t("profileSetting.female")}
                  </MenuItem>
                  <MenuItem value={"Other"}>
                    {t("profileSetting.other")}
                  </MenuItem>
                </Select>
              </FormControl>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "black",
                  }}
                >
                  {t("profileSetting.Phone")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "50px",
                    backgroundColor: "#F6F9FB",
                    pl: "20px",
                  }}
                >
                  <CountrySelect
                    onSelect={(val) => setCountryValue(val)}
                    value={countryValue}
                  />
                  <TextField
                    variant="outlined"
                    placeholder={`${t("profileSetting.Phone")}`}
                    name="Phone"
                    value={userPhone}
                    type="number" // Set input type to "number"
                    inputProps={{ min: 0, max: 9 }}
                    onChange={(e) =>
                      setUserPhone(e.target.value.replace(/[^0-9]/g, ""))
                    }
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: "24px",
          }}
        >
          <Box>
            <GlobelBtn
              bgColor="#30422E"
              color="white"
              btnText={`${t("profileSetting.save")}`}
              onClick={() => {
                setProfile(true);
              }}
            />
          </Box>
        </Box>

        <TransitionsDialog
          open={profile}
          heading={`${t("profileSetting.save")}`}
          description={`${t("profileSetting.saveDes")}`}
          cancel={() => {
            setProfile(false);
          }}
          closeModal={() => {
            setProfile(false);
          }}
          proceed={handleUpdateProfile}
          proceedText={`${t("profileSetting.SaveChBtn")}`}
          cancelText={`${t("profileSetting.DelBtn")}`}
        />
      </Layout>
    </Box>
  );
};

export default ProfileSetting;
