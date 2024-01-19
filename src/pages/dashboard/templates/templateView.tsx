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
import { default as GlobelBtn } from "@/components/button/Button";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  cloneTemplate,
  // cloneTemplate,
  getTemplates,
  isTemplateCloned,
  selectTemplates,
} from "@/store/slices/chatSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import backArrow from "../../../_assets/svg/left.svg";
import Loading from "./components/loading";
const chapterName = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copyTemLoading, setCopyTemLoading] = useState(true);
  const [templateTitle, setTemplateTitle] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [tempQuestionIds, setTempQuestionIds] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(true);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { templateId } = router.query;
  const allTemplates = useSelector(selectTemplates);
  const [templateState, setTemplateState] = useState(false);
  const [isLoaded, setIsloaded] = useState(true);
  const { t } = useTranslation();
  let templateData;

  const handleChapterClone = () => {
    setButtonLoading(false);
    setCopyTemLoading(true);

    dispatch(isTemplateCloned({ id: templateId.toString() }))
      .unwrap()
      .then((res) => {
        if (res == "Template is already cloned") {
          setTemplateState(true);
          setIsloaded(true);
          setCopyTemLoading(false);
        } else {
          dispatch(
            cloneTemplate({ id: templateId.toString(), ids: tempQuestionIds })
          )
            .unwrap()
            .then(() => {
              setCopyTemLoading(false);
              setOpenModal(true);
              setButtonLoading(true);
              setIsloaded(false);
            })
            .catch(() => {
              setButtonLoading(true);
              setCopyTemLoading(false);
              setCopyTemLoading(false);
              setIsloaded(false);
            });
        }
      })
      .catch(() => {
        setCopyTemLoading(false);
        setIsloaded(false);
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

  const handleCopyAgain = () => {
    setTemplateState(false);
    dispatch(cloneTemplate({ id: templateId.toString(), ids: tempQuestionIds }))
      .then(() => {
        setCopyTemLoading(false);
        setOpenModal(true);
        setTemplateState(false);
        setIsloaded(false);
      })
      .catch(() => {
        setCopyTemLoading(false);
        setButtonLoading(false);
        setTemplateState(false);
        setIsloaded(false);
      });
  };

  useEffect(() => {
    templateData = allTemplates.find((template) => template._id === templateId);
    setAllQuestions(templateData?.questions);
    const ids = templateData?.questions?.map((obj) => obj._id);
    setTempQuestionIds(ids);
    setTemplateTitle(templateData?.title);
  }, [allTemplates]);

  useEffect(() => {
    dispatch(getTemplates())
      .unwrap()
      .then(() => {
        setLoading(false);
        setCopyTemLoading(false);
        setIsloaded(false);
      });
  }, []);

  return (
    <>
      <Layout>
        <Box
          sx={{
            display: { sm: "block", xs: "none" },
          }}
        >
          <AddChapterName
            chapterId={templateData?._id}
            chapter={templateTitle}
            title="templateView"
          />
        </Box>

        {copyTemLoading ? (
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
        ) : isLoaded ? (
          <Loading isLoaded={isLoaded} progressCheck={openModal} />
        ) : (
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: {
                md: "5px 46px 16px 37px",
                sm: "5px 30px 10px 30px",
                xs: "10px 10px 100px",
              },
              minHeight: { md: "60vh", xs: "calc(100vh - 175px)" },
              borderRadius: { sm: "18px", xs: "5px" },
              marginTop: { xs: "15px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                mt: { sm: "10px", xs: "0px" },
                opacity: tempQuestionIds?.length && buttonLoading ? "1" : "0.6",
              }}
            >
              <Box
                onClick={() => {
                  router.back();
                }}
                sx={{
                  borderRadius: "50%",
                  display: { xs: "flex", sm: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45.679px",
                  height: "45.679px",
                  flexShrink: "0",
                  border: "1px solid #17645A",
                }}
              >
                <Image src={backArrow} alt="backArrow" />
              </Box>
              <Typography
                sx={{
                  fontSize: { md: "19.379px", sm: "18.501px" },
                  fontWeight: 700,
                  color: "rgba(0, 0, 0, 0.87)",
                  display: { sm: "block", xs: "none" },
                }}
              >
                {t("template.temp")}
              </Typography>
              <Box>
                <GlobelBtn
                  image={UseTemplate}
                  btnText={`${t("template.useTemBtn")}`}
                  onClick={() => {
                    tempQuestionIds?.length &&
                      buttonLoading &&
                      handleChapterClone();
                  }}
                  width={"220px"}
                />
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
              // <Loading isLoaded={isLoaded} />
              <>
                {allQuestions?.length > 0 ? (
                  allQuestions.map((question, index) => (
                    <Questions
                      key={question._id}
                      question={question}
                      number={index + 1}
                      title="templateView"
                      templateQuestion={(id) => toggleIdInArray(id)}
                    />
                  ))
                ) : (
                  <NoQuestions />
                )}
              </>
            )}
          </Box>
        )}
      </Layout>

      {/* Use Template Modal   */}
      <CustomizationDialog
        open={openModal}
        title=""
        handleClose={() => {
          setOpenModal(false);
          router.push("/dashboard/chapters");
        }}
        customStyles={{ backgroundColor: "auto", borderRadius: "22px" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: { md: "91.555px", sm: "66.161px", xs: "47px" },
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
              margin: { md: "25px 0", sm: "15px 0px", xs: "5px" },
            }}
          >
            {t("template.temModal.thankYou")}
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "16.5px", sm: "16.259px", xs: "11.631px" },
              color: "#070707",
              width: { md: "400px", sm: "300px", xs: "180px" },
              margin: { md: "0 120px", sm: "0px 55px", xs: "0px" },
            }}
          >
            {t("template.temModal.TYDescription")}
          </Typography>
          <Box
            sx={{
              margin: { md: "40px 0 30px", sm: "22px 0", xs: "16px 0" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GlobelBtn
              btnText={`${t("template.temModal.SEBtn")}`}
              bgColor="#30422E"
              color="white"
              onClick={() => {
                router.push("/dashboard/chapters");
                setOpenModal(false);
              }}
              width={{ md: "234px", sm: "153px", xs: "103px" }}
            />
          </Box>
        </Box>
      </CustomizationDialog>
      <TransitionsDialog
        open={templateState}
        heading={`${t("template.temModal.copyTem")}`}
        description={`${t("template.temModal.copyTemDes")}`}
        cancel={() => {
          setTemplateState(false);
          setButtonLoading(true);
          setCopyTemLoading(false);
        }}
        closeModal={() => {
          setTemplateState(false);
          setButtonLoading(true);
          setCopyTemLoading(false);
        }}
        proceed={handleCopyAgain}
      />
    </>
  );
};

export default chapterName;
