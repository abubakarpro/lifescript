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
  }) => void; // Define the callback type here
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
    deleteFunc({ option: opt, chapterData: chapter, percentValue: percentage });
    console.log("opt", opt);
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

  function getUpdatedTimeDifference(timestamp: string): string {
    const currentTime: Date = new Date();
    const updatedTime: Date = new Date(timestamp);
    const timeDifferenceInMilliseconds: number =
      currentTime.getTime() - updatedTime.getTime();
    const timeDifferenceInDays: number = Math.floor(
      timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000)
    );

    if (timeDifferenceInDays === 0) {
      return "Last edited Today";
    } else {
      return `Last edited ${timeDifferenceInDays} day${
        timeDifferenceInDays !== 1 ? "s" : ""
      } ago`;
    }
  }
  // const options = [`${t("ChName.Del")}`, `${t("ChName.edit")}`];

  const options = ["Delete", "Edit"];

  return (
    <Box
      bgcolor={"white"}
      borderRadius={"8px"}
      boxShadow={"4.715px 4.042px 11.519px 0px rgba(0, 0, 0, 0.14)"}
    >
      <Box
        sx={{
          boxShadow: {
            md: "4px 4px white",
            sm: "3px 3px white",
            xs: "2.5px 2.5px white",
          },
          borderRadius: "6.5px",
          padding: " 0px 4px 4px 0px",
          borderRight: "1.5px solid #EEEEEE",
          borderBottom: "1.5px solid #EEEEEE",
        }}
      >
        <Box
          sx={{
            boxShadow: {
              md: "4px 4px white",
              sm: "3px 3px white",
              xs: "2.5px 2.5px white",
            },
            borderRadius: "6.5px",
            borderRight: "1.5px solid #EEEEEE",
            borderBottom: "1.5px solid #EEEEEE",
          }}
        >
          <Card
            className="container-fontfamily"
            sx={{
              borderRadius: "6.5px",
              height: { sm: "240px", xs: "129px" },
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#197065",
                height: { xs: "22px", sm: "32px", md: "36px" },
                display: "flex",
                alignItems: "center",
                pl: { md: "13px", xs: "11px" },
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
                          key={option}
                          selected={option === "Pyxis"}
                          disabled={starterCh && starterCh}
                          onClick={() => handleClickOption(option)}
                        >
                          {option}
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
                  padding: { md: "12px", sm: "10px", xs: "8px" },
                }}
              >
                <Typography
                  variant="body2"
                  color="black"
                  sx={{
                    fontSize: { md: "14px", sm: "13.241px", xs: "10.493px" },
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {chapter?.title}
                </Typography>
                <Divider
                  sx={{
                    width: { md: "230px", sm: "164.046px", xs: "130px" },
                    backgroundColor: "#000",
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
                            color: "rgba(22, 22, 22, 0.90)",
                            columnGap: { sm: "5px", xs: "3px" },
                            fontSize: {
                              md: "13px",
                              sm: "8.803px",
                              xs: "7.332px",
                            },
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            sx={{
                              width: {
                                md: "21.701px",
                                sm: "19.491px",
                                xs: "12.467px",
                              },
                              height: {
                                md: "18.547px",
                                sm: "16.658px",
                                xs: "10.467px",
                              },
                              flexShrink: "0",
                            }}
                          >
                            <Image
                              alt="check"
                              src={Tick}
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </Box>
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
                          height: "75%",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          alt="no Data"
                          src={noData}
                          style={{
                            height: "100%",
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
                            color="rgba(22, 22, 22, 0.90)"
                            sx={{
                              fontSize: { md: "11px", sm: "7px", xs: "5.5px" },
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
      </Box>
    </Box>
  );
}

{
  /* // Progress Bar code */
}
function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: { md: "30px", sm: "26.015px", xs: "20px" },
      }}
    >
      <CircularProgress color="success" variant="determinate" {...props} />
      <Box
        sx={{
          top: { md: 0, sm: "1px", xs: "0px" },
          left: { md: -8, sm: "-14px", xs: "-19px" },
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
          sx={{ fontSize: { md: "8px", sm: "7.804px", xs: "5px" } }}
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
