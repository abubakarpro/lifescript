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
        backgroundColor: "#30422E",
        color: "#fff",
        borderRadius: { sm: "24px", xs: "5px" },
        padding: { sm: "20px 45px", xs: "20px 40px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
          padding: "20px 0",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            top: "0px",
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
          height: "1px",
          width: "23%",
          bgcolor: "#fff",
          margin: "0 -10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
          padding: "20px 0",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            bottom: "10px",
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
          height: "1px",
          width: "23%",
          bgcolor: "#fff",
          margin: "0 -10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
          padding: "20px 0",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            top: "0px",
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
          height: "1px",
          width: "23%",
          bgcolor: "#fff",
          margin: "0 -10px",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: "1",
          padding: "20px 0",
        }}
        className={styles.stepContainer}
      >
        <Typography
          sx={{
            fontSize: { md: "12px", sm: "10px" },
            position: "absolute",
            bottom: "10px",
            left: "-40px",
            width: "200px",
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
