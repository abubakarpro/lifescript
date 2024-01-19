import { LoginData } from "@/interface/authInterface";
import { googleLogin, login } from "@/store/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Divider, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import googleLogo from "../../../public/googleIcon.svg";

const Login = ({ signinClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleLoginSuccess(tokenResponse),
    onError: () => handleGoogleLoginFailure(),
  });

  const handleGoogleLoginSuccess = (e: any) => {
    dispatch(googleLogin({ credential: e.access_token }))
      .unwrap()
      .then((res) => {
        toast.success(t("login-page.loggedIn"));
        router.push(`/getStarted?userName=${res?.name}`);
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLoginFailure = () => {
    toast.error(t("login-page.failedSignupGoogle"));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data: LoginData) => {
      setLoginFailed(false);
      setLoading(true);
      dispatch(login(data))
        .unwrap()
        .then((res) => {
          toast.success(t("login-page.loggedIn"));
          // setLoading(false);
          router.push(`/getStarted?userName=${res?.name}`);
        })
        .catch((error: any) => {
          setLoginFailed(true);
          setLoading(false);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(t("login-page.emailRequired")),
      password: Yup.string()
        .min(8, t("login-page.passwordLength"))
        .required(t("login-page.passwordRequired")),
    }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", color: "#000" }}>
      <Box
        sx={{
          maxWidth: "460px",
          margin: "0 auto",
          minWidth: "280px",
          width: "100%",
          marginX: { sx: "0 35px" },
        }}
      >
        <Box>
          <Typography
            sx={{
              // marginRight: "300px",
              fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
            }}
          >
            {t("login-page.email")}
          </Typography>
          <TextField
            variant="outlined"
            placeholder={t("login-page.enter-email")}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            sx={{
              marginTop: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                backgroundColor: "white",
              },
              width: "100%",
              // width: "460px",
            }}
          />
        </Box>
        {formik.touched.email && formik.errors.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}
        <Box>
          <Box>
            <Typography
              sx={{
                // marginRight: "300px",
                marginTop: "24px",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("login-page.password")}
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px", // Adjust the border radius as needed
                  backgroundColor: "white",
                },
                width: "100%",
              }}
              placeholder={t("login-page.enter-password")}
              type={showPassword ? "text" : "password"}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {formik.touched.password && formik.errors.password && (
            <span
              style={{
                color: "red",
              }}
            >
              {formik.errors.password}
            </span>
          )}
          {loginFailed && (
            <Box sx={{ marginTop: "10px" }}>
              <Typography sx={{ color: "red" }}>
                {t("login-page.IncorrectEmail")}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              // gap: 15,
              // marginLeft: { sm: "", md: "120px" },
              // justifyContent: "center",
            }}
          >
            {/* <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    color="primary"
                  />
                }
                label="Remember Me"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "16",
                  },
                }}
              />
            </Box> */}
            <Box
              sx={{ cursor: "pointer" }}
              onClick={(event: any) => router.push("/verify/forgetPassword")}
            >
              <Typography
                sx={{
                  // marginTop: "9px",
                  // fontSize: { xs: 12, sm: 14, md: 12, lg: 16 },
                  fontSize: { xs: 12, sm: 14, md: 16 },
                }}
              >
                {t("login-page.forget-password")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ justifyContent: "start", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={(event) => formik.handleSubmit()}
            type="submit"
            sx={{
              borderRadius: "48px",
              backgroundColor: "#30422E",
              color: "white",
              width: { md: "60%", sm: "70%", xs: "70%" },
              marginTop: { xs: "60px", sm: "20px" },
              "&:hover": {
                backgroundColor: "#30422E",
              },
              textTransform: "capitalize",
            }}
          >
            {t("login-page.login")}
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Box>
              <Divider
                sx={{
                  marginTop: "10px",

                  backgroundColor: "black",
                  width: "97px",
                }}
                orientation="horizontal"
              />
            </Box>
            <Box>
              <Typography sx={{ marginLeft: "10px", color: "#0000006B" }}>
                {t("login-page.login-with")}
              </Typography>
            </Box>
            <Box>
              <Divider
                sx={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "black",
                  width: "97px",
                }}
                orientation="horizontal"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: { md: "60%", sm: "70%", xs: "70%" } }}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleGoogleLogin()}
              sx={{
                borderRadius: "48px",
                backgroundColor: "#fff",
                color: "black",
                width: "100%",
                gap: "10px",
                marginTop: { xs: "20px" },
                "&:hover": {
                  backgroundColor: "white",
                },
                textTransform: "capitalize",
              }}
            >
              <Image
                src={googleLogo}
                alt="Google Logo"
                // width={24}
                // height={24}
              />
              <Typography>Login with Google</Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "20px",
            fontSize: "16px",
            textAlign: "center",
            color: "#30422E",
          }}
        >
          {t("login-page.not-member")}
          <a
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "8px",
            }}
            onClick={signinClick}
          >
            {t("login-page.register-now")}
          </a>
        </Box>
      </Box>
      {/* </Box> */}
    </Box>
  );
};

export default Login;
