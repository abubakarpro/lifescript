"use client";
import Layout from "@/components/Layout/Layout";
import AddChapterName from "@/components/dashboardComponent/AddChapterName";
import NoQuestions from "@/components/dashboardComponent/NoQuestions";
// import ProgressBar from "@/components/dashboardComponent/ProgressBar";
import Questions from "@/components/dashboardComponent/Questions";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
// import AddQuestion from "@/pages/events/addQuestion";
import ModalImage from "@/_assets/png/view-template-modal.png";
import UseTemplate from "@/_assets/svg/useTemplate.svg";
import Button from "@/components/button/Button";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  cloneTemplate,
  // cloneTemplate,
  getTemplates,
  isTemplateCloned,
  selectTemplates,
} from "@/store/slices/chatSlice";
import { Box, ButtonBase, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const chapterName = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [templateTitle, setTemplateTitle] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [tempQuestionIds, setTempQuestionIds] = useState([]);
  console.log("4446666", tempQuestionIds);
  const [buttonLoading, setButtonLoading] = useState(true);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { templateId } = router.query;
  const allTemplates = useSelector(selectTemplates);
  const [templateState, setTemplateState] = useState(false);
  let templateData;

  const handleChapterClone = () => {
    setButtonLoading(false);
    dispatch(isTemplateCloned({ id: templateId.toString() }))
      .unwrap()
      .then((res) => {
        if (res == "Template is already cloned") {
          setTemplateState(true);
        } else {
          dispatch(
            cloneTemplate({ id: templateId.toString(), ids: tempQuestionIds })
          ).unwrap();
          dispatch(
            cloneTemplate({ id: templateId.toString(), ids: tempQuestionIds })
          )
            .unwrap()
            .then(() => {
              setOpenModal(true);
              setButtonLoading(true);
            })
            .catch(() => {
              setButtonLoading(true);
            });
        }
      })
      .catch(() => {
        setButtonLoading(true);
      });
  };

  const toggleIdInArray = (id) => {
    const index = tempQuestionIds.indexOf(id);

    if (index !== -1) {
      const updatedIds = [...tempQuestionIds];
      updatedIds.splice(index, 1);
      setTempQuestionIds(updatedIds);
    } else {
      setTempQuestionIds([...tempQuestionIds, id]);
    }
  };

  const toggleIdInArray = (id) => {
    const index = tempQuestionIds.indexOf(id);

    if (index !== -1) {
      const updatedIds = [...tempQuestionIds];
      updatedIds.splice(index, 1);
      setTempQuestionIds(updatedIds);
    } else {
      setTempQuestionIds([...tempQuestionIds, id]);
    }
  };

  const handleCopyAgain = () => {
    dispatch(
      cloneTemplate({ id: templateId.toString(), ids: tempQuestionIds })
    );
    dispatch(cloneTemplate({ id: templateId.toString(), ids: tempQuestionIds }))
      .then(() => {
        setOpenModal(true);
        setTemplateState(false);
      })
      .catch(() => {
        setButtonLoading(false);
        setTemplateState(false);
      });
  };

  useEffect(() => {
    templateData = allTemplates.find((template) => template._id === templateId);
    setAllQuestions(templateData?.questions);
    const ids = templateData?.questions?.map((obj) => obj._id);
    setTempQuestionIds(ids);
    const ids = templateData?.questions?.map((obj) => obj._id);
    setTempQuestionIds(ids);
    setTemplateTitle(templateData?.title);
  }, [allTemplates]);

  useEffect(() => {
    dispatch(getTemplates())
      .unwrap()
      .then(() => setLoading(false));
  }, []);

  console.log("tempQuestionIds", tempQuestionIds?.length);

  console.log("tempQuestionIds", tempQuestionIds?.length);

  return (
    <>
      <Layout>
        <AddChapterName
          chapterId={templateData?._id}
          chapter={templateTitle}
          title="templateView"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px auto",
            opacity: tempQuestionIds?.length && buttonLoading ? "1" : "0.6",
          }}
        >
          <Button
            image={UseTemplate}
            title="Use Template"
            background="#197065"
            borderRadius="55px"
            border={0}
            fontSize="20px"
            color="#fff"
            width="220px"
            padding="5px 0px"
            onClick={() => {
              tempQuestionIds?.length && buttonLoading && handleChapterClone();
            }}
            height={undefined}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "35px",
            minHeight: "60vh",
            borderRadius: { sm: "18px", xs: "5px" },
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
            <>
              {allQuestions?.length > 0 ? (
                allQuestions.map((question, index) => (
                  <Questions
                    key={question._id}
                    question={question}
                    number={index + 1}
                    title="templateView"
                    templateQuestion={(id) => toggleIdInArray(id)}
                    templateQuestion={(id) => toggleIdInArray(id)}
                  />
                ))
              ) : (
                <NoQuestions />
              )}
            </>
          )}
        </Box>
      </Layout>

      {/* Use Template Modal   */}
      <CustomizationDialog
        open={openModal}
        title=""
        handleClose={() => {
          setOpenModal(false);
          router.push("/dashboard/chapters");
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
            Template has been added to your chapters
          </Typography>

          <ButtonBase
            onClick={() => {
              router.push("/dashboard/chapters");
              setOpenModal(false);
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
            Start editing
          </ButtonBase>
        </Box>
      </CustomizationDialog>
      <TransitionsDialog
        open={templateState}
        heading="Copy Template"
        description="This template is already copied, want to copy template again?"
        cancel={() => {
          setTemplateState(false);
          setButtonLoading(true);
        }}
        closeModal={() => {
          setTemplateState(false);
          setButtonLoading(true);
        }}
        proceed={handleCopyAgain}
      />
    </>
  );
};

export default chapterName;
