import GlobelBtn from "@/components/button/Button";
import DraggableList from "@/components/dashboardComponent/DraggableList";
import NoQuestions from "@/components/dashboardComponent/NoQuestions";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
import { getChapters, getToc, selectTocData } from "@/store/slices/chatSlice";
import styles from "@/styles/Dashboard.module.css";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import addIcon from "../../../../_assets/svg/AddIcon.svg";
import ChaptersList from "./ChapterList";
import Image from "next/image";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TooltipTab from "@/__webComponents/tooltip/Tooltip";

const TOCMain = () => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const dispatch: any = useDispatch();
  const tocData = useSelector(selectTocData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [listItems, setListItems] = useState<
    Array<{ id: number; name: string; chapterId: string }>
  >([]);
  const [hover, setHover] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getChapters())
      .unwrap()
      .then((res) => {
        const updatedListItems = res
          .filter((chapter) => chapter.startDefaultChapter === false && chapter.status === true)
          .map((chapter, index) => ({
            id: index + 1,
            title: chapter.title,
            chapterId: chapter._id,
          }));
        setListItems(updatedListItems);
      });
  }, []);

  useEffect(() => {
    dispatch(getToc());
  }, []);

  useEffect(() => {
    tocData && setSelectedItems(tocData?.tableOfContent);
  }, [tocData]);

  return (
    <div>
      <Box className={styles.subContainer}>
        {" "}
        <Box
          sx={{
            backgroundColor: "#fff",
            marginTop: "10px",
            height: { sm: "calc(100vh - 280px)", xs: "calc(100vh - 160px)" },
            borderRadius: {
              sm: "18px",
              xs: "5px",
            },
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
                fontSize: "23px",
                fontWeight: 700,
                color: "#30422E",
                mt: "40px",
                display: {
                  sm: "block",
                  xs: "none",
                },
              }}
            >
              {t("TOC.ch")}
            </Typography>
            <Box
              sx={{
                gap: { sm: 2, xs: 2 },
                display: "flex",
                justifyContent: { xs: "space-between", sm: "end" },
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                pb: "10px",
                position: "relative"
              }}
            >
              <Box >
                <Box
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                // sx={{ display: 'inline-block' }} 
                >
                  <InfoOutlinedIcon sx={{color:"#7F886B"}}/>
                </Box>

                {hover && (
                  <Box
                    sx={{
                      display: {
                        md: "block",
                        xs: "block",
                      },
                      // position: "absolute", 
                      // mt: 1 
                    }}
                  >
                    <TooltipTab
                      title={t("TOC.suggestionBox.title")}
                      text={t("TOC.suggestionBox.text")}
                      transform="none"
                      top={undefined} left={undefined} bottom={undefined} right={undefined} position={"absolute"} />
                  </Box>
                )}
              </Box>
              <Box>
                {currentUrl === "/dashboard/BookView" ? (
                  <GlobelBtn
                    btnText={`${t("TOC.editChBtn")}`}
                    image={addIcon}
                    onClick={() => {
                      currentUrl === "/dashboard/BookView" &&
                        router.push("/dashboard/TableOfContent");
                    }}
                  />
                ) : (
                  <GlobelBtn
                    image={addIcon}
                    btnText={`${t("TOC.addChBtn")}`}
                    onClick={() => setOpenModal(true)}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "11px",
              height: { sm: "80%", xs: "100%" },
              overflowY: "auto", bgcolor: "#F3ECDA",
              mt: "20px",
              borderRadius: "4px",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {selectedItems?.length > 0 ? (
              <Box sx={{ p: { sm: "25px 40px", xs: "15px 20px" }, }}>
                <DraggableList data={selectedItems} />
              </Box>
            ) : (
              <Box
                sx={{
                  backgroundColor: "#fff",
                  height: "calc(100vh - 357px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoQuestions />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <CustomizationDialog
        open={openModal}
        marginTop={13}
        title=""
        handleClose={() => {
          setOpenModal(false);
        }}
        customStyles={{
          backgroundColor: "#F3ECDA",
          width: "80vw",
          height: "90vh",
          
          padding: { md: "20px 48px" },
        }}
      >
        <ChaptersList
          listItems={listItems}
          selectedItems={selectedItems}
          handleItemClick={() => setOpenModal(false)}
        />
      </CustomizationDialog>
    </div>
  );
};

export default TOCMain;
