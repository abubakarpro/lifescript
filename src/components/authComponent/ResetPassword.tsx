import { LoginData } from "@/interface/authInterface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import Forget from "../../../public/ForgetPasswod.svg";
import Logo from "../../../public/logo.svg";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data: LoginData) => {
      console.log("data", data);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

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
      <Box sx={{ margin: 0, display: { md: "block", xs: "none" } }}>
        <Image
          src={Forget}
          alt="image of login"
          style={{ height: "100%", maxHeight: "92vh", width: "100%" }}
        />
      </Box>

      <Box
        sx={{
          maxWidth: "460px",
          margin: "0 auto",
          minWidth: "280px",
          width: "100%",
          marginX: { sx: "0 35px" },
        }}
      >
        <Box textAlign={"center"}>
          <Image src={Logo} width={223} height={135} alt="Logo Image" />
          <Typography
            sx={{
              color: "#000000",
              marginTop: "50px",
              fontSize: { sx: "15px", sm: "30px" },
            }}
          >
            Reset Password
          </Typography>
        </Box>

        <Box>
          <Box>
            <Typography
              sx={{
                marginTop: "5rem",
                fontSize: { sx: "15px", sm: "21px" },
              }}
            >
              Password
            </Typography>
          </Box>
          <TextField
            sx={{
              marginTop: "15px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px", // Adjust the border radius as needed
              },
              width: "100%",
            }}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              marginTop: "40px",
              fontSize: { sx: "15px", sm: "21px" },
            }}
          >
            Confirm Password
          </Typography>
        </Box>
        <TextField
          sx={{
            marginTop: "15px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px", // Adjust the border radius as needed
            },
            width: "100%",
          }}
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "110px",
          }}
        >
          <Button
            variant="contained"
            onClick={(event) => formik.handleSubmit()}
            type="submit"
            sx={{
              borderRadius: "48px",
              backgroundColor: "#30422E",
              color: "white",
              maxWidth: "404px",
              width: "70%",
              pt: "16px",
              pb: "16px",

              "&:hover": {
                backgroundColor: "#30422E",
              },
              textTransform: "none",
            }}
          >
            Continue
          </Button>

          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.42);",
              marginTop: "20px",
              fontSize: "18px",
            }}
          >
            After clicking Rest Password. You will be redirected to the login
            page.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
