"use client";
import Layout from "@/components/Layout/Layout";
import AddChapterName from "@/components/dashboardComponent/AddChapterName";
import NoQuestions from "@/components/dashboardComponent/NoQuestions";
// import ProgressBar from "@/components/dashboardComponent/ProgressBar";
import ModalImage from "@/_assets/png/view-template-modal.png";
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
  selectChapter,
  simpleChapter,
} from "@/store/slices/chatSlice";
import { Box, ButtonBase, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import addIcon from "../../../../public/addicon.svg";

const chapterName = () => {
  const [openModal, setOpenModal] = useState(false);
  const [fusionModal, setFusionModal] = useState(false);
  const [gptSocket, setgptSocket] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [fusionLoading, setFusionLoading] = useState(false);
  const [buyPremium, setBuyPremium] = useState(false);
  const [narrativeRefuse, setNarrativeRefuse] = useState(false); // narrative
  const question = useSelector(selectChapter);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { chapterId } = router.query;
  const [openCustomizationDialog, setOpenCustomizationDialog] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true);
  const percentage = calculateCompletionPercentage(question?.questions);

  const handleCancel = () => {
    if (buyPremium) {
      router.push("/dashboard/SubscribePlans");
      setOpenCustomizationDialog(false);
    } else {
      if (areAllCompleted(allQuestions) === true && !fusionLoading) {
        const jwt = require("jsonwebtoken");
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        const accessRole = decodedToken.accessRole;

        console.log("accessTokenRole:", accessRole);
        if (accessRole === "PremiumPlan" || accessRole === "GoldPlan") {
          gptSocketCall();
          setOpenCustomizationDialog(false);
        } else {
          setBuyPremium(true);
        }
      }
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

  //gpt through socket
  const gptSocketCall = () => {
    // Join the room when the component mounts
    socket.emit("chatgpt", {
      token: localStorage.getItem("token"),
      chapterId: chapterId.toString(),
      language: "en",
    });
    setgptSocket(true);
  };

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

  // const handleNarrativeFusion = () => {
  //   dispatch(narrativeFusion({ chapterId: chapterId, language: "en" }))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(chapterResponse({ chapterId: chapterId.toString() }))
  //         .unwrap()
  //         .then((res) => {
  //           setGptResponse(res.join(""));
  //           setFusionModal(true);
  //         });
  //     })
  //     .catch(() => {
  //       setFusionLoading(false);
  //       toast.error("Narrative fusion failed");
  //     });
  // };

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
              <Tooltip
                title="Narrative Fusion"
                text="You cannot use this feature untill all questions are completed"
              />
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
        <Box sx={{ textAlign: "center" }}>
          <Image alt="image" src={ModalImage} />
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: 700,
              color: "#070707",
              margin: "40px 0",
            }}
          >
            Thank You!
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              color: "#070707",
              width: "400px",
              margin: "0 120px",
            }}
          >
            Your chapter is being written. You will get it shortly
          </Typography>

          <ButtonBase
            onClick={() => {
              router.push("/dashboard/chapters");
              setgptSocket(false);
            }}
            sx={{
              width: "200px",
              height: "50px",
              borderRadius: "78px",
              color: "#fff",
              fontSize: "22px",
              bgcolor: "#197065",
              margin: "40px 0 30px",
              "&:hover": {
                color: "#fff",
                bgcolor: "#197065",
              },
            }}
          >
            Okay
          </ButtonBase>
        </Box>
      </CustomizationDialog>

      <TransitionsDialog
        open={openCustomizationDialog}
        heading="Narrative Fusion"
        description={buyPremium ? "This feature is only for Premium and Standard users":"It's a one time chapter usage feature, If you want to keep you real text, proceed with 'Compile original Text"}
        cancel={handleCancel}
        proceed={proceedFusion}
        proceedText="Compile Original Text" // Customize the text for the "Yes" button
        cancelText={buyPremium ? "Buy Premium" : "Use Narrative Fusion"} // Customize the text for the "No" button
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
