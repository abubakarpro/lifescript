import { useState } from "react";

import NavBar from "@/components/dashboardComponent/Navbar";
import SideBar from "@/components/dashboardComponent/Sidebar";
import { Box } from "@mui/material";
import styles from "./Layout.module.css";

const Layout = ({
  children,
  addChapter,
}: {
  children?: any;
  addChapter?: () => void;
}) => {
  const [handleSideBar, setHandleSideBar] = useState(false);

  return (
    <Box
      sx={{ backgroundColor: "#FFF9F0", overflowX: "hidden" }}
      className="container-fontfamily"
    >
      <Box
        sx={{
          position: "fixed",
          right: "0",
          left: { md: "220px", sm: 0, xs: 0 },
          top: "0",
          zIndex: "2",
        }}
      >
        <NavBar
          sideBarHandle={() => setHandleSideBar(true)}
          newChapter={() => addChapter()}
        />
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
            // display: { md: "block", xs: "none", sm: "none" }
          }}
          className={`${styles.display} ${handleSideBar && styles.displayShow}`}
        >
          <SideBar />
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "1600px",
              color: "#000",
              height: "100%",
              minHeight: "95vh",
              padding: { sm: "36px 33px 30px", xs: "30px 16px 20px" },
              marginLeft: { md: "220px", sm: 0, xs: 0 },
            }}
            onClick={() => setHandleSideBar(false)}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
