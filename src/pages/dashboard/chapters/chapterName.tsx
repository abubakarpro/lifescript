"use client";
import Layout from "@/components/Layout/Layout";
import AddChapterName from "@/components/dashboardComponent/AddChapterName";
import NoQuestions from "@/components/dashboardComponent/NoQuestions";
// import ProgressBar from "@/components/dashboardComponent/ProgressBar";
import ModalImage from "@/_assets/png/view-template-modal.png";
import GlobelBtn from "@/components/button/Button";
import FloatButton from "@/components/button/FloatButton";
import LinearProgressBar from "@/components/dashboardComponent/LinearProgressBar";
import Questions from "@/components/dashboardComponent/Questions";
import Tooltip from "@/components/dashboardComponent/Tooltip";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import AddQuestion from "@/pages/events/addQuestion";
import RichTextViewer from "@/pages/events/response";
import socket from "@/services/socketManager";
import {
  createQuestion,
  getChapterbyId,
  getOpenaiQuestion,
  openaiQuestion,
  selectChapter,
  simpleChapter,
} from "@/store/slices/chatSlice";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Check from "../../../../public/checkIcon.png";
import addIcon from "../../../_assets/svg/AddIcon.svg";
import backArrow from "../../../_assets/svg/left.svg";
import suggestionIcon from "../../../_assets/svg/suggestionsIcon.svg";
import QuestionComponent from "./components/AIGeneration";

