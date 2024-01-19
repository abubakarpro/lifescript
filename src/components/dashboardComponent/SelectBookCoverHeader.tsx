import Welcome from "@/_assets/png/overview-welcome-card.png";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./Custom.module.css";

const SelectBookCoverHeader = ({ discription }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#30422E",
        color: "#fff",
        borderRadius: { sm: "24px", xs: "10px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // maxWidth: "1149px",
        width: "100%",
        height: { xs: "auto", sm: "150px", md: "165px" },
        gap: "30px",
        overflow: "hidden",
      }}
      className={styles.SelBookCoverHeaderMain}
    >
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          width: "65%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          padding: { md: "15px 50px", sm: "15px 35px", xs: "15px 30px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "28px", md: "32px", lg: "39.75px" },
            fontWeight: 700,
          }}
        >
          {discription}
        </Typography>
      </Box>
      <Box
        sx={{
          background: { xs: "transparent", sm: "#17756A" },
          height: {
            sm: "400px",
          },
          width: {
            xs: "230px",
            sm: "260px",
            lg: "360px",
          },
          display: { sm: "flex", xs: "none" },
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
        }}
      >
        <Image
          alt="Welcome"
          src={Welcome}
          className={styles.SelBookCoverHeaderBook}
        />
      </Box>
    </Box>
  );
};

export default SelectBookCoverHeader;
