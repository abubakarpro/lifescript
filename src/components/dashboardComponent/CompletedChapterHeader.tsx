import Tick from "@/_assets/svg/Tick.svg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "./Custom.module.css";

const CompletedChapterHeader = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "#30422E",
        color: "#fff",
        borderRadius: { sm: "24px", xs: "10px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // maxWidth: "1600px",
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
          {t("completedCh.com")}
        </Typography>
      </Box>
      <Box>
        <Image alt="Welcome" src={Tick} />
      </Box>
    </Box>
  );
};

export default CompletedChapterHeader;