const chapterName = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fusionModal, setFusionModal] = useState(false);
  const [gptSocket, setgptSocket] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allQuestionsLoading, setAllQuestionsLoading] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [aiQuestions, setaiQuestions] = useState([]);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [fusionLoading, setFusionLoading] = useState(false);
  const [aiGeneration, setAiGeneration] = useState(false);
  const [emailQuestion, setEmailQuestion] = useState({
    questionTitle: "",
    questionId: "",
  });
  const [narrativeRefuse, setNarrativeRefuse] = useState(false); // narrative
  const question = useSelector(selectChapter);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { chapterId, openAiQuestionId } = router.query;
  const [mailQuestionModal, setMailQuestionModal] = useState(false);
  const [openCustomizationDialog, setOpenCustomizationDialog] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true);
  const [StarterChapter, setStarterChapter] = useState(true);
  const percentage = calculateCompletionPercentage(question?.questions);
  const { t } = useTranslation();

  function isNotOlderThan7DaysFromCurrentDate(timeString: string): boolean {
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    // const sevenDaysInMilliseconds = 20000 * 60;
    const inputDate = new Date(timeString);
    const timeDifference = new Date().getTime() - inputDate.getTime();
    return timeDifference < sevenDaysInMilliseconds;
  }

  //check open ai mail
  useEffect(() => {
    if (openAiQuestionId && chapterId) {
      dispatch(
        getOpenaiQuestion({
          chapterId: chapterId,
          questionId: openAiQuestionId,
        })
      )
        .unwrap()
        .then((res) => {
          setEmailQuestion({
            ...emailQuestion,
            questionTitle: res.title,
            questionId: res.id,
          });
          setMailQuestionModal(true);
        });
    }
  }, [openAiQuestionId]);

  const handleCancel = () => {
    if (areAllCompleted(allQuestions) === true && !fusionLoading) {
      gptSocketCall();
      setOpenCustomizationDialog(false);
    }
  };

  const proceedFusion = () => {
    setOpenCustomizationDialog(false);

    router.push(
      `/dashboard/narrative/loading?chapterId=${chapterId}&openai=${false}`
    );
    dispatch(simpleChapter({ chapterId: chapterId?.toString() }));
  };

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

  const submitQuestion = (question: string) => {
    setAllQuestionsLoading(true);
    dispatch(
      createQuestion({
        text: question,
        status: "Progress",
        chapter: chapterId?.toString(),
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getChapterbyId({ id: chapterId?.toString() }));
        setAllQuestionsLoading(false);
      })
      .catch(() => {
        setAllQuestionsLoading(false);
      });
  };

  function areAllCompleted(questions) {
    return questions.every((question) => question.status === "Completed");
  }

  //gpt through socket
  const gptSocketCall = () => {
    // Join the room when the component mounts
    socket.emit("chatgpt", {
      token: localStorage.getItem("token"),
      chapterId: chapterId?.toString(),
      language: "en",
    });
    setgptSocket(true);
  };

  useEffect(() => {
    chapterId &&
      dispatch(getChapterbyId({ id: chapterId?.toString() }))
        .then(() => {
          setLoading(false);
          setAllQuestionsLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setAllQuestionsLoading(false);
        });
  }, [chapterId, questionChanged]);

  useEffect(() => {
    setAllQuestions(question?.questions);
    setaiQuestions(question?.openAiQuestion);
    setChapterName(question?.title);
  }, [question]);

  const handleFloatButtonClick = () => {
    const isAnyQuestionInProgress = allQuestions?.some(
      (question) => question.status === "Progress"
    );
    if (!isAnyQuestionInProgress) {
      setOpenTooltip(false);
      setOpenCustomizationDialog(true);
    } else {
      setNarrativeRefuse(true);
      setTimeout(() => {
        setNarrativeRefuse(false);
      }, 6000);
    }
  };

  const handleAddQuestion = (questionId) => {
    setAiGeneration(false);
    setMailQuestionModal(false);
    dispatch(
      openaiQuestion({
        chapterId: chapterId?.toString(),
        flag: "true",
        id: questionId,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getChapterbyId({ id: chapterId?.toString() }));
        if (emailQuestion?.questionTitle) {
          setEmailQuestion({ questionTitle: "", questionId: "" });
          router.push(`/dashboard/chapters/chapterName?chapterId=${chapterId}`);
        }
      });
  };

  const handleSkip = (questionId) => {
    dispatch(
      openaiQuestion({
        chapterId: chapterId?.toString(),
        flag: "false",
        id: questionId,
      })
    )
      .unwrap()
      .then(() => {
        if (emailQuestion?.questionTitle) {
          setEmailQuestion({ questionTitle: "", questionId: "" });
          dispatch(getChapterbyId({ id: chapterId?.toString() }));
          router.push(`/dashboard/chapters/chapterName?chapterId=${chapterId}`);
        }
      });
  };
  const handleEndQuestions = (questionId) => {
    setAiGeneration(false);
    dispatch(
      openaiQuestion({
        chapterId: chapterId?.toString(),
        flag: "false",
        id: questionId,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getChapterbyId({ id: chapterId?.toString() }));
      });
  };

  useEffect(() => {
    if (
      question?.introductionChapter === true ||
      question?.startDefaultChapter === true
    ) {
      setStarterChapter(true);
    } else {
      setStarterChapter(false);
    }
  }, [question]);

  return (
    <>
      <Box>
        <Layout>
          <Box
            sx={{
              display: { sm: "block", xs: "none" },
            }}
          >
            <AddChapterName
              title="chapterName"
              chapter={chapterName}
              chapterId={chapterId}
              StarterChapter={StarterChapter}
            />
            <LinearProgressBar percentage={percentage} />
          </Box>
          <Box
            sx={{
              display: { sm: "none", xs: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              onClick={() => {
                router.back();
              }}
              sx={{
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "45.679px",
                height: "45.679px",
                // bgcolor: "#b5b5be66",
                flexShrink: "0",
                border: "1px solid #17645A",
                position: "absolute",
                left: "8px",
                top: "63px",
              }}
            >
              <Image src={backArrow} alt="backArrow" />
            </Box>
            <TextField
              variant="outlined"
              value={chapterName}
              onChange={(e: any) => setChapterName(e.target.value)}
              placeholder="My Adventurous Life"
              disabled={StarterChapter}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box sx={{ cursor: "pointer" }}>
                      <Image
                        // onClick={saveChapterName}
                        src={Check}
                        alt="check-icon"
                      />
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginTop: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                },
                width: { sm: "300px", lg: "390px" },
              }}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: {
                md: "0px 46px 16px 37px",
                sm: "0px 30px 10px 30px",
                xs: "10px 10px 10px",
              },
              marginTop: "10px",
              height: {
                sm: "calc(100vh - 340px)",
                xs: "calc(100vh - 150px)",
              },
              borderRadius: { sm: "18px", xs: "5px" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: { xs: "15px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "rgba(0, 0, 0, 0.87)",
                  display: {
                    sm: "block",
                    xs: "none",
                  },
                }}
              >
                {t("ChName.Questions")}
              </Typography>
              <Box
                sx={{
                  gap: { sm: 4, xs: 2 },
                  display: "flex",
                  justifyContent: { xs: "space-between", sm: "end" },
                  width: "100%",
                  flexWrap: "wrap",
                  pb: "10px",
                }}
              >
                {aiQuestions?.length > 0 && (
                  <GlobelBtn
                    image={suggestionIcon}
                    btnText={`${t("ChName.Suggestion")}`}
                    onClick={() => !StarterChapter && setAiGeneration(true)}
                    // width={"180px"}
                    disabled={StarterChapter}
                  />
                )}
                <Box>
                  <GlobelBtn
                    image={addIcon}
                    btnText={`${t("ChName.AddQuestions")}`}
                    onClick={() => !StarterChapter && setOpenModal(true)}
                    // width={"180px"}
                    disabled={StarterChapter}
                  />
                </Box>
              </Box>
            </Box>

            {loading ? (
              <Box
                sx={{
                  marginTop: "8%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  overflowY: "scroll",
                  flex: "1",
                  "&::-webkit-scrollbar": { display: "none" },
                  pb: "100px",
                }}
              >
                {allQuestionsLoading ? (
                  <Box
                    sx={{
                      marginTop: "8%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box>
                    {allQuestions?.length > 0 ? (
                      allQuestions.map((question, index) => (
                        <Box>
                          <Questions
                            key={question._id}
                            question={question}
                            title="chapterName"
                            number={index + 1}
                            questionChanged={() =>
                              setQuestionChanged(!questionChanged)
                            }
                            answerClick={(text) =>
                              router.push(`/events?questionId=${text}`)
                            }
                            StarterChapter={StarterChapter}
                          />
                        </Box>
                      ))
                    ) : (
                      <NoQuestions />
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Box>
            <FloatButton
              onClick={StarterChapter ? proceedFusion : handleFloatButtonClick}
              narrativeRefuse={narrativeRefuse}
            />
            {/* Refuse Narative  */}

            {narrativeRefuse && (
              <Box
                sx={{
                  display: {
                    md: "block",
                    xs: "none",
                  },
                }}
              >
                <Tooltip
                  title={`${t("ChName.tooltip")}`}
                  text={`${t("ChName.description")}`}
                />
              </Box>
            )}
          </Box>
        </Layout>
      </Box>

      <CustomizationDialog
        open={gptSocket}
        title=""
        handleClose={() => {
          setgptSocket(false);
        }}
        customStyles={{ backgroundColor: "auto" }}
      >
        <Box sx={{ textAlign: "center", p: "20px" }}>
          <Box
            sx={{
              width: { md: "91.562px", sm: "66.54px", xs: "41.709px" },
              height: { md: "60.005px", sm: "43.607px", xs: "27.334px" },
              margin: "auto",
            }}
          >
            <Image
              alt="image"
              src={ModalImage}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: { md: "22px", sm: "21.679px", xs: "15.508px" },
              fontWeight: 700,
              color: "#070707",
              margin: "15px 0",
            }}
          >
            {t("ChName.thankYou")}
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "16.5px", sm: "16.259px", xs: "11.631px" },
              color: "#070707",
              // width: "400px",
            }}
          >
            {t("ChName.TYDescription")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "20px",
            }}
          >
            <GlobelBtn
              btnText={`${t("ChName.ok")}`}
              bgColor="#30422E"
              borderRadius="23px"
              color="#fff"
              border="1px solid #30422E"
              onClick={() => {
                router.push("/dashboard/chapters");
                setgptSocket(false);
              }}
            />
          </Box>
        </Box>
      </CustomizationDialog>

      <TransitionsDialog
        open={openCustomizationDialog}
        heading={`${t("ChName.NF")}`}
        description={`${t("ChName.NFDes")}`}
        cancel={handleCancel}
        proceed={proceedFusion}
        proceedText={`${t("ChName.NFOriginBtn")}`} // Customize the text for the "Yes" button
        cancelText={`${t("ChName.NFuseBtn")}`} // Customize the text for the "No" button
        closeModal={() => setOpenCustomizationDialog(false)}
      />
      <CustomizationDialog
        open={fusionModal}
        title={`${t("ChName.GPTRes")}`}
        handleClose={() => {
          setFusionModal(false);
        }}
        customStyles={{
          backgroundColor: "auto",
          padding: "5px",
          width: { md: "50vw", sm: "60vw", xs: "70vw" },
        }}
      >
        <RichTextViewer htmlContent={gptResponse} />
      </CustomizationDialog>

      {/* Add new Question  */}
      <CustomizationDialog
        open={openModal}
        title=""
        handleClose={() => {
          setOpenModal(false);
        }}
        customStyles={{
          backgroundColor: "auto",
          textAlign: "center",
          color: "#070707",
          fontSize: "30px",
        }}
      >
        <Box
          sx={{
            width: { md: "91.562px", sm: "66.54px", xs: "41.709px" },
            height: { md: "60.005px", sm: "43.607px", xs: "27.334px" },
            margin: "auto",
          }}
        >
          <Image
            alt="image"
            src={ModalImage}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { md: "24px", sm: "22px", xs: "18px" },
            cursor: "pointer",
          }}
        >
          {t("ChName.AddNewQues")}
        </Typography>
        <Box sx={{}}>
          <AddQuestion
            questionData={(question: string) => {
              setOpenModal(false);
              submitQuestion(question);
            }}
            btnText={`${t("ChName.AddQuesBtn")}`}
          />
        </Box>
      </CustomizationDialog>

      <CustomizationDialog
        open={aiGeneration}
        title=""
        handleClose={() => {
          setAiGeneration(false);
          dispatch(getChapterbyId({ id: chapterId?.toString() }));
        }}
        customStyles={{
          backgroundColor: "auto",
          textAlign: "center",
          color: "#070707",
          fontSize: "30px",
        }}
      >
        <Box
          sx={{
            width: { md: "91.562px", sm: "66.54px", xs: "41.709px" },
            height: { md: "60.005px", sm: "43.607px", xs: "27.334px" },
            margin: "auto",
          }}
        >
          <Image
            alt="image"
            src={ModalImage}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <QuestionComponent
          questions={aiQuestions}
          handleNextQuestion={handleSkip}
          Proceed={handleAddQuestion}
          endQuestion={handleEndQuestions}
        />
      </CustomizationDialog>
      <TransitionsDialog
        open={mailQuestionModal}
        heading={`${t("ChName.AIGenQues")}`}
        proceedText={`${t("ChName.AIAddToChBtn")}`}
        cancelText={`${t("ChName.AISkipBtn")}`}
        description={emailQuestion.questionTitle}
        cancel={() => {
          handleSkip(emailQuestion.questionId);
          setMailQuestionModal(false);
        }}
        closeModal={() => {
          handleSkip(emailQuestion.questionId);
          setMailQuestionModal(false);
        }}
        proceed={() => handleAddQuestion(emailQuestion.questionId)}
      />
    </>
  );
};

export default chapterName;
