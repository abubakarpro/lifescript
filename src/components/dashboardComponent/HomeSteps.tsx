import Step1 from "@/_assets/svg/step1.svg";
import Step2 from "@/_assets/svg/step2.svg";
import Step3 from "@/_assets/svg/step3.svg";
import Step4 from "@/_assets/svg/step4.svg";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "./HomeSteps.module.css";

const HomeSteps = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        marginTop: "20px",
        backgroundColor: "#F3ECDA",
        color: "#30422E",
        borderRadius: "2px",
        padding: { sm: "0px 45px 20px", xs: "20px 40px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            left: { sm: "-40", xs: "-20px" },
            width: "150px",
          }}
          className={styles.typo}
        >
          1.
          {t("ChapterSteps.step1")}
        </Typography>
        <Image alt="icon" src={Step1} className={styles.logo} />
      </Box>
      <Divider
        sx={{
          height: "1.28px",
          width: "23%",
          bgcolor: "#BFC4B5",
          margin: "0 -10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            left: "-48px",
            width: "150px",
            textAlign: "center",
          }}
          className={styles.typo}
        >
          2. {t("ChapterSteps.step2")}
        </Typography>
        <Image alt="icon" src={Step2} className={styles.logo} />
      </Box>
      <Divider
        sx={{
          height: "1.28px",
          width: "23%",
          bgcolor: "#BFC4B5",
          margin: "0 -10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            left: { md: "-60px", sm: "-60px", xs: "-55px" },
            width: "180px",
            textAlign: "center",
          }}
          className={styles.typo}
        >
          3. {t("ChapterSteps.step3")}
        </Typography>
        <Image alt="icon" src={Step3} className={styles.logo} />
      </Box>
      <Divider
        sx={{
          height: "1.28px",
          width: "23%",
          bgcolor: "#BFC4B5",
          margin: "0 -10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            left: { md: "-60px", sm: "-60px", xs: "-55px" },
            width: "180px",
            textAlign: "center",
          }}
          className={styles.typo}
        >
          4. {t("ChapterSteps.step4")}
        </Typography>
        <Image alt="icon" src={Step4} className={styles.logo} />
      </Box>
    </Box>
  );
};

export default HomeSteps;