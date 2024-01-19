import EditIcon from "@/_assets/svg/edit-icon-green.svg";
// import NextIcon from "@/_assets/svg/next-iconX.svg";
// import PreviousIcon from "@/_assets/svg/previous-icon.svg";
import RevertIcon from "@/_assets/svg/revert-response-icon.svg";
import SaveIcon from "@/_assets/svg/save-response-white-icon.svg";
import Title from "@/_assets/svg/topic-title.svg";
import Layout from "@/components/Layout/Layout";
import { default as GlobelBtn } from "@/components/button/Button";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  compiledChapter,
  updateChapterResponse,
} from "@/store/slices/chatSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styles from "./Narrative.module.css";
import YourSliderComponent from "./slider";

const NarrativeResponse = () => {
  const [revertModal, setRevertModal] = useState(false);
  const [saveResponseModal, setSaveResponseModal] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { chapterId, openai } = router.query;
  const [chapterTitle, setChapterTitle] = useState("");
  const totalSlides = 2; // Set the total number of slides according to your requirement
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [CurrentSlideCheck, setCurrentSlideCheck] = useState("");
  const [userChapter, setUserChapter] = useState("");
  const [gptChapter, setGptChapter] = useState("");
  const [responseType, setResponseType] = useState(true);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentSlideCheck("next");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlideCheck("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const handleSaveResponse = () => {
    setSaveResponseModal(false);
    dispatch(
      updateChapterResponse({
        id: chapterId,
        userText: userChapter,
        openaiChapterText: gptChapter,
      })
    )
      .unwrap()
      .then(() => {
        setLoading(false);
        router.push("/dashboard/chapters/completedChapter");
      });
  };

  useEffect(() => {
    setLoading(false);
    openai && setResponseType(openai === "false" ? false : true);
  }, [openai]);

  useEffect(() => {
    if (chapterId) {
      dispatch(compiledChapter({ id: chapterId }))
        .unwrap()
        .then((res) => {
          setChapterTitle(res?.chapter?.title);
          setUserChapter(res?.userText);
          setGptChapter(res?.openaiChapterText);
          setLoading(false);
        });
    }
  }, [chapterId]);

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Layout>
          {loading ? (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "55%",
                transform: "translate(-50%, -55%)",
                zIndex: 6,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                position: "relative",
                p: { xs: "15px", sm: "0px" },
              }}
            >
              <Box
                sx={{
                  display: { sm: "flex" },
                  justifyContent: "space-between",
                  height: "100%",
                  mb: { xs: "20px", sm: "0px" },
                }}
                className={styles.nativeMainBg}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      alt="image"
                      src={Title}
                      className={styles.titleIcon}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: { md: "20px", sm: "17px", xs: "14.945px" },
                          display: "block",
                          color: "#171725",
                          fontWeight: 600,
                          // mt: "2px",
                        }}
                      >
                        {chapterTitle}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: { sm: "10px", xs: "5px" },
                    mt: "5px",
                    justifyContent: { sm: "flex-end", xs: "flex-start" },
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <GlobelBtn
                      bgColor="#ffff"
                      btnText={`${t("narrative.editRes")}`}
                      borderRadius="27px"
                      color="#30422E"
                      onClick={() =>
                        router.push(
                          `/events?compileChapterId=${chapterId}&openai=${responseType}`
                        )
                      }
                      image={EditIcon}
                      border="1px solid #30422E"
                      fontSize={{ xs: "12px" }}
                      p="4px 20px"
                    />
                  </Box>

                  <Box>
                    <GlobelBtn
                      bgColor="#30422E"
                      btnText={`${t("narrative.saveRes")}`}
                      borderRadius="27px"
                      color="#fff"
                      onClick={() => setSaveResponseModal(true)}
                      image={SaveIcon}
                      border="1px solid #30422E"
                      fontSize={{ xs: "12px" }}
                      p="4px 20px"
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  maxWidth: "632px",
                  height: "100%",
                  margin: "auto",
                  width: "90%",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <YourSliderComponent
                    currentIndex={currentIndex}
                    totalSlides={totalSlides}
                    handleSlideChange={handleSlideChange}
                    CurrentSlideCheck={CurrentSlideCheck}
                  >
                    <Box
                      sx={{
                        padding: {
                          xl: "45px 60px",
                          sm: "30px 35px",
                          xs: "15px 20px",
                        },
                        bgcolor: "#fff",
                        position: "relative",
                        height: "calc(100vh - 145px)",
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                      }}
                      id="accordian"
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: { sm: "20px", xs: "14px" },
                          fontWeight: 600,
                          color: "#171725",
                          marginBottom: { sm: "35px", xs: "20px" },
                        }}
                      >
                        {chapterTitle}
                      </Typography>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: responseType ? gptChapter : userChapter,
                        }}
                        sx={{
                          fontSize: { sm: "13px", xs: "9.3px" },
                          color: "#696974",
                          marginBottom: "25px",
                          overflowY: "auto",
                          "&::-webkit-scrollbar": { display: "none" },
                        }}
                      />
                    </Box>
                  </YourSliderComponent>
                  {/* <Image
                  alt="icon"
                  src={NextIcon}
                  className={styles.nextIcon}
                  onClick={nextSlide}
                />
                <Image
                  alt="icon"
                  src={PreviousIcon}
                  className={styles.previousIcon}
                  onClick={previousSlide}
                /> */}
                </Box>
                {/* <Box
                sx={{
                  marginTop: "18px",
                  fontSize: "15px",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Page {currentIndex + 1} of {totalSlides}
              </Box> */}
              </Box>
              {openai === "true" && responseType && (
                <Box
                  sx={{ mt: "10px", textAlign: { md: "left", xs: "center" } }}
                >
                  <Typography
                    sx={{
                      fontSize: { xl: "15px", sm: "15.001px", xs: "8.906px" },
                      fontWeight: 300,
                      marginBottom: "8px",
                    }}
                  >
                    {t("narrative.dontLike")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { md: "flex-start", xs: "center" },
                    }}
                  >
                    {/* <Button
                      image={RevertIcon}
                      title="Revert Response"
                      background="#fff"
                      borderRadius="27px"
                      color="#30422E"
                      width="170px"
                      height="30px"
                      fontSize="14px"
                      padding={undefined}
                      onClick={() => {
                        setRevertModal(true);
                      }}
                      border="1px solid #30422E"
                    /> */}
                    <Box>
                      <GlobelBtn
                        bgColor="#fff"
                        btnText={`${t("narrative.RevertRes")}`}
                        borderRadius="27px"
                        color="#30422E"
                        onClick={() => setRevertModal(true)}
                        image={RevertIcon}
                        border="1px solid #30422E"
                        p="4px 20px"
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Layout>
      </Box>

      {/* Revert changes Modal  */}
      <TransitionsDialog
        open={revertModal}
        heading={`${t("narrative.RevertRes")}`}
        description={`${t("narrative.RevertResDes")}`}
        cancel={() => {
          setRevertModal(false);
          setResponseType(false);
          dispatch(
            updateChapterResponse({
              id: chapterId,
              userText: userChapter,
              openaiChapterText: "",
            })
          );
        }}
        proceed={() => setRevertModal(false)}
        proceedText={`${t("narrative.RevertResProcBtn")}`} // Customize the text for the "Yes" button
        cancelText={`${t("narrative.RevertResCancelBtn")}`} // Customize the text for the "No" button
      />

      {/* Save changes Modal  */}
      <TransitionsDialog
        open={saveResponseModal}
        heading={`${t("narrative.saveRes")}`}
        description={`${t("narrative.saveResDes")}`}
        cancel={handleSaveResponse}
        proceed={() => setSaveResponseModal(false)}
        proceedText={`${t("narrative.saveResProcBtn")}`} // Customize the text for the "Yes" button
        cancelText={`${t("narrative.saveResCancelBtn")}`} // Customize the text for the "No" button
      />
    </>
  );
};

export default NarrativeResponse;
