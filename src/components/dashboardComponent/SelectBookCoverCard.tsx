import CoverImg from "@/_assets/png/selectBookCover.png";
import logo from "@/_assets/svg/SmallLogoWhite.svg";
import { Box } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import GlobelBtn from "../button/Button";

interface SelectBookCoverCardProps {
  landScape?: string;
  title?: string;
  subtitle?: string;
  Byline?: string;
  droppedImage?: any;
  ColourPalette?: string;
}

const SelectBookCoverCard: React.FC<SelectBookCoverCardProps> = ({
  landScape,
  title = "",
  subtitle = "",
  Byline = "",
  ColourPalette = "#30422E",
  droppedImage,
}) => {
  const currentPath = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const viewBookCheck = currentPath == "/dashboard/BookCover/ViewBookCover";

  return (
    <Box
      sx={{
        position: "relative",
        "&:hover .hoverBox": {
          display:
            currentPath == "/dashboard/BookCover/SelectBookCover" && "flex",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "6.077px",
          border: " 0.304px solid #30422E",
          width: "100%",
          height: "100%",
          p: "53px 20px",
          overflowX: "auto",
        }}
      >
        {currentPath === "/dashboard/BookView" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              pb: "20px",
              mt: "-27px",
              mr: "25px",
            }}
          >
            <Box>
              <GlobelBtn
                btnText="Edit"
                onClick={() => {
                  router.push("/dashboard/BookCover/SelectBookCover");
                }}
              />
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: !viewBookCheck
              ? { xs: "15px", sm: "20px", md: "25px", lg: "30px", xl: "43px" }
              : "2px",
          }}
        >
          {viewBookCheck && (
            <Box
              sx={{
                width: { xs: "260px", md: "240px", lg: "287.611px" },
                height: "414.319px",
                bgcolor: ColourPalette.length == 0 ? "#30422E" : ColourPalette,
                color: "white",
                textAlign: "center",
                p: "10px",
              }}
            ></Box>
          )}
          <Box
            sx={{
              bgcolor: ColourPalette.length == 0 ? "#30422E" : ColourPalette,
              color: "white",
              fontSize: "9.924px",
              fontWeight: "300",
              padding: "5px 8px",
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              <Box>
                {title.length == 0 ? (
                  <span> {t("BookCoverCard.title")}</span>
                ) : (
                  title
                )}{" "}
                |{" "}
                {subtitle.length == 0 ? (
                  <span> {t("BookCoverCard.author")}</span>
                ) : (
                  subtitle
                )}
              </Box>
              <Box>
                <Image src={logo} alt="" />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: "240px", md: "240px", lg: "287.611px" },
              height: "414.319px",
              bgcolor: ColourPalette.length == 0 ? "#30422E" : ColourPalette,
              color: "white",
              textAlign: "center",
              p: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1.942px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    fontSize: { sm: "12px", md: "13px", lg: "15.559px" },
                    fontWeight: 300,
                    letterSpacing: "2.956px",
                    wordBreak: "break-all",
                    p: "0px 15px",
                  }}
                >
                  {Byline.length == 0 ? "" : Byline}
                </Box>

                <Box
                  mt={landScape === "1" && "12px"}
                  display="flex"
                  flexDirection={
                    landScape === "1" ? "column" : "column-reverse"
                  }
                >
                  <Box
                    sx={{
                      fontSize: { sm: "16px", md: "18px", lg: "22.275px" },
                      fontWeight: 600,
                      width: landScape === "1" ? "70%" : "100%",
                      margin: "auto",
                      pb: landScape === "2" && "20px",
                      wordBreak: "break-all",
                      p: "0px 15px",
                    }}
                  >
                    {title.length == 0 ? (
                      <span> {t("BookCoverCard.title")}</span>
                    ) : (
                      title
                    )}
                    <Box
                      sx={{
                        borderBottom: "2.5px solid white",
                        width: landScape === "1" ? "82%" : "58%",
                        margin: "auto",
                        pt: landScape === "2" && "20px",
                      }}
                    ></Box>
                  </Box>

                  <Box
                    sx={{
                      width:
                        landScape === "1"
                          ? { xs: "80%", md: "200px", lg: "212.377px" }
                          : "91.274px",
                      height: landScape === "1" ? "104.868px" : "149.534px",
                      margin:
                        landScape === "1" ? "45px auto 17px" : "25px auto",
                    }}
                  >
                    {droppedImage ? (
                      <img
                        src={droppedImage}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Image
                        src={CoverImg}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    fontSize: "9.336px",
                    fontWeight: 400,
                    letterSpacing: "0.373px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    wordBreak: "break-all",
                  }}
                >
                  <span>-</span>
                  {subtitle.length == 0 ? (
                    <span>{t("BookCoverCard.author")}</span>
                  ) : (
                    subtitle
                  )}
                  <span>-</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className="hoverBox"
        sx={{
          position: "absolute",
          top: "0px",
          left: "0px",
          background: "rgba(0, 0, 0, 0.46)",
          zIndex: "22",
          width: "100%",
          height: "100%",
          borderRadius: "6.077px",
          display: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            color: "white",
            fontSize: { xs: "18px", md: "20px", lg: "26.935px" },
            fontWeight: "300",
            padding: "5px 8px",
            textTransform: "uppercase",
            letterSpacing: "9.427px",
            textAlign: "center",
          }}
        >
          {t("BookCoverCard.UseThisCover")}
        </Box>
      </Box>
    </Box>
  );
};

export default SelectBookCoverCard;
