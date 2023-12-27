import ModalImage from "@/_assets/png/view-template-modal.png";
import Layout from "@/components/Layout/Layout";
import { StartNewChapter } from "@/components/dashboardComponent/CreateChapterCard";
import DetailCard from "@/components/dashboardComponent/DetailCard";
import HomeSteps from "@/components/dashboardComponent/HomeSteps";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import bgTree from "../../../_assets/svg/bgTree.svg";
import AddChapter from "./addChapter";

const Dashboard = () => {
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
        (chapter) =>
          chapter.status !== true && chapter.compilingStatus === false
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
          }}
        >
          <Box
            sx={{
              display: { sm: "block", xs: "none" },
            }}
          >
            <HomeSteps />
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
                marginTop: { md: "48px", sm: "20px" },
              }}
            >
              <StartNewChapter addChapterClick={() => setChapterModal(true)} />

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
          ) : allChapters.length < 1 ? (
            <Box
              className={styles.CardsContainer}
              sx={{
                marginTop: "48px",
              }}
            >
              <StartNewChapter addChapterClick={() => setChapterModal(true)} />
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: { sm: "48px", xs: "25px" },
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
        <Box>
          <Image src={ModalImage} width={91} height={60} alt="logo" />
        </Box>
        <Typography sx={{ fontSize: "30px" }}>
          {updateChapterModal ? "Update Chapter Name" : "Add new chapter"}
        </Typography>
        <AddChapter
          chapterData={(chapter: string) => {
            setChapterModal(false);
            submitChapter(chapter);
            setUpdateChapterModal(false);
          }}
          data={chapterTitle}
          btnText={
            updateChapterModal ? "Update Chapter Name" : "Add new chapter"
          }
        />
      </CustomizationDialog>
      <TransitionsDialog
        open={deleteChapter}
        heading="Delete"
        description="Are you sure you want to delete this chapter"
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

export default Dashboard;
