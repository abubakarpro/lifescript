// import styles from "@/styles/Dashboard.module.css";
import BgLoadImage from "@/_assets/svg/bckgrnd-Loading.svg";
import LoadImage from "@/_assets/svg/loading.svg";
import { ReloadingBar } from "@/components/dashboardComponent/LinearProgressBar";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../narrative/Narrative.module.css";

const Loading = ({ isLoaded, progressCheck }) => {
  const [progress, setProgress] = useState(10);
  const [showCompletion, setShowCompletion] = useState(true);
  const router = useRouter();

  //   const isLoaded = useSelector(isChapterLoaded);

  const { t } = useTranslation();

  const { chapterId, openai } = router.query;

  console.log("progressCheck", progressCheck);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setShowCompletion(false);
          setTimeout(() => {
            setShowCompletion(false);
          }, 1000);
          return 100;
        } else {
          if (prevProgress === 99) {
            return isLoaded ? prevProgress + 1 : prevProgress + 0;
          } else {
            return prevProgress + 10;
          }
        }
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [isLoaded]);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#FFF9F0",
        color: "#197065",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "34px", fontWeight: 200 }}>
        {progress < 40 && "Copying Template"}
        {progress < 80 && progress >= 40 && "Suggesting Questions"}
        {progress >= 100 && "Finalizing"}
      </Typography>
      <Box className={styles.loadImageMain}>
        <Image
          src={BgLoadImage}
          alt="BgLoadImage"
          className={styles.BgloadImage}
        />
        <Image alt="image" src={LoadImage} className={styles.loadImage} />
      </Box>
      <Box sx={{ width: { xs: "90%", sm: "80%", lg: "60%" } }}>
        <ReloadingBar value={progress} />
      </Box>
    </Box>
  );
};

export default Loading;
