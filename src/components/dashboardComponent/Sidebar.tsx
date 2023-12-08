import AccountWhite from "@/_assets/svg/sidebar/account-white.svg";
import BookCoverWhite from "@/_assets/svg/sidebar/book-cover-white.svg";
import CompletedGreen from "@/_assets/svg/sidebar/completed-green.svg";
import CompletedWhite from "@/_assets/svg/sidebar/completed-white.svg";
import FaqWhite from "@/_assets/svg/sidebar/faq-white.svg";
import HomeGreen from "@/_assets/svg/sidebar/home-green.svg";
import HomeWhite from "@/_assets/svg/sidebar/home-white.svg";
import ProgressGreen from "@/_assets/svg/sidebar/in-progress-green.svg";
import ProgressWhite from "@/_assets/svg/sidebar/in-progress-white.svg";
import OverViewGreen from "@/_assets/svg/sidebar/overView-green.svg";
import OverViewWhite from "@/_assets/svg/sidebar/overView-white.svg";
import SuportWhite from "@/_assets/svg/sidebar/support-white.svg";
import TreeWhite from "@/_assets/svg/sidebar/tree-white.svg";
import Logo from "@/_assets/svg/white-logo.svg";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  const [childsOpen, setChilsdOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Box sx={{ color: "#fff" }}>
      <Box sx={{ padding: "13px 20px", height: "70px" }}>
        <Image src={Logo} alt="logo" className={styles.logo} />
      </Box>
      <Box
        sx={{
          padding: "35px 29px 0 11px",
          borderTop: "1px solid #fff",
        }}
      >
        <Box>
          <a
            className={`${styles.link} ${
              currentRoute === "/dashboard/overview" && styles.active
            }`}
            onClick={() => router.push("/dashboard/overview")}
          >
            <Image
              alt="icon"
              src={
                currentRoute === "/dashboard/overview"
                  ? OverViewGreen
                  : OverViewWhite
              }
            />
            Overview
          </a>
        </Box>
        <Box>
          <a
            className={`${styles.link} ${
              currentRoute === "/dashboard/chapters"
                ? styles.active
                : currentRoute === "/dashboard/chapters/completedChapter" &&
                  styles.active
            }`}
            onClick={() => {
              // router.push("/dashboard/chapters");
              setChilsdOpen(!childsOpen);
            }}
          >
            <Image
              alt="icon"
              src={
                currentRoute === "/dashboard/chapters" ? HomeGreen : HomeWhite
              }
            />
            All Chapters
          </a>
          {childsOpen && (
            <Box>
              <Box sx={{ marginLeft: "20px" }}>
                <a
                  className={`${styles.link} ${
                    currentRoute === "/dashboard/chapters" && styles.active
                  }`}
                  onClick={() => {
                    router.push("/dashboard/chapters");
                  }}
                >
                  {/* Add your icon and text for the first new option */}
                  <Image
                    alt="icon"
                    src={
                      currentRoute === "/dashboard/chapters"
                        ? ProgressGreen
                        : ProgressWhite
                    }
                  />
                  In Progress
                  <Image
                    alt="icon"
                    src={
                      currentRoute === "/dashboard/chapters"
                        ? ProgressGreen
                        : ProgressWhite
                    }
                  />
                  In Progress
                </a>
              </Box>
              <Box sx={{ marginLeft: "20px" }}>
                <a
                  className={`${styles.link} ${
                    currentRoute === "/dashboard/chapters/completedChapter" &&
                    styles.active
                  }`}
                  onClick={() => {
                    router.push("/dashboard/chapters/completedChapter");
                  }}
                >
                  <Image
                    alt="icon"
                    src={
                      currentRoute === "/dashboard/chapters/completedChapter"
                        ? CompletedGreen
                        : CompletedWhite
                    }
                  />
                  Completed
                </a>
              </Box>
            </Box>
          )}
        </Box>
        <Box>
          <a className={styles.link}>
            <Image alt="icon" src={BookCoverWhite} />
            Book Cover
          </a>
        </Box>
        <Box>
          <a className={styles.link}>
            <Image alt="icon" src={FaqWhite} />
            Table of contents
          </a>
        </Box>
        <Box>
          <a className={styles.link}>
            <Image alt="icon" src={AccountWhite} />
            Account
          </a>
        </Box>
        <Box>
          <a className={styles.link}>
            <Image alt="icon" src={SuportWhite} />
            Support
          </a>
        </Box>
        <Box>
          <a className={styles.link}>
            <Image alt="icon" src={TreeWhite} />
            Gift a Book
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
