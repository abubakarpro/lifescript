"use client";
import Carousel from "@/components/authComponent/Carousel";
import { verifyEmail } from "@/store/slices/authSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Carousel2 from "../../../public/carousel.png";
import Carousel1 from "../../../public/carousel1.png";
import Carousel3 from "../../../public/carousel3.png";
import Logo from "../../../public/logo.svg";
const CryptoJS = require("crypto-js");

const EmailVerification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch: any = useDispatch();
  const { t } = useTranslation();

  function handleVerifyEmail() {
    dispatch(verifyEmail({ email: userEmail, otp: otp }))
      .unwrap()
      .then(() => {
        toast.success(t("Verify.emailVerifiedSuccessfully"));
        router.push("/");
      })
      .catch((error: any) => {
        toast.error(error || t("Verify.failedVerifyEmail"));
      });
  }

  function getTokenFromURL(url: any) {
    var queryString = url.split("?")[1];
    var params = new URLSearchParams(queryString);
    return params.get("token");
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const router = useRouter();
  const currentUrl = router.asPath;
  const token = getTokenFromURL(currentUrl);
  const ciphertext = token?.replace(/ /g, "+");

  useEffect(() => {
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, "No_Key_Found");
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      const decryptedData = JSON.parse(originalText);

      setUserEmail(decryptedData.email);
      setOtp(decryptedData.otp);
    }
  }, [ciphertext]);
  const carouselItems = [
    { path: Carousel1, alt: "Login Image" },
    { path: Carousel2, alt: "Signup Image" },
    { path: Carousel3, alt: "Signup Image" },

    // Add more images as needed
  ];

  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: {
          md: "repeat(2, minmax(0, 1fr))",
          xs: "repeat(1, minmax(0, 1fr))",
        },
        gap: "1rem",
        backgroundColor: "#FFF7EA",
        minHeight: "100vh",
        p: "20px",
        boxSizing: "border-box",
        color: "#000",
      }}
    >
      <Box sx={{ height: "auto", display: { md: "block", xs: "none" } }}>
        <Carousel items={carouselItems} />
      </Box>
      <Box
        // textAlign={'center'}
        sx={{
          maxWidth: "460px",
          margin: "0 auto",
          minWidth: "280px",
          width: "100%",
          marginX: { sx: "0 35px" },
        }}
      >
        <Box textAlign={"center"}>
          <Image src={Logo} width={184} height={100} alt="Logo Image" />
          <Typography
            sx={{ color: "#000000", fontSize: "30px", marginTop: "37.84" }}
          >
            {t("Verify.emailVerification")}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "100px" }}>
          {/* <Box>
            <Typography
              sx={{
                marginRight: "300px",
                marginTop: "56px",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("Verify.email")}
            </Typography>
            <TextField
              variant="outlined"
              name="email"
              value={userEmail}
              disabled
              sx={{
                marginTop: "15px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px", // Adjust the border radius as needed
                },
                width: "100%",
              }}
            />
          </Box> */}
          <Typography
            sx={{ marginTop: "23px", color: "#5B5B5B", fontSize: "21px" }}
          >
            {t("Verify.emailVerified")}
            {/* <br /> {t("Verify.proceedForward")} */}
          </Typography>

          <Box
            sx={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "130px",
            }}
          >
            {/* <Button
              variant="contained"
              disabled={!userEmail}
              onClick={(event: any) => handleVerifyEmail()}
              sx={{
                borderRadius: "48px",
                backgroundColor: "#30422E",
                color: "white",
                width: "310px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#30422E",
                },
                textTransform: "none",
              }}
            >
              {t("Verify.letsBegin")}{" "}
            </Button> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailVerification;
