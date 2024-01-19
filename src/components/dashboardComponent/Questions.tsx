"use client";
import Option from "@/_assets/png/X-menu.png";
import ModalImage from "@/_assets/png/view-template-modal.png";
import Completed from "@/_assets/svg/completed-icon.svg";
import EditGreen from "@/_assets/svg/edit-icon-green.svg";
import AddQuestion from "@/pages/events/addQuestion";
import { deleteQuestion, updateQuestion } from "@/store/slices/chatSlice";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CustomizationDialog from "../modal/CustomizationDialog";
import TransitionsDialog from "../modal/TransitionDialog";

const ITEM_HEIGHT = 48;

interface QuestionsProps {
  question?: any;
  number?: number;
  answerClick?: (chapterName: string) => void; // Define the callback type here
  templateQuestion?: (id: string) => void;
  questionChanged?: () => void;
  title?: string;
  StarterChapter?: boolean;
}

export default function Questions({
  question,
  number,
  title,
  templateQuestion,
  questionChanged,
  answerClick,
  StarterChapter,
}: QuestionsProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [updateQuestionModal, setUpdateQuestionModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);
  const dispatch: any = useDispatch();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOption = (option) => {
    if (option === `${t("ChName.Del")}`) {
      setDeleteQuestionModal(true);
      setAnchorEl(null);
    } else if (option === `${t("ChName.edit")}`) {
      setUpdateQuestionModal(true);
      setAnchorEl(null);
    } else {
      setAnchorEl(null);
    }
  };
  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion({ id: questionId }))
      .unwrap()
      .then(() => {
        toast.success("Question deleted successfully");
        // dispatch(getChapters());
        questionChanged();
      });
    setDeleteQuestionModal(false);
  };

  const handleUpdateQuestion = (text) => {
    dispatch(
      updateQuestion({
        text: text,
        id: question?._id,
        chapter: question?.chapter,
        status: "Progress",
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Question updated successfully");
        // dispatch(getChapters());
        questionChanged();
      })
      .catch(() => toast.error("Failed to update question"));
  };

  const handleSeeMoreClick = (event) => {
    event.preventDefault(); // Prevent default behavior (navigation)
    event.stopPropagation();
    // Expand the text
    setExpanded(!expanded);
  };

  const options = [`${t("ChName.Del")}`, `${t("ChName.edit")}`];

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          mb: { sm: "15px", xs: "8px" },
          bgcolor: title == "templateView" && "#F9F9F9",
          borderRadius: title == "templateView" && "8px",
        }}
      >
        <Box
          onClick={() => {
            if (title !== "templateView") {
              answerClick(question?._id);
            }
          }}
          sx={{
            cursor: "pointer",
            bgcolor: "#F9F9F9",
            borderRadius: "8px",
            borderLeft: "11px solid #30422E",
            height: expanded ? "auto" : { sm: "50px", xs: "50px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                marginLeft: { sm: "15px", xs: "10px" },
                color: "rgba(22, 22, 22, 0.90)",
                fontSize: { sm: "22px", xs: "15px" },
                fontWeight: 400,
                width: { xs: "48vw", sm: "55vw", md: "52vw", lg: "64vw" },
                textOverflow: expanded ? "clip" : "ellipsis",
                overflow: "hidden",
                // whiteSpace: expanded ? "wrap" : "nowrap",
                padding: expanded && "10px 0px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(22, 22, 22, 0.90)",
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "100vw",
                  textOverflow: expanded ? "clip" : "ellipsis",
                  overflow: "hidden",
                  whiteSpace: expanded ? "wrap" : "nowrap",
                  padding: expanded && "10px 0px",
                }}
              >
                {number}
                {". "}
                {question?.text}
              </Typography>
              {question?.text.length > 125 && (
                <Typography
                  onClick={handleSeeMoreClick}
                  sx={{
                    fontSize: "10px",
                    color: "#30422E",
                    width: "80px",
                    mt: "5px",
                  }}
                >
                  {expanded ? "Less" : "See All"}
                </Typography>
              )}
            </Typography>
          </Box>

          {title != "templateView" && (
            <Box sx={{ textAlign: "center", width: "max-content" }}>
              <Button
                // variant="contained"
                // disabled={question?.status === "Completed"}
                type="submit"
                sx={{
                  borderRadius: " 0px 8px 8px 0px",
                  backgroundColor: "#white",
                  color: "rgba(255, 255, 255, 0.90)",
                  height: { sm: "50px", xs: "50px" },
                  p: "0px",
                  "&:hover": {
                    backgroundColor: "#white",
                  },
                  width: "90px",
                }}
              >
                {question.status === "Completed" && (
                  <Box
                    sx={{
                      flexDirection: "column",
                      rowGap: "5px",
                      color: "#30422E",
                      height: "100%",
                      fontSize: "10px",
                      px: "16px",
                      py: "7px",
                    }}
                  >
                    <Box>
                      <Image alt="icon" src={Completed} />
                    </Box>
                    <Box>{t("ChName.completed")}</Box>
                  </Box>
                )}
                {question.status !== "Completed" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      color: "#30422E",
                      fontSize: "10px",
                      px: "16px",
                      py: "7px",
                    }}
                  >
                    <Image alt="icon" src={EditGreen} /> {t("ChName.edit")}
                  </Box>
                )}
              </Button>
            </Box>
          )}
        </Box>

        {/* More option :start */}
        {title != "templateView" ? (
          <>
            {!StarterChapter && (
              <Box>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Image alt="options" src={Option} />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "10ch",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === "Pyxis"}
                      onClick={() => {
                        setQuestionId(question?._id);
                        handleClickOption(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              mr: { md: "20px", sm: "15px", xs: "10px" },
            }}
          >
            <Checkbox
              defaultChecked={true}
              onChange={() => templateQuestion(question?._id)}
            />
          </Box>
        )}
      </Box>

      <CustomizationDialog
        open={updateQuestionModal}
        title=""
        handleClose={() => {
          setUpdateQuestionModal(false);
        }}
        customStyles={{ backgroundColor: "auto", textAlign: "center" }}
      >
        <Box>
          <Image src={ModalImage} width={91} height={60} alt="logo" />
        </Box>
        <Typography sx={{ fontSize: { md: "24px", sm: "22px", xs: "18px" } }}>
          {t("ChName.UQ")}
        </Typography>
        <AddQuestion
          questionData={(question: string) => {
            handleUpdateQuestion(question);
            setUpdateQuestionModal(false);
          }}
          questionText={question?.text}
          btnText={`${t("ChName.UQ")}`}
        />
      </CustomizationDialog>
      <TransitionsDialog
        open={deleteQuestionModal}
        heading={`${t("ChName.DelText")}`}
        description={`${t("ChName.DelDescri")}`}
        cancel={() => setDeleteQuestionModal(false)}
        proceed={handleDeleteQuestion}
        closeModal={() => setDeleteQuestionModal(false)}
      />
    </Box>
  );
}
