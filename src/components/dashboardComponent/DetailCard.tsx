"use client";

import More from "@/_assets/png/options.png";
import Tick from "@/_assets/svg/checked.svg";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import noData from "../../../public/noData.svg";
import styles from "./HomeSteps.module.css";

const options = ["Delete", "Edit"];

const ITEM_HEIGHT = 48;

interface DetailCardProps {
  chapter?: any;
  deleteFunc?: (data: {
    option: string;
    chapterData: any;
    percentValue: any;
  }) => void; // Define the callback type here
  isChapter?: boolean;
}
export default function DetailCard({
  chapter,
  isChapter,
  deleteFunc,
}: DetailCardProps) {
  console.log("chapterzzzz", chapter);
  const router = useRouter();
  const questions = chapter?.questions;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const percentage = calculateCompletionPercentage(chapter?.questions);
  const handleClickOption = (opt) => {
    deleteFunc({ option: opt, chapterData: chapter, percentValue: percentage });
    setAnchorEl(null);
  };
  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <Card
      className="container-fontfamily"
      sx={{
        borderRadius: "6.5px",
        height: "280px",
      }}
    >
      <div
        style={{ backgroundColor: "#197065", padding: "10px 17px 10px 17px" }}
        className={styles.header}
      >
        <Box sx={{ height: "25px" }}>
          {isChapter && (
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Image alt="options" src={More} />
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
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={() => handleClickOption(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </div>
      <Box
        sx={{ height: "100%", cursor: "pointer" }}
        onClick={() => {
          if (router.asPath === "/dashboard/chapters") {
            deleteFunc({
              option: "details",
              chapterData: chapter,
              percentValue: percentage,
            });
          }
          if (router.asPath === "/dashboard/templates") {
            router.push(
              `/dashboard/templates/templateView?templateId=${chapter?._id}`
            );
          }
          if(router.asPath === "/dashboard/chapters/completedChapter") {
            router.push(
              `/dashboard/narrative?chapterId=${chapter?._id}&openai=${chapter?.narrativeFusion}`
            );
          }
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Typography
            variant="body2"
            color="text "
            fontWeight="600"
            fontSize="19px"
            textAlign="center"
            height="25px"
          >
            {chapter?.title}
          </Typography>
          <Divider
            sx={{
              width: "230px",
              backgroundColor: "#000",
              height: "2px",
              margin: "5px auto 0",
              marginBottom: "10px",
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
            }}
            className={styles.cardContent}
          >
            <Box
              sx={{
                width: "100%",
                height: "120px",
              }}
            >
              {questions?.length > 0 ? (
                questions?.slice(0, 4).map((question: any) => (
                  <Typography
                    key={question._id}
                    display="flex"
                    alignItems="center"
                    columnGap="0px"
                    color="rgba(22, 22, 22, 0.90)"
                    fontSize="13px"
                    // sx={{marginTop:'5px'}}
                  >
                    <Image alt="check" src={Tick} />
                    {question.text.length > 45
                      ? question.text.slice(0, 42) + "..."
                      : question.text}
                  </Typography>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image alt="no Data" src={noData} height={100} />
                </Box>
              )}
            </Box>

            {isChapter && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                  // bgcolor: "pink"
                }}
              >
                <Typography color="rgba(22, 22, 22, 0.90)" fontSize="11px">
                  Last Edited 3 Days Ago
                </Typography>
                <CircularWithValueLabel percentage={percentage} />
              </Box>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

{
  /* // Progress Bar code */
}
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", width: "30px" }}>
      <CircularProgress color="success" variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: -8,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="#197065"
          sx={{ fontSize: "10px" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function CircularWithValueLabel({ percentage }) {
  return <CircularProgressWithLabel value={percentage} />;
}
