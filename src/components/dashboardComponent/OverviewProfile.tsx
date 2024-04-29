import DemoProfile from "@/_assets/svg/profile.svg";
import Bronze from "@/_assets/svg/bronze-token.svg";
import Gold from "@/_assets/svg/gold-token.svg";
import Grey from "@/_assets/svg/Silver Token.svg";
import Platinum from "@/_assets/svg/platinum-token.svg";
import Silver from "@/_assets/svg/silver-token.svg";
import { Box, Tooltip, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "./Custom.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getChapters, selectAllChapters } from "@/store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, selectUser } from "@/store/slices/authSlice";

const Profile = ({ data }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch: any = useDispatch();
  const allChapters = useSelector(selectAllChapters);
  const userData = useSelector(selectUser);
  const [userImage, setUserImage] = useState("");
  const [progressChapters, setProgressChapters] = useState([]);
  const [userName, setUserName] = useState("");

  function calculateCompletionPercentage(array) {
    if (array?.length === 0) {
      return 0;
    }

    const completedCount = array?.filter(
      (item) => item.status === "Completed"
    ).length;
    // Calculate the percentage
    const percentage = (completedCount / array?.length) * 100;

    return percentage;
  }

  useEffect(() => {
    const name = localStorage.getItem("username");
    const firstName = name ? name.split(' ')[0] : ''; // Get the part before the first space
    setUserName(firstName);
    dispatch(getChapters());
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (allChapters.length > 0) {
      const inProgressChapters = allChapters.filter(
        (chapter) =>
          chapter.status !== true && chapter.compilingStatus === false
      );
      setProgressChapters(inProgressChapters);
    }
  }, [allChapters]);

  useEffect(() => {
    if (userData) {
      setUserImage(userData?.profileImage);
    }
  }, [userData]);
  return (
    <Box
      sx={{
        bgcolor: "#F3ECDA",
        maxWidth: { xl: "335px", lg: "300px", xs: "100%" },
        width: "100%",
        borderRadius: "4px",
        padding: { xs: "32px 28px 44px" },
      }}
    >
      <Box
        sx={{
          maxWidth: {
            lg: "326.25px",
            sm: "70%",
            xs: "100%",
          },
          margin: "auto",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
          {t("overView.achivement")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "30px 0 40px",
            columnGap: { xl: "18px", lg: "4px" },
          }}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Tooltip title={data?.words < 500 ? "Bronze badge will be opened after writing 500 words" : "Bronze"}>
              <Image
                alt="tag"
                src={data?.words < 499 ? Grey : Bronze}
                className={styles.profileAchivements}
              />
            </Tooltip>
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <Tooltip title={data?.chapters < 5 ? "Silver badge will be opened after completing 5 chapters" : "Silver"}>
              <Image
                alt="tag"
                src={data?.chapters < 5 ? Grey : Silver}
                className={styles.profileAchivements}
              />
            </Tooltip>
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <Tooltip title={data?.questions < 100 ? "Gold badge will be opened after adding 100 questions" : "Gold"}>
              <Image
                alt="tag"
                src={data?.questions < 100 ? Grey : Gold}
                className={styles.profileAchivements}
              />
            </Tooltip>
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <Tooltip title={data?.words < 5000 ? "Platinum badge will be opened after writing 5000 words" : "Platinum"}>
              <Image
                alt="tag"
                src={data?.words < 5000 ? Grey : Platinum}
                className={styles.profileAchivements}
              />
            </Tooltip>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
          {t("overView.RecentCh")}
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          {progressChapters?.slice(0, 5).map((chapter) => (
            <RecentChapters
              key={chapter?._id}
              title={chapter?.title}
              id={chapter?._id}
              percentage={calculateCompletionPercentage(chapter?.questions)}
            />
          ))}
        </Box>
        <Box onClick={() => router.push("/dashboard/chapters")}>
          <Typography
            sx={{
              cursor: "pointer",
              fontSize: "12px",
              color: "#30422E",
              marginTop: "22px",
              textAlign: "center",
            }}
          >
            {/* {t("overView.viewMore")} */}
            {progressChapters?.length > 3 ? t("overView.viewMore") : "Add More"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;

export const RecentChapters = ({ title, percentage, id }) => {
  const router = useRouter();
  return (
    <Box
      onClick={() =>
        router.push(`/dashboard/chapters/chapterName?chapterId=${id}`)
      }
      sx={{
        cursor: "pointer",
        bgcolor: "#F4F4F4",
        borderRadius: "4px",
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 11px 8px 25px",
        marginBlock: "11px",
      }}
    >
      <Typography sx={{ fontSize: "10px" }}>{title}</Typography>
      <CircularWithValueLabel percentage={percentage} />
    </Box>
  );
};

{
  /* // Progress Bar code */
}
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", width: "24px" }}>
      <CircularProgress sx={{ color: "#E1683B" }} variant="determinate" {...props} />
      <Box
        sx={{
          top: 2,
          left: -15,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="#E1683B"
          sx={{ fontSize: "6px" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function CircularWithValueLabel({ percentage }) {
  return <CircularProgressWithLabel value={percentage} />;
}
