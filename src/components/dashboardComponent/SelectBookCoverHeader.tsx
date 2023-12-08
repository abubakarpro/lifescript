import Welcome from "@/_assets/png/overview-welcome-card.png";
import Star from "@/_assets/svg/stars.svg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Button from "../button/Button";
import styles from "./Custom.module.css";

const SelectBookCoverHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#197065",
        color: "#fff",
        borderRadius: { sm: "24px", xs: "10px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1149px",
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
          Select Book Cover
        </Typography>
        <Box
          sx={{
            height: "43px",
            mt: { xs: "20px", md: "0px" },
          }}
        >
          <Button
            image={Star}
            title="AI Generated Cover"
            background="radial-gradient(ellipse at 49% 86%, rgba(44, 166, 152, .3) 0%, rgba(24, 111, 101, .6) 60%)"
            borderRadius="33.922px"
            border="2.5px solid #D9D9D9"
            color="white"
            padding="10px 18px"
            onClick={() => {}}
            width="183px"
            fontSize={"13px"}
          />
        </Box>
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
          display: "flex",
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
