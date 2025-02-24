"use client";

import Tick from "@/_assets/svg/checked.svg";
import More from "@/_assets/svg/threeDot.svg";
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
import { useTranslation } from "react-i18next";
import noData from "../../../public/noData.svg";
import styles from "./HomeSteps.module.css";

const ITEM_HEIGHT = 48;

interface DetailCardProps {
  chapter?: any;
  deleteFunc?: (data: {
    option: string;
    chapterData: any;
    percentValue: any;
  }) => void; 
  isChapter?: boolean;
  percentageCheck?: boolean;
  starterCh?: boolean;
}
export default function DetailCard({
  chapter,
  isChapter,
  deleteFunc,
  percentageCheck = true,
  starterCh,
}: DetailCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const questions = chapter?.questions;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const percentage = calculateCompletionPercentage(chapter?.questions);
  const handleClickOption = (opt) => {
    deleteFunc({
      option: opt === 1 ? "Delete" : "Edit",
      chapterData: chapter,
      percentValue: percentage,
    });
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
    const percentage = (completedCount / array?.length) * 100;

    return percentage;
  }

  function getUpdatedTimeDifference(timestamp: string): string {
    const currentTime: Date = new Date();
    const updatedTime: Date = new Date(timestamp);
    const timeDifferenceInMilliseconds: number =
      currentTime.getTime() - updatedTime.getTime();
    const timeDifferenceInDays: number = Math.floor(
      timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000)
    );

    if (timeDifferenceInDays === 0) {
      return t("ChName.chaptersCard.lastEditedToday");
    } else {
      return `${t("ChName.chaptersCard.lastEdited")} ${timeDifferenceInDays} ${t("ChName.chaptersCard.day")}${timeDifferenceInDays !== 1 ? "s" : ""
        } ${t("ChName.chaptersCard.ago")}`;
    }
  }

  const options = [
    { id: 1, title: t("ChName.chaptersCard.deleteBtn")  },
    { id: 2, title: t("ChName.chaptersCard.editBtn") },
  ];

  return (
    <Box
      bgcolor={"white"}
      borderRadius={"8px"}
      boxShadow="4px 4px 11.9px 0px rgba(0, 0, 0, 0.10)"
    >
      <Card
        className="container-fontfamily"
        sx={{
          borderRadius: "6.5px",
          height: { sm: "250px", xs: "150px" },
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#E1683B",
            height: { xs: "22px", sm: "32px", md: "36px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            pr: { md: "13px", xs: "11px" },
          }}
        >
          <Box>
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
                      key={option.id}
                      selected={option.title === "Pyxis"}
                      disabled={starterCh && starterCh}
                      onClick={() => handleClickOption(option.id)}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Box>
        <Box
          className={
            router.asPath === "/dashboard/chapters/completedChapter" &&
            styles.CardBg
          }
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
            if (router.asPath === "/dashboard/chapters/completedChapter") {
              router.push(
                `/dashboard/narrative?chapterId=${chapter?._id}&openai=${chapter?.narrativeFusion}`
              );
            }
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              bgcolor: "#F4F4F4",
              padding: { md: "12px", sm: "10px", xs: "8px" },
            }}
          >
            <Typography
              variant="body2"
              color="#30422E"
              sx={{
                fontSize: { md: "15px", sm: "13.241px", xs: "10.493px" },
                fontWeight: 600,
              }}
            >
              {chapter?.title}
            </Typography>
            <Divider
              sx={{
                width: "100%",
                backgroundColor: "#BFC4B5",
                height: "1.166px",
                margin: { md: "5px auto 0", xs: "2.5px auto 0" },
                marginBottom: { md: "10px", xs: "5px" },
              }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className={styles.cardContent}
            >
              <Box
                sx={{
                  width: "100%",
                  height: { sm: "100px", xs: "100%" },
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {questions?.length > 0 ? (
                  questions?.slice(0, 4).map((question: any) => (
                    <Typography
                      key={question._id}
                      sx={{
                        mb: { sm: "2px", xs: "1px" },
                        color: "#30422E",
                        columnGap: "10px",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <Image alt="check" src={Tick} width={15} />
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          width: { xl: "360px" },
                          paddingRight: "20px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: {
                            md: "11px",
                            sm: "8.803px",
                            xs: "7.332px",
                          },
                        }}
                        className={styles.questionWidth}
                      >
                        {question.text}
                      </Typography>
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
                    <Image
                      alt="no Data"
                      src={noData}
                      style={{
                        height: "75%",
                        width: "100%",
                      }}
                    />
                  </Box>
                )}
              </Box>
              {router.asPath === "/dashboard/chapters/completedChapter"
                ? ""
                : ""}
              {isChapter &&
                router.asPath === "/dashboard/chapters/completedChapter" ? (
                ""
              ) : (
                <Box>
                  {percentageCheck && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: { md: "10px" },
                        height: { xs: "20px", sm: "100%" },
                      }}
                    >
                      <Typography
                        color="#161616"
                        sx={{
                          fontSize: { md: "9px", sm: "7px", xs: "5.5px" },
                        }}
                      >
                        {getUpdatedTimeDifference(chapter?.updated_at)}
                      </Typography>
                      <CircularWithValueLabel percentage={percentage} />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        borderRadius: "50px",
      }}
    >
      <CircularProgress
        sx={{ color: "#E1683B" }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: { sm: "-7px", xs: "-0px", md: "0px" },
          left: { sm: "2px", xs: "2px", md: "0px" },
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          component="div"
          color="#E1683B"
          sx={{ fontSize: { md: "8px", sm: "7.804px", xs: "8px" } }}
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
