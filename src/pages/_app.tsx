import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { AppProps } from "next/app";
import { Provider as StoreProvider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "regenerator-runtime/runtime";
import "../styles/globals.css";
import NewApp from "./_newApp";

import { Box, CircularProgress, Grid, Typography, useMediaQuery, Theme, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { store } from "../store/store";
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const [loading, setLoading] = useState(true);
  // verify auth
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token");
    console.log("userLoggedIn", userLoggedIn);
    const publicRoutes = [
      "/pricing",
      "/verify/verificationSent",
      "/verify",
      "/verify/forgetPassword",
      "/home",
      "/blog",
      "/blog/blog-details",
      "/about-us",
      "/gifting",
      "/features",
      "/faqs",
      "/_auth/Auth",
      "/terms-of-use",
      "/privacy-policy",
    ];
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    if (publicRoutes.some((route) => route.includes(currentPath))) {
      if (!userLoggedIn)
        id ? router.push(`${currentPath}?id=${id}`) : router.push(currentPath);
      else router.push("/dashboard/chapters");
      setLoading(false);
    } else if (currentPath == "/" && userLoggedIn) {
      router.push("/dashboard/chapters");
    } else {
      if (!userLoggedIn) {
        router.push("/");
      }
      setLoading(false);
    }

    // if (
    //   !userLoggedIn &&
    //   userLoggedIn !== "undefined" &&
    //   currentPath !== "/verify/verificationSent" &&
    //   currentPath !== "/verify" &&
    //   currentPath !== "/verify/forgetPassword" &&
    //   currentPath !== "website/pricing" &&
    //   currentPath !== "website/homePage" &&
    //   currentPath !== "website/blog" &&
    //   currentPath !== "website/about-us" &&
    //   currentPath !== "website/gifting"
    // ) {
    //   console.log("1");
    //   // router.push("/");
    //   setLoading(false);
    // } else if (currentPath == "/") {
    //   console.log("2");
    //   setTimeout(() => {
    //     setLoading(false);
    //     router.push("/dashboard/chapters");
    //   }, 1000);
    //   // router.push("/dashboard/chapters");
    // } else {
    //   console.log("3");
    //   setLoading(false);
    //   // router.push("/dashboard/chapters");
    // }
  }, [currentPath]);

  const [showCookieBar, setShowCookieBar] = useState(true);

  useEffect(() => {
    let testCookieName = "test";
    Cookies.remove(testCookieName);
    console.log("cookie: ", Cookies.get(testCookieName));
    Cookies.set(testCookieName, 500);
    console.log("cookie: ", Cookies.get(testCookieName));
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  return (
    <StoreProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* {showCookieBar && (
          <CookieConsent
            enableDeclineButton
            declineButtonText="Customize"
            buttonText="Accept"
            flipButtons
            onDecline={() => {
              alert("Are you Sure!");
            }}
            setDeclineCookie={false}
            style={{
              background: "#2A3724",
              color: "#fff",
              fontSize: "16px",
              padding: "20px",
              width: "30%",
              borderRadius: "10px"
            }}
            buttonStyle={{
              background: "#ff5722",
              color: "#fff",
              fontSize: "16px",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "15px"
            }}
            declineButtonStyle={{
              background: "#777",
              color: "#fff",
              fontSize: "16px",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography sx={{ marginBottom: "15px", fontWeight: "700", fontSize: "20px" }}>We Value Your Privacy</Typography>
              <Typography>LifeScript uses cookies to ensure you get the best possible experience and to optimize our website. By clicking &apos;Accept&apos;, you consent to our use of cookies. If you wish to manage your preferences or learn more, please visit our Privacy Policy or select &lsquo;Customize&rsquo;.</Typography>

            </div>
          </CookieConsent>
        )} */}

        <Grid container justifyContent="center">
          {showCookieBar && (
            <CookieConsent
              enableDeclineButton
              declineButtonText="Customize"
              buttonText="Accept"
              flipButtons
              onDecline={() => {
                alert("Are you Sure!");
              }}
              setDeclineCookie={false}
              style={{
                background: "#2A3724",
                color: "#fff",
                fontSize: isMobile ? "10px" : isTablet ? "16px" : "18px",
                padding: "1px",
                // width: isMobile ? "90%" : "30%",
                width: isMobile ? "90%" : isTablet ? "50%" : "40%",
                borderRadius: "10px",
              }}
              buttonStyle={{
                background: "#ff5722",
                color: "#fff",
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "15px",
              }}
              declineButtonStyle={{
                background: "#777",
                color: "#fff",
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography sx={{ marginBottom: "15px", fontWeight: "700", fontSize: "15px" }}>We Value Your Privacy</Typography>
          <Typography>LifeScript uses cookies to ensure you get the best possible experience and to optimize our website. By clicking &apos;Accept&apos;, you consent to our use of cookies. If you wish to manage your preferences or learn more, please visit our Privacy Policy or select &lsquo;Customize&rsquo;.</Typography>
        </div> */}

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant={isMobile ? "body2"  : isTablet ? "body1" : "h6"} sx={{ marginBottom: "15px", fontWeight: "700", fontSize: "18px" }}>
                  We Value Your Privacy
                </Typography>
                <Typography variant={isMobile ? "body2" : isTablet ? "body1" : "body1"}>
                LifeScript uses cookies to ensure you get the best possible experience and to optimize our website. By clicking &apos;Accept&apos;, you consent to our use of cookies. If you wish to manage your preferences or learn more, please visit our Privacy Policy or select &lsquo;Customize&rsquo;.
                </Typography>
              </div>
            </CookieConsent>
          )}
        </Grid>

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
          <NewApp>
            <Component {...pageProps} />
          </NewApp>
        )}
      </LocalizationProvider>
    </StoreProvider>
  );
}
