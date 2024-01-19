import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel2 from "../../../public/carousel.png";
import Carousel1 from "../../../public/carousel1.png";
import Carousel3 from "../../../public/carousel3.png";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logo from "../../../public/logo.svg";
import Carousel from "./Carousel";
import Login from "./Login";
import Signup from "./Signup";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: "24px 0",
          }}
        >
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Register() {
  const router = useRouter();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // const carouselItems = [
  //   <Image
  //     key="LoginImage"
  //     src={LoginImage}
  //     alt="login Image"
  //     style={{
  //       height: "100%",
  //       maxHeight: "92vh",
  //       minHeight: "92vh",
  //       width: "100%",
  //       objectFit: "contain",
  //     }}
  //   />,
  //   <Image
  //     key="SignupImage"
  //     src={SignupImage}
  //     style={{
  //       height: "100%",
  //       maxHeight: "92vh",
  //       width: "100%",
  //       objectFit: "contain",
  //     }}
  //     alt="Signup Image"
  //   />,
  // ];
  const carouselItems = [
    { path: Carousel1, alt: "Login Image" },
    { path: Carousel2, alt: "Signup Image" },
    { path: Carousel3, alt: "Signup Image" },

    // Add more images as needed
  ];

  useEffect(() => {
    const Tokken = localStorage.getItem("token");
    if (Tokken) {
      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard/chapters");
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="grid"
          alignItems="center"
          overflow="scroll"
          height="100dvh"
          boxSizing="border-box"
          gap="1rem"
          color="#000"
          sx={{
            overflowX: "hidden",
            p: 2,
            backgroundColor: "#FFF7EA",
            gridTemplateColumns: {
              md: "repeat(2, minmax(0, 1fr))",
              xs: "repeat(1, minmax(0, 1fr))",
            },
          }}
        >
          <Box sx={{ height: "auto", display: { md: "block", xs: "none" } }}>
            <Carousel items={carouselItems} />
          </Box>
          <Box
            sx={{
              margin: 0,
              height: "auto",
              width: "100%",
            }}
          >
            <Box textAlign={"center"}>
              <Image src={Logo} width={160} height={130} alt="Logo Image" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                // pl: "20px",
              }}
            >
              <Box
                sx={{
                  marginTop: "20px",
                  height: "auto",
                  border: "1px solid black",
                  maxWidth: "460px",
                  width: "100%",
                  background: "white",
                  borderRadius: "40px",
                }}
              >
                <Tabs
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      justifyContent: "center",
                    },
                    "& .MuiTabs-indicator": {
                      display: "none", // Hide the indicator line
                    },
                    "& .MuiTab-root": {
                      width: "50%",
                      borderRadius: "25px",
                      // backgroundColor: "wheat",

                      color: "#30422E",
                      "&.Mui-selected": {
                        backgroundColor: "#30422E",
                        color: "white",
                      },
                    },
                  }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label={t("Register.Login")}
                    {...a11yProps(0)}
                    sx={{ textTransform: "capitalize" }}
                  />
                  <Tab
                    label={t("Register.Register")}
                    {...a11yProps(1)}
                    sx={{ textTransform: "capitalize" }}
                  />
                </Tabs>
              </Box>
            </Box>
            <Box>
              <CustomTabPanel value={value} index={0}>
                <Login signinClick={() => setValue(1)} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Signup signupClick={() => setValue(0)} />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
