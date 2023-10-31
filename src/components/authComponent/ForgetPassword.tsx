import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { ForgetPassword } from "@/interface/authInterface";
import { forgetPassword } from "@/store/slices/authSlice";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Forget from "../../../public/ForgetPasswod.svg";
import Logo from "../../../public/logo.svg";

const ForgetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch: any = useDispatch();
  const [emailSent, setEmailSent] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      type: "password",
    },
    onSubmit: async (data: ForgetPassword) => {
      console.log("data", data);
      dispatch(forgetPassword(data))
        .unwrap()
        .then(() => {
          toast.success("Email sent successfully");
          router.push("/verify/forgetPasswordLink");
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
    }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box sx={{ margin: 0 }}>
        <Image
          src={Forget}
          alt="image of login"
          width={650}
          height={700}
          // style={imageStyle}
        />

        {/* </Grid> */}
      </Box>
      {/* <Grid item xs={12} md={6} sm={6} sx={{ textAlign: "center" }}> */}
      <Box
      // textAlign={'center'}
      >
        <Box textAlign={"center"}>
          <Image src={Logo} width={184} height={100} alt="Logo Image" />
          <Typography
            sx={{ color: "#000000", fontSize: "30px", marginTop: "37.84" }}
          >
            Forgot Password?{" "}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "100px" }}>
          <Box>
            <Typography
              sx={{ marginTop: "23px", color: "#5B5B5B", fontSize: "21px" }}
            >
              Please enter email associated with the Lifescript <br /> account
              to send password reset link.
            </Typography>
            <Typography
              sx={{
                marginRight: "300px",
                marginTop: "26px",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              Email
            </Typography>
            <TextField
              variant="outlined"
              name="email"
              placeholder="Enter you Email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{
                marginTop: "15px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px", // Adjust the border radius as needed
                },
                width: "580px",
              }}
            />
          </Box>
          {formik.touched.email && formik.errors.email && (
            <span style={{ color: "red" }}>{formik.errors.email}</span>
          )}

          <Box
            sx={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "80px",
            }}
          >
            <Button
              variant="contained"
              onClick={(event) => formik.handleSubmit()}
              type="submit"
              sx={{
                borderRadius: "48px",
                backgroundColor: "#186F65",
                color: "white",
                width: "310px",
                padding: "10px",
                // marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#186F65",
                },
                textTransform: "none",
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
    // {/* </Grid> */}
    // {/* </Grid> */}
  );
};

export default ForgetPassword;
