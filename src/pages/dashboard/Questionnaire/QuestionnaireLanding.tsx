import SubscriptionHeader from "@/components/dashboardComponent/subscriptionHeader";
import { getUserProfile, updateUserProfile } from "@/store/slices/authSlice";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Questionnaire.module.css";
import TabOne from "./qaTabOne";
import TabThree from "./qaTabThree";
import TabTwo from "./qaTabTwo";

const Questionnaire = () => {
  const dispatch: any = useDispatch();
  const [qaTab, setQaTab] = useState(1);
  const router = useRouter();
  const { userName } = router.query;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    questionAskType: "",
    bookUseFor: "",
    personalizedQuestion: "",
    gender: "",
    martialStatus: "",
    dateOfBirth: "",
    LanguagePreferences: "",
  });
  const handleTabOneClick = (val) => {
    setUserData({
      ...userData,
      bookUseFor: val,
    });
    setQaTab(2);
  };
  const handleTabTwoClick = (val) => {
    setUserData({
      ...userData,
      name: val.name,
      gender: val.gender,
      martialStatus: val.maritalStatus,
      dateOfBirth: val.dob,
      LanguagePreferences: val.lp,
    });
    setQaTab(3);
  };
  const handleTabThreeClick = (val) => {
    setLoading(false);
    setUserData({
      ...userData,
      questionAskType: val.frequency,
      personalizedQuestion: val.personal,
    });

    dispatch(
      updateUserProfile({
        name: userData?.name,
        questionAskType: val.frequency,
        bookUseFor: userData?.bookUseFor,
        personalizedQuestion: val.personal,
        gender: userData?.gender,
        martialStatus: userData?.martialStatus,
        dateOfBirth: userData?.dateOfBirth,
        LanguagePreferences: userData?.LanguagePreferences,
      })
    )
      .unwrap()
      .then(() => {
        const username = localStorage.getItem("username");
        router.push(`/getStarted/getTitle?userName=${username}`);
      })
      .catch(() => {});
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getUserProfile())
      .unwrap()
      .then((res) => {
        if (res.personalizedQuestion?.length > 0) {
          setTimeout(() => {
            router.push("/dashboard/chapters");
            setLoading(false);
          }, 3000);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      })
      .catch(() =>
        setTimeout(() => {
          console.log("fail");
          router.push(`/dashboard/Questionnaire?userName=${userName}`);
          setLoading(false);
        }, 3000)
      );
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box className={styles.QuestionnaireMain}>
          <Box
            sx={{
              display: { md: "block", xs: "none" },
            }}
            className={styles.QuestionnaireSideBar}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: { md: "20px 30px", sm: "15px 20px", xs: "10px" },
            }}
            className={styles.QuestionnaireTabsMain}
          >
            <SubscriptionHeader title="Questionnaire" description="" />
            <Box
              sx={{
                p: { md: "10px 20px", xs: "10px 0px" },
                flex: 1,
                overflowY: "auto",
                mt: { sm: "0px", xs: "20px" },
              }}
            >
              {qaTab === 1 ? (
                <TabOne
                  onClick={handleTabOneClick}
                  data={userData?.bookUseFor}
                  setQaTab={setQaTab}
                />
              ) : qaTab === 2 ? (
                <TabTwo
                  onClickBack={() => setQaTab(1)}
                  onClickNext={handleTabTwoClick}
                  data={userData}
                  userName={userName}
                  setQaTab={setQaTab}
                />
              ) : (
                <TabThree
                  onClickBack={() => setQaTab(2)}
                  onClickNext={handleTabThreeClick}
                  data={userData}
                  setQaTab={setQaTab}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Questionnaire;
