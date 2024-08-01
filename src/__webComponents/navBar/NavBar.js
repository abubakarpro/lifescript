"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./NavBar.module.css";
import Button from "../button/Button";
import NextIcon from "@/__webAssets/svgs/next.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";


import Menu from "@/__webAssets/svgs/mobile-menu.svg";
import MenuW from "@/__webAssets/svgs/mobile-menu-white.svg";
import { useTranslation } from "react-i18next";

const LanguageOption = dynamic(() => import("./Language"), { ssr: false });
const NavBar = ({ color, logo }) => {
  const { t } = useTranslation();
  const [mobileState, setMobileState] = useState(false);
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const userLoggedInStorage = localStorage.getItem("token");
    setUserLoggedIn(
      !!userLoggedInStorage && userLoggedInStorage !== "undefined"
    );
  }, []);

  const handleButtonClick = (() => {
    if (userLoggedIn) {
      router.push("/dashboard/chapters");
    } else {
      router.push("/_auth/Auth");
    }
  }, [userLoggedIn, router]);

  const handleMenu = useCallback(() => {
    setMobileState(prev => !prev);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {
          lg: "64px 90px 0",
          md: "50px 50px 0 ",
          sm: "40px 50px 0",
          xs: "30px 16px 0",
        },
        position: "relative",
        bgcolor: {
          md: "none",
          sm: mobileState && "#F3ECDA",
          xs: mobileState && "#F3ECDA",
        },
        zIndex: "100",
      }}
    >
      {logo !== "home" && (
        <Link href="/">
          {!mobileState && (
            <Image src={logo} alt="Logo" className={styles.logo} loading="lazy"/>
          )}
        </Link>
      )}

      {logo === "home" && (
        <Link href="/">
          {!mobileState && (
            <Image
              src="/lifescript-life-story-book-logo.svg"
              loading="lazy"
              alt="Logo"
              width={200}
              height={200}
              className={styles.logo}
            />
          )}
        </Link>
      )}

      <Image
        src={pathname === "/" ? Menu : MenuW && (mobileState ? Menu : MenuW)}
        alt="icon"
        loading="lazy"
        onClick={handleMenu}
        className={styles.menu}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { md: "row", sm: "column", xs: "column" },
        }}
        color={mobileState ? "" : color}
        className={`${
          mobileState ? `${styles.menuItems} ${styles.show}` : styles.hide
        }`}
      >
        {mobileState && (
          <Image
            src="/lifescript-life-story-book-logo.svg"
            loading="lazy"
            alt="Logo"
            width={230}
            height={150}
            className={styles.logoMenu}
          />
        )}

        <Link href="/">
          <Typography
            sx={{
              padding: {
                lg: " 0 20px 10px",
                md: "0px 12px 10px",
                sm: "0 10px 20px",
                xs: "0 0 20px",
              },
              fontSize: { lg: "18px", md: "17px", sm: "18px", xs: "18px" },
              fontFamily: "Avenir5",
            }}
            className={`${pathname === "/" ? styles.underLine : ""} ${
              styles.hoverLinks
            }`}
          >
            {t("landingPage.navBar.home")}
          </Typography>
        </Link>

        <Link href="/features">
          <Typography
            sx={{
              padding: {
                lg: " 0 20px 10px",
                md: "0px 12px 10px",
                sm: "0 10px 20px",
                xs: "0 0 20px",
              },
              fontSize: { lg: "18px", md: "17px", sm: "18px", xs: "18px" },
              fontFamily: "Avenir5",
            }}
            className={`${pathname === "/features" ? styles.underLine : ""}  ${
              styles.hoverLinks
            }`}
          >
            {t("landingPage.navBar.features")}
          </Typography>
        </Link>

        <Link href="/blog">
          <Typography
            sx={{
              padding: {
                lg: " 0 20px 10px",
                md: "0px 12px 10px",
                sm: "0 10px 20px",
                xs: "0 0 20px",
              },
              fontSize: { lg: "18px", md: "17px", sm: "18px", xs: "18px" },
              fontFamily: "Avenir5",
            }}
            className={`${
              pathname === "/blog" || pathname === "/blog/blog-details"
                ? styles.underLine
                : ""
            }  ${styles.hoverLinks}`}
          >
            {t("landingPage.navBar.blog")}
          </Typography>
        </Link>

        <Link href="/about-us">
          <Typography
            sx={{
              padding: {
                lg: " 0 20px 10px",
                md: "0px 12px 10px",
                sm: "0 10px 20px",
                xs: "0 0 20px",
              },
              fontSize: { lg: "18px", md: "17px", sm: "18px", xs: "18px" },
              fontFamily: "Avenir5",
            }}
            className={`${pathname === "/about-us" ? styles.underLine : ""}  ${
              styles.hoverLinks
            }`}
          >
            {/* About Us */}
            {t("landingPage.navBar.about-us")}
            
          </Typography>
        </Link>

        <Link href="/pricing">
          <Typography
            sx={{
              padding: {
                lg: " 0 20px 10px",
                md: "0px 12px 10px",
                sm: "0 10px 20px",
                xs: "0 0 20px",
              },
              fontSize: { lg: "18px", md: "17px", sm: "18px", xs: "18px" },
              fontFamily: "Avenir5",
            }}
            className={`${pathname === "/pricing" ? styles.underLine : ""}  ${
              styles.hoverLinks
            }`}
          >
            {/* Pricing */}
            {t("landingPage.navBar.pricing")}
          </Typography>
        </Link>

        <Link href="/faqs">
          <Typography
            sx={{
              padding: {
                lg: " 0 20px 10px",
                md: "0px 12px 10px",
                sm: "0 10px 20px",
                xs: "0 0 20px",
              },
              fontSize: { lg: "18px", md: "17px", sm: "18px", xs: "18px" },
              fontFamily: "Avenir5",
            }}
            className={`${pathname === "/faqs" ? styles.underLine : ""}  ${
              styles.hoverLinks
            }`}
          >
            {/* FAQ&apos;s */}
            {t("landingPage.navBar.faq")}

          </Typography>
        </Link>

        <Box sx={{ paddingBottom: "10px", display: "flex", columnGap: "10px" }}>
          <Link href="/_auth/Auth">
            <Button
              title={t("landingPage.navBar.login")}
              width="140px"
              height="45px"
              img2={NextIcon}
              onClick={handleButtonClick}
            />
          </Link>
          <Box className={styles.langBtn}>
            <LanguageOption />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;