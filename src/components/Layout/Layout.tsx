import { useState } from "react";

import NavBar from "@/components/dashboardComponent/Navbar";
import SideBar from "@/components/dashboardComponent/Sidebar";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children?: any }) => {
  const [handleSideBar, setHandleSideBar] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();

  return (
    <Box
      sx={{
        backgroundColor: "#F3ECDA",
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
          left: { lg: "220px", sm: 0, xs: 0 },
          top: "0",
          zIndex: "3",
        }}
      >
        <NavBar sideBarHandle={() => setHandleSideBar(true)} />
      </Box>
      <Box
        sx={{
          marginTop: "1px",
          display: "flex",
          mt: { xs: "50px", lg: "70px" },
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.76)",
            width: handleSideBar && "100%",
            height: "100vh",
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: "12",
          }}
          className={`${styles.display} ${handleSideBar && styles.displayShow}`}
          onClick={() => setHandleSideBar(false)}
        >
          <Box
            sx={{
              width: "220px",
              backgroundColor: "#30422E",
              position: "fixed",
              bottom: "0",
              top: "0px",
              zIndex: "2",
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className={`${styles.display} ${
              handleSideBar && styles.displayShow
            }`}
          >
            <SideBar
              handleSideCheck={handleSideBar}
              menuClick={() => setHandleSideBar(false)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            // maxWidth: "1600px",
            color: "#000",
            height: "100%",
            minHeight: "calc(100vh - 70px)",
            padding: { sm: "10px 33px 30px" },
            marginLeft: { lg: "220px", md: "0px", sm: 0, xs: 0 },
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
