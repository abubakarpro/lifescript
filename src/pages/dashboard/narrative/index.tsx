import EditIcon from "@/_assets/svg/edit-icon-green.svg";
// import NextIcon from "@/_assets/svg/next-iconX.svg";
// import PreviousIcon from "@/_assets/svg/previous-icon.svg";
// import NextIcon from "@/_assets/svg/next-iconX.svg";
// import PreviousIcon from "@/_assets/svg/previous-icon.svg";
import RevertIcon from "@/_assets/svg/revert-response-icon.svg";
import SaveIcon from "@/_assets/svg/save-response-white-icon.svg";
import Title from "@/_assets/svg/topic-title.svg";
import Layout from "@/components/Layout/Layout";
import Button from "@/components/button/Button";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  compiledChapter,
  updateChapterResponse,
} from "@/store/slices/chatSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
        router.push("/dashboard/chapters");
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
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
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
            <Box position="relative">
              <Box
                sx={{
                  marginTop: "5px",
                  display: { sm: "flex" },
                  // columnGap: { xl: "100px", lg: "40px" },
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
                    // alignContent: "space-between",
                    // width: "33%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "start" }}>
                    <Image
                      alt="image"
                      src={Title}
                      className={styles.titleIcon}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: { xl: "20px", sm: "17px" },
                          display: "block",
                          color: "#171725",
                          fontWeight: 600,
                          mt: "2px",
                        }}
                      >
                        {chapterTitle}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#696974",
                          fontWeight: 300,
                          textDecoration: "underline",
                        }}
                      >
                        view only
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "10px",
                    mt: "5px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    image={EditIcon}
                    title="Edit Response"
                    background="#fff"
                    borderRadius="27px"
                    color="#197065"
                    height="27px"
                    width="150px"
                    fontSize="14px"
                    padding="9px 10px"
                    onClick={() =>
                      router.push(
                        `/events?compileChapterId=${chapterId}&openai=${responseType}`
                      )
                    }
                    border="1px solid #197065"
                  />
                  <Button
                    image={SaveIcon}
                    title="Save Response"
                    background="#197065"
                    borderRadius="27px"
                    color="#fff"
                    height="27px"
                    width="150px"
                    fontSize="14px"
                    padding="9px 10px"
                    onClick={() => setSaveResponseModal(true)}
                    border="none"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  maxWidth: "450px",
                  height: "100%",
                  margin: "auto",
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
                        padding: { xl: "45px 60px", sm: "40px 45px" },
                        bgcolor: "#fff",
                        position: "relative",
                        height: "75vh",
                      }}
                      id="accordian"
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#171725",
                          marginBottom: "35px",
                        }}
                      >
                        {chapterTitle}
                      </Typography>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: responseType ? gptChapter : userChapter,
                        }}
                        sx={{
                          fontSize: "13px",
                          color: "#696974",
                          marginBottom: "25px",
                          lineHeight: "22px",
                          height: "55vh",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "10px",
                    mt: "5px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    image={EditIcon}
                    title="Edit Response"
                    background="#fff"
                    borderRadius="27px"
                    color="#197065"
                    height="27px"
                    width="150px"
                    fontSize="14px"
                    padding="9px 10px"
                    onClick={() =>
                      router.push(
                        `/events?compileChapterId=${chapterId}&openai=${responseType}`
                      )
                    }
                    border="1px solid #197065"
                  />
                  <Button
                    image={SaveIcon}
                    title="Save Response"
                    background="#197065"
                    borderRadius="27px"
                    color="#fff"
                    height="27px"
                    width="150px"
                    fontSize="14px"
                    padding="9px 10px"
                    onClick={() => setSaveResponseModal(true)}
                    border="none"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  maxWidth: "450px",
                  height: "100%",
                  margin: "auto",
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
                        padding: { xl: "45px 60px", sm: "40px 45px" },
                        bgcolor: "#fff",
                        position: "relative",
                        height: "75vh",
                      }}
                      id="accordian"
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#171725",
                          marginBottom: "35px",
                        }}
                      >
                        {chapterTitle}
                      </Typography>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: responseType ? gptChapter : userChapter,
                        }}
                        sx={{
                          fontSize: "13px",
                          color: "#696974",
                          marginBottom: "25px",
                          lineHeight: "22px",
                          height: "55vh",
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
                  sx={{
                    marginTop: "auto",
                    position: "absolute",
                    left: "0px",
                    bottom: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xl: "15px", sm: "13px" },
                      fontWeight: 300,
                      marginBottom: "8px",
                    }}
                  >
                    Doesn’t like the narrative fusion response?
                  </Typography>
                  <Button
                    image={RevertIcon}
                    title="Revert Response"
                    background="#fff"
                    borderRadius="27px"
                    color="#197065"
                    width="170px"
                    height="30px"
                    fontSize="14px"
                    padding={undefined}
                    onClick={() => {
                      setRevertModal(true);
                    }}
                    border="1px solid #197065"
                  />
                </Box>
              )}
              {openai === "true" && responseType && (
                <Box
                  sx={{
                    marginTop: "auto",
                    position: "absolute",
                    left: "0px",
                    bottom: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xl: "15px", sm: "13px" },
                      fontWeight: 300,
                      marginBottom: "8px",
                    }}
                  >
                    Doesn’t like the narrative fusion response?
                  </Typography>
                  <Button
                    image={RevertIcon}
                    title="Revert Response"
                    background="#fff"
                    borderRadius="27px"
                    color="#197065"
                    width="170px"
                    height="30px"
                    fontSize="14px"
                    padding={undefined}
                    onClick={() => {
                      setRevertModal(true);
                    }}
                    border="1px solid #197065"
                  />
                </Box>
              )}
            </Box>
          )}
        </Layout>
      </Box>

      {/* Revert changes Modal  */}
      <TransitionsDialog
        open={revertModal}
        heading="Revert Response"
        description="This will undo all narrative fusion changes. You will be redirected to the original content compiled chapter for editing."
        cancel={() => {
          setRevertModal(false);
          setResponseType(false);
        }}
        proceed={() => setRevertModal(false)}
        cancel={() => {
          setRevertModal(false);
          setResponseType(false);
        }}
        proceed={() => setRevertModal(false)}
        proceedText="Not Yet" // Customize the text for the "Yes" button
        cancelText="Revert Changes" // Customize the text for the "No" button
      />

      {/* Save changes Modal  */}
      <TransitionsDialog
        open={saveResponseModal}
        heading="Save Response"
        description="Once saved, you will find the chapter in completed chapters tab."
        cancel={handleSaveResponse}
        proceed={() => setSaveResponseModal(false)}
        cancel={handleSaveResponse}
        proceed={() => setSaveResponseModal(false)}
        proceedText="Not Yet" // Customize the text for the "Yes" button
        cancelText="Keep Changes" // Customize the text for the "No" button
      />
    </>
  );
};

export default NarrativeResponse;
