import GlobelBtn from "@/components/button/Button";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import i18n from "i18next";
import { useEffect, useState } from "react";
import backArrow from "../../../_assets/svg/left.svg";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import QaTabBars from "./qaTabBars";

export default function TabTwo({
  onClickBack,
  onClickNext,
  data,
  userName,
  setQaTab,
}) {
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [langPre, setLangPre] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [name, setName] = useState(userName);
  const maxDate = new Date();

  useEffect(() => {
    if (data?.name) {
      setGender(data.gender);
      setMaritalStatus(data.martialStatus);
      setSelectedDate(data.dateOfBirth);
      setName(data.name);
      setLangPre(data.LanguagePreferences);
    }
  }, [data]);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleButtonClick = () => {
    setShowTooltip(false);
    if (
      !name ||
      maritalStatus === "" ||
      gender === "" ||
      !selectedDate ||
      langPre === ""
    ) {
      setShowTooltip(true);
    } else {
      // Continue with your button click logic
      onClickNext({
        name: name,
        maritalStatus: maritalStatus,
        gender: gender,
        dob: selectedDate,
        lp: langPre,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "90%",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box>
        <Box
          sx={{
            color: "black",
            alignItems: "center",
            gap: "8px",
            display: { sm: "flex", xs: "none" },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: "44px", sm: "36px", xs: "26px" },
              fontWeight: 700,
            }}
          >
            Identity!
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "16px", sm: "14px", xs: "12px" },
              fontWeight: 700,
              color: "rgba(78, 81, 109, 0.70)",
            }}
          >
            Tell us about yourself
          </Typography>
        </Box>
        <QaTabBars tabProp={2} />
        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{
              fontSize: { md: "33px", sm: "25px", xs: "20px" },
              fontWeight: 700,
              color: "black",
            }}
          >
            Tell us about yourself
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: { md: "40px", sm: "30px", xs: "15px" },
              marginBottom: "20px",
              flexDirection: { sm: "row", xs: "column" },
            }}
          >
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { md: "20.142px", sm: "18px", xs: "16px" },
                  fontWeight: 500,
                  color: "#171725",
                }}
              >
                Full Name
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Full Name"
                name="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    backgroundColor: "white",
                  },
                }}
              />
            </Box>
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { md: "20.142px", sm: "18px", xs: "16px" },
                  fontWeight: 500,
                  color: "#171725",
                }}
              >
                Marital Status
              </Typography>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Select
                  placeholder="Marital Status"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  sx={{
                    width: "100%",
                    borderRadius: "50px",
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                </Select>
                {maritalStatus === "" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "18px",
                      left: "20px",
                      color: "gray",
                    }}
                  >
                    Marital Status
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { md: "40px", sm: "30px", xs: "15px" },
              marginBottom: "20px",
              flexDirection: { sm: "row", xs: "column" },
            }}
          >
            {/* Second row with two text fields */}
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { md: "20.142px", sm: "18px", xs: "16px" },
                  fontWeight: 500,
                  color: "#171725",
                }}
              >
                Gender
              </Typography>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Select
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{
                    width: "100%",
                    borderRadius: "50px",
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Special</MenuItem>
                </Select>
                {gender === "" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "18px",
                      left: "20px",
                      color: "gray",
                    }}
                  >
                    Gender
                  </Box>
                )}
              </Box>
            </Box>
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { md: "20.142px", sm: "18px", xs: "16px" },
                  fontWeight: 500,
                  color: "#171725",
                }}
              >
                Date of Birth
              </Typography>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                maxDate={maxDate}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "50px",
                    },
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { md: "40px", sm: "30px", xs: "15px" },
              marginBottom: "20px",
              flexDirection: { sm: "row", xs: "column" },
            }}
          >
            {/* Second row with two text fields */}
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { md: "20.142px", sm: "18px", xs: "16px" },
                  fontWeight: 500,
                  color: "#171725",
                }}
              >
                Language Preference
              </Typography>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Select
                  placeholder="Language Preference"
                  value={langPre}
                  onChange={(e) => setLangPre(e.target.value)}
                  sx={{
                    width: "100%",
                    borderRadius: "50px",
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem
                    value="English"
                    onClick={() => {
                      changeLanguage("en");
                    }}
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    value="Spanish"
                    onClick={() => {
                      changeLanguage("sp");
                    }}
                  >
                    Spanish
                  </MenuItem>
                </Select>
                {langPre === "" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "18px",
                      left: "20px",
                      color: "gray",
                    }}
                  >
                    Language Preference
                  </Box>
                )}
              </Box>
            </Box>
            <Box flex={1}></Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <GlobelBtn btnText="Back" onClick={onClickBack} image={backArrow} />
        </Box>
        <Tooltip
          open={showTooltip}
          onClose={() => setShowTooltip(false)}
          title="Please fill in all fields before proceeding."
        >
          <Box>
            <GlobelBtn
              bgColor="#30422E"
              color="white"
              btnText="Next"
              onClick={handleButtonClick}
              image2={NextArrow}
            />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
