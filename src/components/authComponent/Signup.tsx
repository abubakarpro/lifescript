import { SignupData } from "@/interface/authInterface";
import { googleSignup, signup } from "@/store/slices/authSlice";
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

const Signup = ({ signupClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   const socialSignin = async () => {
  //     if (status === "authenticated") {
  //       const data = {
  //         email: session?.user?.email,
  //         name: session?.user?.name || session?.user?.email,
  //       };
  //       // dispatch(facebookSignup())
  //     }
  //   };
  //   socialSignin();
  // }, [status]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const responseFacebook = (response: any) => {};

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleLoginSuccess(tokenResponse),
    onError: () => handleGoogleLoginFailure(),
  });

  const handleGoogleLoginSuccess = (e: any) => {
    dispatch(googleSignup({ credential: e.access_token }))
      .unwrap()
      .then((res) => {
        toast.success(t("signup-page.signedUpSuccessfully"));
        router.push(`/getStarted?userName=${res.name}`);
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLoginFailure = () => {
    toast.error(t("signup-page.failedSignupGoogle"));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async (data: SignupData) => {
      dispatch(signup(data))
        .unwrap()
        .then(() => {
          toast.success(t("signup-page.verificationEmailSent"));
          router.push(`/verify/verificationSent/?email=${data.email}`);
        })
        .catch((error: any) => {
          toast.error(error?.message || t("signup-page.failedSignup"));
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(t("signup-page.emailRequired")),
      password: Yup.string()
        .min(8, t("signup-page.passwordLength"))
        .required(t("signup-page.passwordRequired")),
      name: Yup.string().required(t("signup-page.nameRequired")),
    }),
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        maxWidth: "460px",
        width: "100%",
      }}
    >
      <Box width="100%">
        <Box>
          <Typography
            sx={{
              // marginRight: "300px",
              // marginTop: "24px",
              fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
            }}
          >
            {t("signup-page.email")}
          </Typography>
          <TextField
            variant="outlined"
            placeholder={t("signup-page.enter-email")}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            sx={{
              margin: "10px 0",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px", // Adjust the border radius as needed
                backgroundColor: "white",
              },
              width: "100%",
            }}
          />
        </Box>
        {formik.touched.email && formik.errors.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}

        <Typography
          sx={{
            // marginRight: "300px",
            fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
            marginTop: "24px",
          }}
        >
          {/* {t("signup-page.")} */}
          {t("signup-page.name")}
        </Typography>
        <Box>
          <TextField
            variant="outlined"
            placeholder={t("signup-page.enter-name")}
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            sx={{
              margin: "10px 0",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                borderRadius: "50px", // Adjust the border radius as needed
              },
              width: "100%",
            }}
          />
        </Box>
        {formik.touched.name && formik.errors.name && (
          <span style={{ color: "red" }}>{formik.errors.name}</span>
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
              {t("signup-page.password")}
            </Typography>
            <TextField
              sx={{
                margin: "10px 0",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px", // Adjust the border radius as needed
                  backgroundColor: "white",
                },
                width: "100%",
              }}
              placeholder={t("signup-page.enter-password")}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
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
            <span style={{ color: "red" }}>{formik.errors.password}</span>
          )}
        </Box>
        <Box sx={{ justifyContent: "center", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={(event) => formik.handleSubmit()}
            type="submit"
            sx={{
              borderRadius: "48px",
              backgroundColor: "#30422E",
              color: "white",
              width: { md: "60%", sm: "70%", xs: "70%" },
              marginTop: { xs: "40px", sm: "20px" },
              "&:hover": {
                backgroundColor: "#30422E",
              },
              textTransform: "capitalize",
            }}
          >
            {t("signup-page.register")}
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
                {t("signup-page.or-register-with")}
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
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <Image src={googleLogo} alt="Google Logo" />
              <Typography>Signup With Google</Typography>
            </Button>
          </Box>
          {/* <Box>
            <Button
              variant="contained"
              type="submit"
              onClick={() => signIn("facebook")}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Center the content horizontally and vertically
                borderRadius: "13px",
                backgroundColor: "white",
                color: "black",
                width: "40px", // Use "width" instead of "maxWidth" for button width
                height: "40px", // Use "height" instead of "maxHeight" for button height
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              startIcon={
                <Image
                  src={fbLogo}
                  alt="Facebook Logo"
                  width={24}
                  height={24}
                />
              }
            ></Button>
          </Box> */}
        </Box>
        <Box
          sx={{
            mt: "20px",
            fontSize: "16px",
            textAlign: "center",
            color: "#30422E",
          }}
        >
          {t("signup-page.alreadyRegisterd")}
          <a
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "8px",
            }}
            onClick={signupClick}
          >
            {t("signup-page.loginNow")}
          </a>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};

export default Signup;
