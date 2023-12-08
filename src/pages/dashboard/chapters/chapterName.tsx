"use client";
import Layout from "@/components/Layout/Layout";
import AddChapterName from "@/components/dashboardComponent/AddChapterName";
import NoQuestions from "@/components/dashboardComponent/NoQuestions";
// import ProgressBar from "@/components/dashboardComponent/ProgressBar";
import ModalImage from "@/_assets/png/view-template-modal.png";
import FloatButton from "@/components/button/FloatButton";
import LinearProgressBar from "@/components/dashboardComponent/LinearProgressBar";
import Questions from "@/components/dashboardComponent/Questions";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import AddQuestion from "@/pages/events/addQuestion";
import RichTextViewer from "@/pages/events/response";
import {
  chapterResponse,
  createQuestion,
  getChapterbyId,
  narrativeFusion,
  selectChapter,
  simpleChapter,
} from "@/store/slices/chatSlice";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import addIcon from "../../../../public/addicon.svg";

const chapterName = () => {
  const [openModal, setOpenModal] = useState(false);
  const [narrativeModal, setNarrativeModal] = useState(false);
  const [fusionModal, setFusionModal] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [fusionLoading, setFusionLoading] = useState(false);
  const [narrativeRefuse, setNarrativeRefuse] = useState(false); // narrative
  const question = useSelector(selectChapter);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { chapterId } = router.query;
  const [openCustomizationDialog, setOpenCustomizationDialog] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true);
  const percentage = calculateCompletionPercentage(question?.questions);

  const handleCancel = () => {
    // Close the customization dialog
    setOpenCustomizationDialog(false);
    router.push(
      `/dashboard/narrative/loading?chapterId=${chapterId}&openai=${true}`
    );
    if (areAllCompleted(allQuestions) === true && !fusionLoading) {
      setFusionLoading(true);
      handleNarrativeFusion();
    }
  };

  const proceedFusion = () => {
    setOpenCustomizationDialog(false);

    router.push(
      `/dashboard/narrative/loading?chapterId=${chapterId}&openai=${false}`
    );
    dispatch(simpleChapter({ chapterId: chapterId.toString() }));
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
    dispatch(
      createQuestion({
        text: question,
        status: "Progress",
        chapter: chapterId.toString(),
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Question added successfully");
        dispatch(getChapterbyId({ id: chapterId.toString() }));
      })
      .catch(() => {
        toast.error("Failed to add question");
      });
  };

  function areAllCompleted(questions) {
    return questions.every((question) => question.status === "Completed");
  }

  useEffect(() => {
    chapterId &&
      dispatch(getChapterbyId({ id: chapterId.toString() }))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
  }, [chapterId, questionChanged]);

  useEffect(() => {
    setAllQuestions(question.questions);
    setChapterName(question.title);
  }, [question]);

  const handleNarrativeFusion = () => {
    dispatch(narrativeFusion({ chapterId: chapterId, language: "en" }))
      .unwrap()
      .then(() => {
        dispatch(chapterResponse({ chapterId: chapterId.toString() }))
          .unwrap()
          .then((res) => {
            setGptResponse(res.join(""));
            setFusionModal(true);
          });
      })
      .catch(() => {
        setFusionLoading(false);
        toast.error("Narrative fusion failed");
      });
  };

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

  return (
    <>
      <Box>
        <Layout>
          <AddChapterName
            title="chapterName"
            chapter={chapterName}
            chapterId={chapterId}
          />
          <LinearProgressBar percentage={percentage} />
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: { sm: "30px 46px 16px 37px", xs: "25px 20px 100px" },
              marginTop: "10px",
              height: "calc(100vh - 340px)",
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
                }}
              >
                Questions
              </Typography>
              <Box
                display={"flex"}
                onClick={() => setOpenModal(true)}
                sx={{ gap: { sm: 2, xs: 1 } }}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <Image src={addIcon} alt="addicon" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      mt: 1,
                      color: "#197065E5",
                      fontSize: "18px",
                      fontWeight: 600,
                      display: { sm: "block", xs: "none" },
                      cursor: "pointer",
                    }}
                  >
                    Add new question
                  </Typography>
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
                }}
              >
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
                      />
                    </Box>
                  ))
                ) : (
                  <NoQuestions />
                )}

                {/* {allQuestions?.length > 0 && areAllCompleted(allQuestions) && (
                <Box
                  onClick={handleNarrativeFusion}
                  sx={{
                    
                    cursor: "pointer",
                    marginTop: 5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={fusionIcon}
                    alt="fusion"
                    width={300}
                    height={70}
                  />
                </Box>
              )} */}
              </Box>
            )}
          </Box>

          <Box>
            <FloatButton
              onClick={handleFloatButtonClick}
              narrativeRefuse={narrativeRefuse}
            />
            {/* Refuse Narative  */}

            {narrativeRefuse && (
              <Box
                sx={{
                  backgroundImage: { sm: 'url("/pointer-msg.png")' },
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: "360px",
                  height: "160px",
                  position: "fixed",
                  bottom: "30px",
                  left: "35%",
                  transform: "translate(-35%)",
                  zIndex: "3",
                  padding: "30px 10px 0 45px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 500,
                    marginBottom: "15px",
                  }}
                >
                  Narrative Fusion
                </Typography>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 300, lineHeight: "150%" }}
                >
                  You cannot use this feature untill all questions are completed
                </Typography>
              </Box>
            )}
          </Box>
        </Layout>
      </Box>

      <TransitionsDialog
        open={openCustomizationDialog}
        heading="Narrative Fusion"
        description="It's a one time chapter usage feature, If you want to keep you real text, proceed with 'Compile original Text"
        cancel={handleCancel}
        proceed={proceedFusion}
        proceedText="Compile Original Text" // Customize the text for the "Yes" button
        cancelText="Use Narrative Fusion" // Customize the text for the "No" button
        closeModal={() => setOpenCustomizationDialog(false)}
      />
      <CustomizationDialog
        open={fusionModal}
        title="GPT Response"
        handleClose={() => {
          setFusionModal(false);
        }}
        customStyles={{
          backgroundColor: "auto",
          padding: "5px",
          maxWidth: "40vw",
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
            cursor: "pointer",
          }}
        >
          <Image src={ModalImage} width={91} height={60} alt="logo" />
        </Box>
        <Typography sx={{ fontSize: "30px", cursor: "pointer" }}>
          Add New Question
        </Typography>
        <Box sx={{}}>
          <AddQuestion
            questionData={(question: string) => {
              setOpenModal(false);
              submitQuestion(question);
            }}
            btnText={"Add Question"}
          />
        </Box>
      </CustomizationDialog>
    </>
  );
};

export default chapterName;