"use client";

import AddChapterImage from "@/_assets/svg/add-chapter-green.svg";
import AddChapterWhite from "@/_assets/svg/add-chapter-white.svg";
import TemplateWhite from "@/_assets/svg/template-white.svg";
import Template from "@/_assets/svg/template.svg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChapterProps {
  addChapterClick?: () => void;
}
export const StartNewChapter = ({ addChapterClick }: ChapterProps) => {
  const router = useRouter();
  const [newChapter, setNewChapter] = useState(true);
  const [hoverStartNewChapter, setHoverStartNewChapter] = useState(false);
  const [hoverUseTemplate, setHoverUseTemplate] = useState(false);
  const { t } = useTranslation();

  const handleHoverStartNewChapter = () => {
    setHoverStartNewChapter(true);
  };

  const handleLeaveStartNewChapter = () => {
    setHoverStartNewChapter(false);
  };

  const handleHoverUseTemplate = () => {
    setHoverUseTemplate(true);
  };

  const handleLeaveUseTemplate = () => {
    setHoverUseTemplate(false);
  };

  const handleTemplateClick = () => {
    router.push("/dashboard/templates");
  };
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
              padding: "8px",
              boxShadow: "none",
            }}
          >
            {newChapter && (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: { sm: "column" },
                  alignItems: "center",
                  gap: "17px",
                  justifyContent: "center",
                  border: "1.6px dashed #CDCDCD",
                  borderRadius: "4px",
                }}
                onClick={() => setNewChapter(false)}
              >
                <Box
                  sx={{
                    width: { md: "68.25px", sm: "61.3px", xs: "47.868px" },
                    height: { md: "68.25px", sm: "61.3px", xs: "47.868px" },
                  }}
                >
                  <Image
                    alt="image"
                    src={AddChapterImage}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontWeight: 600,
                    fontSize: { md: "14px", sm: "13.4px", xs: " 10.34px" },
                  }}
                >
                  {/* Start new chapter */}
                  {t("StartNewChapter.StartNewChapter")}
                </Typography>
              </Box>
            )}
            {!newChapter && (
              <Box sx={{ height: "100%" }}>
                <Box
                  sx={{
                    height: "49%",
                    display: "flex",
                    alignItems: "center",
                    columnGap: "17px",
                    justifyContent: "center",
                    border: "1.6px dashed #CDCDCD",
                    borderRadius: "4px",
                    marginBottom: "2%",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#30422E",
                      borderStyle: "dashed",
                      color: "#30422E",
                    },
                  }}
                  onMouseEnter={handleHoverStartNewChapter}
                  onMouseLeave={handleLeaveStartNewChapter}
                  onClick={addChapterClick}
                >
                  <Box
                    sx={{
                      width: { md: "68.25px", sm: "61.3px", xs: "47.868px" },
                      height: { md: "68.25px", sm: "61.3px", xs: "47.868px" },
                    }}
                  >
                    <Image
                      alt="image"
                      src={
                        hoverStartNewChapter ? AddChapterImage : AddChapterWhite
                      }
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: hoverStartNewChapter ? "#30422E" : "#CDCDCD",
                      fontWeight: 600,
                      fontSize: { md: "14px", sm: "13.4", xs: " 10.34px" },
                    }}
                  >
                    {t("StartNewChapter.StartNewChapter")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    height: "49%",
                    display: "flex",
                    alignItems: "center",
                    columnGap: "17px",
                    justifyContent: "center",
                    border: "1.6px dashed #CDCDCD",
                    borderRadius: "4px",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#30422E",
                      borderStyle: "dashed",
                      color: "#30422E",
                    },
                  }}
                  onMouseEnter={handleHoverUseTemplate}
                  onMouseLeave={handleLeaveUseTemplate}
                  onClick={handleTemplateClick}
                >
                  <Box
                    sx={{
                      width: { md: "68.25px", sm: "61.3px", xs: "47.868px" },
                      height: { md: "68.25px", sm: "61.3px", xs: "47.868px" },
                    }}
                  >
                    <Image
                      alt="image"
                      src={hoverUseTemplate ? Template : TemplateWhite}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: hoverUseTemplate ? "#30422E" : "#CDCDCD",
                      fontWeight: 600,
                      fontSize: { md: "14px", sm: "13.4", xs: " 10.34px" },
                    }}
                  >
                    {t("StartNewChapter.useTem")}
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
