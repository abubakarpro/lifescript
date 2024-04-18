import { Box, Typography, Link } from "@mui/material";
import Image from "next/image";
import styles from "../ComponentsStyles.module.css";

import Logo from "@/__webAssets/svgs/lifescript-life-story-book-logo.svg";
import Insta from "@/__webAssets/svgs/insta.svg";
import Fb from "@/__webAssets/svgs/fb.svg";
import Li from "@/__webAssets/svgs/li.svg";
import X from "@/__webAssets/svgs/x.svg";
// import Link from "next/link"

const Footer = () => {
  const logo = {
    width: "25px",
    height: "auto",
  };
  return (
    <Box>
      <Box
        sx={{
          padding: {
            lg: "44px 55px 40px 100px",
            sm: "44px 30px 40px 70px",
            xs: "40px 0",
          },
          bgcolor: "#30422E",
          color: "#F3ECDA",
          display: "flex",
          justifyContent: { sm: "space-between", xs: "center" },
        }}
      >
        <Box>
          <Image src={Logo} alt="logo" />
          <Typography
            sx={{
              width: "210px",
              fontSize: "16px",
              margin: "23px 0",
              textAlign: { xs: "center", sm: "start" },
            }}
          >
            Echoes of the past, blueprint for the future.
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "13px",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <a
              href="https://www.instagram.com/the.lifescript?igsh=ZWcyY3I1c2pmMzIw&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Insta} alt="Instagram" style={logo} />
            </a>
            <a
              href="https://www.tiktok.com/@the.lifescript?_t=8lYbtVKetST&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Li} alt="logo" style={logo} />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61554559332668"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Fb} alt="logo" style={logo} />
            </a>

            <a
              href="https://twitter.com/thelifescript"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={X} alt="logo" style={logo} />
            </a>
          </Box>
        </Box>

        <Box sx={{ display: "flex", columnGap: "45px" }}>
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <Typography
              sx={{
                fontWeight: 800,
                marginBottom: "19px",
                fontFamily: "Avenir8 !important",
              }}
            >
              COMPANY
            </Typography>
            <Link href="/about-us">
              <Typography
                sx={{ fontSize: "16px", marginBottom: "19px" }}
                className={styles.hoverLinks}
              >
                About Us
              </Typography>
            </Link>
            <Link href="/features">
              <Typography
                sx={{ fontSize: "16px", marginBottom: "19px" }}
                className={styles.hoverLinks}
              >
                Features
              </Typography>
            </Link>
            <Link href="/pricing">
              <Typography
                sx={{ fontSize: "16px", marginBottom: "19px" }}
                className={styles.hoverLinks}
              >
                Pricing
              </Typography>
            </Link>
            <Link href="/blog">
              <Typography
                sx={{ fontSize: "16px" }}
                className={styles.hoverLinks}
              >
                Blog
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <Typography
              sx={{
                fontWeight: 800,
                marginBottom: "19px",
                fontFamily: "Avenir8 !important",
              }}
            >
              HELP
            </Typography>
            <Link href="/about-us#ContactUs">
              <Typography
                sx={{ fontSize: "16px", marginBottom: "19px" }}
                className={styles.hoverLinks}
              >
                Contact Us
              </Typography>
            </Link>
            <Link href="/faqs">
              <Typography
                sx={{ fontSize: "16px", marginBottom: "19px" }}
                className={styles.hoverLinks}
              >
                FAQ
              </Typography>
            </Link>
            <Link href="/terms-of-use">
              <Typography
                sx={{ fontSize: "16px", marginBottom: "19px" }}
                className={styles.hoverLinks}
              >
                Terms and conditions
              </Typography>
            </Link>
            <Link href="/privacy-policy">
              <Typography
                sx={{ fontSize: "16px" }}
                className={styles.hoverLinks}
              >
                Privacy Policy
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          padding: "23px 0",
          fontSize: { xs: "12px", sx: "14px" },
          fontFamily: "Avenir",
        }}
      >
        © Copyright 2024 LifeScript
      </Box>
    </Box>
  );
};

export default Footer;
