import BgRounded from "@/_assets/png/overview-welcome-bg.png";
import Welcome from "@/_assets/png/overview-welcome-card.png";
import ContineWriting from "@/_assets/svg/continue-writing.svg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/Button";
import styles from "./Custom.module.css";

const WelcomeOverview = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUserName(name);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#30422E",
        color: "#fff",
        borderRadius: "14px",
        padding: { xl: "20px 30px", lg: "15px 25px", xs: "12px 20px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // maxWidth: "1149px",
        width: "100%",
        maxHeight: "230px",
        // minWidth: "700px",
        position: "relative",
        overflow: "hidden",
      }}
      className={styles.welcomeMain}
    >
      <Box>
        <Typography sx={{ fontSize: "18.75px" }}>
          {t("overView.headerWelcome")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: "33px", sm: "28px" },
            lineHeight: "120%",
            fontWeight: 700,
          }}
        >
          {" "}
          {userName}
        </Typography>
        <Typography
          sx={{
            fontSize: { xl: "14px", sm: "12px" },
            fontWeight: 300,
            lineHeight: "150%",
            marginBottom: "20px",
            color: "#a8c9c5",
            marginTop: "10px",
          }}
        >
          {t("overView.headerdescription")}
        </Typography>
        <Button
          onClick={() => router.push("/dashboard/chapters")}
          image={ContineWriting}
          btnText={`${t("overView.headerBtnText")}`}
          // btnText="| Continue Writing"
          bgColor="#fff"
          borderRadius="23px"
          color="#30422E"
          fontSize={{ xs: "12px" }}
          border="0px"
        />
      </Box>
      <Box
        sx={{
          display: { sm: "block", xs: "none" },
        }}
      >
        <Image alt="Welcome" src={Welcome} className={styles.welcomeImage} />
        <Image alt="Welcome" src={BgRounded} className={styles.bgRounded} />
      </Box>
    </Box>
  );
};

export default WelcomeOverview;
