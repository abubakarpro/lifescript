import { useState } from "react";

import NavBar from "@/components/dashboardComponent/Navbar";
import SideBar from "@/components/dashboardComponent/Sidebar";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children?: any }) => {
  const [handleSideBar, setHandleSideBar] = useState(false);
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "#FFF9F0",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
      // className="container-fontfamily"
      className={
        router.asPath === "/dashboard/narrative" && styles.nativeMainBg
      }
    >
      <Box
        sx={{
          position: "fixed",
          right: "0",
          left: { md: "220px", sm: 0, xs: 0 },
          top: "0",
          zIndex: "3",
        }}
      >
        <NavBar sideBarHandle={() => setHandleSideBar(true)} />
      </Box>
      <Box sx={{ marginTop: "1px", display: "flex", mt: "70px" }}>
        <Box
          sx={{
            width: "220px",
            backgroundColor: "#197065",
            position: "fixed",
            bottom: "0",
            top: "0px",
            zIndex: "2",
          }}
          className={`${styles.display} ${handleSideBar && styles.displayShow}`}
        >
          <SideBar />
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1600px",
            color: "#000",
            height: "100%",
            minHeight: "calc(100vh - 70px)",
            padding: { sm: "10px 33px 30px", xs: "10px 16px 30px" },
            marginLeft: { lg: "220px", md: "200px", sm: 0, xs: 0 },
          }}
          onClick={() => setHandleSideBar(false)}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
