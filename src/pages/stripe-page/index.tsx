import { useState } from "react";
import Button from "@/__webComponents/button/Button";
import Logo from "@/_assets/svg/logo-dashboard.svg";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import BgLogo from "../../_assets/svg/BgLogo.svg";
import { useRouter } from "next/router";

const StripePage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("myself");
  const [paymentType, setPaymentType] = useState("buynow");
  const [showSecondForm, setShowSecondForm] = useState(false);

  const handleContinue = () => {
    if (userType === "gift-of-someone-else") {
      router.push("/stripe-page/gift-subscription");
    } else {
      setShowSecondForm(true);
    }
    // router.push("/stripe-page/subscription");
  };
  const handleContinueNext = () => {
    if (paymentType === "free-trial") {
      router.push("/stripe-page/register-free-trial");
    } else {
      router.push("/stripe-page/subscription");
    }
  };

  return (
    <>
      <Head>
        <title>Stripe Pages Flow</title>
        <meta name="description" content="stripe Pages flow" />
      </Head>

      <Box
        sx={{
          bgcolor: "#f3ecda",
          color: "#3e4f3c",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Box
            sx={{
              bgcolor: "#30422e",
              height: "50px",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <Image src={Logo} alt="Logo" />
          </Box>

          <Box
            sx={{
              marginTop: "100px",
              marginLeft: "100px",
              width: "600px",
            }}
          >
            <FormControl sx={{ display: showSecondForm ? "none" : "block" }}>
              <Typography
                sx={{ color: "#30422E", fontSize: "30px", margin: "10px" }}
              >
                Who is LifeScript for?
              </Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                sx={{ padding: "20px" }}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    margin: "10px",
                    marginLeft: "-10px",
                    border: "1px solid black",
                    borderRadius: "4px",
                  }}
                >
                  <FormControlLabel
                    value="myself"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked .MuiSvgIcon-root": {
                            fill: "#30422E",
                          },
                        }}
                      />
                    }
                    label="Myself"
                    sx={{ marginLeft: "10px" }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "white",
                    margin: "10px",
                    marginLeft: "-10px",
                    border: "1px solid black",
                    borderRadius: "4px",
                  }}
                >
                  <FormControlLabel
                    value="gift-of-someone-else"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked .MuiSvgIcon-root": {
                            fill: "#30422E",
                          },
                        }}
                      />
                    }
                    label="A gift of someone else"
                    sx={{ marginLeft: "10px" }}
                  />
                </Box>
              </RadioGroup>
              {userType && (
                <Box sx={{ margin: "10px" }}>
                  <Button
                    width="50%"
                    height="50px"
                    backgroundColor="#E1693B"
                    title={"Continue"}
                    bgHover="#B5522D"
                    onClick={handleContinue} img1={undefined} img2={undefined} borderRadius={undefined}                  />
                </Box>
              )}
            </FormControl>

            {showSecondForm && (
              <FormControl sx={{ display: "block" }}>
                <Typography
                  sx={{ color: "#30422E", fontSize: "30px", margin: "10px" }}
                >
                  Select Your Preference
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  sx={{ padding: "20px" }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginLeft: "-10px",
                      border: "1px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    <FormControlLabel
                      value="buynow"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked .MuiSvgIcon-root": {
                              fill: "#30422E",
                            },
                          }}
                        />
                      }
                      label="Buy Now"
                      sx={{ marginLeft: "10px" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginLeft: "-10px",
                      border: "1px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    <FormControlLabel
                      value="free-trial"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked .MuiSvgIcon-root": {
                              fill: "#30422E",
                            },
                          }}
                        />
                      }
                      label="Start 7-Day Free Trial"
                      sx={{ marginLeft: "10px" }}
                    />
                  </Box>
                </RadioGroup>

                <Box sx={{ margin: "10px" }}>
                  <Button
                    width="50%"
                    height="50px"
                    backgroundColor="#E1693B"
                    title={"Continue"}
                    bgHover="#B5522D"
                    onClick={handleContinueNext} img1={undefined} img2={undefined} borderRadius={undefined}                  />
                </Box>
              </FormControl>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "0px",
            zIndex: 1,
            maxWidth: "768px",
            width: "100%",
          }}
        >
          <Image
            src={BgLogo}
            alt="Giving Tree Logo"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default StripePage;
