import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider as StoreProvider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "regenerator-runtime/runtime";
import "../styles/globals.css";
import NewApp from "./_newApp";

import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { store } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const [loading, setLoading] = useState(true);
  // verify auth
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token");

    const publicRoutes = [
      "/pricing",
      "/verify/verificationSent",
      "/verify",
      "/verify/forgetPassword",
      "/change-password",
      "/home",
      "/blog",
      "blog/*",
      "/blog/blog-details",
      "/about-us",
      "/gifting",
      "/features",
      "/faqs",
      "/_auth/Auth",
      "/terms-of-use",
      "/privacy-policy",
      "/stripe-page",
      "/stripe-page/subscription",
      "/stripe-page/gift-subscription",
      "/stripe-page/register-free-trial",
      "/stripe-page/sso-redirecting",
      "/_auth/fb-redirecting",
    ];
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const slug = queryParams.get("slug");
    if (window.location.search.includes("?via=install")) {
      setLoading(false);
      return;
    }
    if (currentPath && currentPath.startsWith("/verify")) {
      const token = queryParams.get("token");
      if (token) {
        setLoading(false);
        return;
      }
    }
    if (!currentPath) return;
    setLoading(false);
    // If the user is logged in and tries to access /blog or any subpath of it, redirect to /dashboard/chapters
    if (
      userLoggedIn &&
      (currentPath === "/blog" || currentPath.startsWith("/blog/"))
    ) {
      router.push("/dashboard/chapters");
      setLoading(false);
    } else if (!userLoggedIn) {
      // Redirect to the current path, passing id if available
      setLoading(false);
      if (currentPath) {
        id ? router.push(`${currentPath}?id=${id}`) : router.push(currentPath);
      }
    } else if (userLoggedIn && currentPath === "/") {
      // Redirect the logged-in user from home page to dashboard/chapters
      router.push("/dashboard/chapters");
      setLoading(false);
    } else if (!userLoggedIn) {
      // If the user is not logged in and tries to access any path, redirect to home page
      router.push("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
    //previous with slug and blog-details
    // if (currentPath.startsWith("/verify")) {
    //   const token = queryParams.get("token");
    //   if (token) {
    //     setLoading(false);
    //     return;
    //   }
    // }
    // if (publicRoutes.some((route) => route.includes(currentPath))) {
    //   if (!userLoggedIn)
    //     id ? router.push(`${currentPath}?id=${id}`) : slug ? router.push(`${currentPath}?slug=${slug}`) : router.push(currentPath);
    //   else if (currentPath === "/stripe-page/gift-subscription") {
    //     setLoading(false);
    //   } else router.push("/dashboard/chapters");
    //   setLoading(false);
    // } else if (currentPath == "/" && userLoggedIn) {
    //   router.push("/dashboard/chapters");
    // } else {
    //   if (!userLoggedIn) {
    //     router.push("/");
    //   }
    //   setLoading(false);
    // }
  }, [currentPath]);

  const [showCookieBar, setShowCookieBar] = useState(true);

  useEffect(() => {
    let testCookieName = "test";
    Cookies.remove(testCookieName);

    Cookies.set(testCookieName, 500);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  return (
    <StoreProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container justifyContent="center">
          {showCookieBar && (
            <CookieConsent
              enableDeclineButton
              declineButtonText="Decline"
              buttonText="Accept"
              flipButtons
              onDecline={() => {}}
              setDeclineCookie={false}
              style={{
                background: "#2A3724",
                color: "#fff",
                fontSize: isMobile ? "10px" : isTablet ? "16px" : "18px",
                padding: "1px",
                display: "inline-block",
                width: isMobile ? "85%" : isTablet ? "50%" : "400px",
                borderRadius: "0px 5px 0px 0px ",
              }}
              buttonStyle={{
                background: "#ff5722",
                color: "#fff",
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "23px",
                textAlign: "center",
                width: isMobile ? "100px" : isTablet ? "100px" : "150px",
              }}
              declineButtonStyle={{
                background: "#777",
                color: "#fff",
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                width: isMobile ? "100px" : isTablet ? "100px" : "150px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "2px",
                  width: isMobile ? "81%" : isTablet ? "90%" : "90%",
                  justifyContent: "center",
                  marginLeft: "2%",
                }}
              >
                <Typography
                  variant={isMobile ? "body2" : isTablet ? "body1" : "h6"}
                  sx={{
                    marginBottom: "15px",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  We Value Your Privacy
                </Typography>
                <Typography
                  variant={isMobile ? "body2" : isTablet ? "body1" : "body1"}
                >
                  This website uses cookies to ensure you get the best possible
                  experience. By clicking &apos;Accept&apos;, you agree to our
                  use of cookies.
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
          <SessionProvider session={pageProps?.session}>
            <NewApp>
              <Component {...pageProps} />
              <Script
                src="https://r.wdfl.co/rw.js"
                data-rewardful="797851"
              ></Script>
              <Script id="rewardful-queue" strategy="beforeInteractive">
                {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
              </Script>
            </NewApp>
          </SessionProvider>
        )}
      </LocalizationProvider>
    </StoreProvider>
  );
}
