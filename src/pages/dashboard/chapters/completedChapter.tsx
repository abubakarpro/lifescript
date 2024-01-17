import ModalImage from "@/_assets/png/view-template-modal.png";
import Layout from "@/components/Layout/Layout";
import CompletedChapterHeader from "@/components/dashboardComponent/CompletedChapterHeader";
import DetailCard from "@/components/dashboardComponent/DetailCard";
import NoChapters from "@/components/dashboardComponent/noChapter";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  createChapter,
  deleteSelectedChapter,
  getChapters,
  selectAllChapters,
  updateChapter,
} from "@/store/slices/chatSlice";
import styles from "@/styles/Dashboard.module.css";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import bgTree from "../../../_assets/svg/bgTree.svg";
import AddChapter from "./addChapter";

const CompletedChapters = () => {
  const [chapterModal, setChapterModal] = useState(false);
  const [updateChapterModal, setUpdateChapterModal] = useState(false);
  const [allChapters, setAllChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteChapter, setDeleteChapter] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const dispatch: any = useDispatch();
  const chapters = useSelector(selectAllChapters);
  const router = useRouter();
  const { t } = useTranslation();

  const handleDeleteChapter = () => {
    dispatch(deleteSelectedChapter({ id: selectedChapterId }))
      .unwrap()
      .then(() => {
        toast.success("Chapter deleted successfully");
        setDeleteChapter(false);
        dispatch(getChapters());
      })
      .catch(() => {
        toast.error("Failed to delete chapter");
        setDeleteChapter(false);
      });
  };

  const submitChapter = (chapter: string) => {
    const actionToDispatch = !updateChapterModal
      ? createChapter({ title: chapter })
      : updateChapter({ id: selectedChapterId, title: chapter });

    dispatch(actionToDispatch)
      .unwrap()
      .then(() => {
        const toastMessage = !updateChapterModal
          ? "Chapter created successfully"
          : "Chapter updated successfully";

        toast.success(toastMessage);
        dispatch(getChapters());
      })
      .catch(() => {
        const toastMessage = !updateChapterModal
          ? "Failed to add chapter"
          : "Failed to update chapter";

        toast.error(toastMessage);
      });
  };

  const handleCardClick = (data: {
    option: string;
    chapterData: any;
    percentValue: any;
  }) => {
    if (data?.option === "Delete") {
      setDeleteChapter(true);
      setSelectedChapterId(data?.chapterData?._id);
    } else if (data?.option === "Edit") {
      setChapterTitle(data?.chapterData?.title);
      setSelectedChapterId(data?.chapterData?._id);
      setUpdateChapterModal(true);
    } else {
      router.push(
        `/dashboard/chapters/chapterName?chapterId=${data?.chapterData?._id}`
      );
    }
  };

  useEffect(() => {
    dispatch(getChapters())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (chapters) {
      const inProgressChapters = chapters.filter(
        (chapter) => chapter.status === true
      );
      setAllChapters(inProgressChapters);
    }
  }, [chapters]);

  return (
    <>
      <Layout>
        <Box
          sx={{
            position: "relative",
            zIndex: "2",
            p: { md: "0px", xs: "10px 30px" },
          }}
        >
          <Box
            sx={{
              display: { sm: "block", xs: "none" },
            }}
          >
            <CompletedChapterHeader />
          </Box>

          {loading ? (
            <Box
              sx={{
                marginTop: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : allChapters?.length > 0 ? (
            <Box
              className={styles.CardsContainer}
              sx={{
                marginTop: { sm: "18px" },
              }}
            >
              {/* <StartNewChapter addChapterClick={() => setChapterModal(true)} /> */}
              {allChapters.map((chapter, index) => (
                <DetailCard
                  key={index}
                  chapter={chapter}
                  isChapter={true}
                  deleteFunc={(data) => {
                    handleCardClick(data);
                  }}
                />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: { xs: "18px" },
                p: { md: "0px", xs: "0px 10px" },
              }}
            >
              <NoChapters />
            </Box>
          )}
        </Box>
      </Layout>

      <CustomizationDialog
        open={chapterModal || updateChapterModal}
        title={""}
        handleClose={() => {
          setChapterModal(false);
          setUpdateChapterModal(false);
        }}
        customStyles={{ backgroundColor: "auto", textAlign: "center" }}
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
          sx={{ fontSize: { md: "22px", sm: "21.679px", xs: "15.508px" } }}
        >
          {updateChapterModal
            ? `${t("ChModals.updateChName")}`
            : `${t("ChModals.addNewCh")}`}
        </Typography>
        <AddChapter
          chapterData={(chapter: string) => {
            setChapterModal(false);
            submitChapter(chapter);
            setUpdateChapterModal(false);
          }}
          data={chapterTitle}
          btnText={
            updateChapterModal
              ? `${t("ChModals.updateChName")}`
              : `${t("ChModals.addNewCh")}`
          }
        />
      </CustomizationDialog>
      <TransitionsDialog
        open={deleteChapter}
        heading={`${t("ChModals.Del")}`}
        description={`${t("ChModals.DelDescri")}`}
        cancel={() => setDeleteChapter(false)}
        proceed={handleDeleteChapter}
        closeModal={() => setDeleteChapter(false)}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: "1",
        }}
      >
        <Image src={bgTree} alt="bgTree" />
      </Box>
    </>
  );
};

export default CompletedChapters;
