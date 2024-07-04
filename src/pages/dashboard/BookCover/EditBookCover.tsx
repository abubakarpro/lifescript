// External libraries
import axios from "axios";
import { jsPDF } from "jspdf";
import "cropperjs/dist/cropper.css";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// Internal modules
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Cropper from "react-cropper";
import { Box, TextField, Typography } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import GlobelBtn from "@/components/button/Button";
import SelectBookCoverHeader from "@/components/dashboardComponent/SelectBookCoverHeader";
import Img from "@/_assets/book-cover";
import BookCover from "@/_assets/svg/book-cover-header.svg";
import FileIcon from "@/_assets/svg/fileIcon.svg";

// Redux slices and actions
import {
  bookCover,
  getBookCover,
  selectCoverData,
  updateBookCover,
  uploadImage,
} from "@/store/slices/chatSlice";


const EditBookCover = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { t } = useTranslation();
  const { CoverNumber } = router.query;
  const [title, setTitle] = useState("");
  const coverData = useSelector(selectCoverData);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonUpDateLoading, setButtonUpDateLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [byline, setByline] = useState("byline");
  const [coverId, setCoverId] = useState("");
  const [cropper, setCropper] = useState(null);

  const cropperRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#197065");
  const [droppedImage, setDroppedImage] = useState<
    string | ArrayBuffer | null | any
  >(null);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [initialStates, setInitialStates] = useState<{
    [key: string]: string[];
  }>({});

  const onCrop = async () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas: any = cropperRef.current.cropper.getCroppedCanvas();

      const croppedImageBase64 = croppedCanvas.toDataURL();


      const coverImageElement = document.getElementById(
        "coverImage"
      ) as HTMLImageElement;

      if (coverImageElement) {
        coverImageElement.setAttribute("xlink:href", croppedImageBase64);
      }

      setCropper(croppedImageBase64);
      return croppedImageBase64;
    }
  };

  useEffect(() => {
    const statesToFetch = [
      { id: "heading-text" },
      { id: "author-text" },
    ];

    statesToFetch.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        const spans = element.getElementsByTagName("tspan");
        const initialContent: string[] = [];

        for (let i = 0; i < spans.length; i++) {
          initialContent.push(spans[i].textContent || "");
        }

        setInitialStates((prev) => ({
          ...prev,
          [id]: initialContent,
        }));
      }
    });
  }, []); 

  function appendTitleToSVG(title: string, elmId: string) {
    const headingText = document.getElementById(elmId);

    if (headingText) {
      // Clear existing content
      headingText.innerHTML = "";

      // Set default y-axis offsets
      let yAxisOffsetOne = "10%";
      if (CoverNumber === "1" && elmId === "heading-text") {
        yAxisOffsetOne = "13%";
      }
      let yAxisOffsetOneauth = "24%";
      if (CoverNumber === "1" && elmId === "author-text") {
        yAxisOffsetOneauth = "27%";
      }
      let yAxisOffsetFour = "62%";
      if (CoverNumber === "4" && elmId === "heading-text") {
        yAxisOffsetFour = "67%";
      }
      let yAxisOffsetThree = "62%";
      if (CoverNumber === "3" && elmId === "heading-text") {
        yAxisOffsetThree = "72%";
      }
      let yAxisOffset = "80%";
      if (CoverNumber === "5" && elmId === "author-text") {
        yAxisOffset = "84%";
      }
      let yAxisOffsetTwo = "35%"; // Default for CoverNumber 2
      if (CoverNumber === "2" && elmId === "heading-text") {
        yAxisOffsetTwo = "44%";
      }
      let yAxisOffsetTwoAuth = "80%"; // Default for CoverNumber 2 author
      if (CoverNumber === "2" && elmId === "author-text") {
        yAxisOffsetTwoAuth = "90%";
      }

      if (CoverNumber === "6" && elmId === "heading-text") {
        // Set font size for heading-text to 180px for CoverNumber 6
        headingText.setAttribute("font-size", "180px");
      }

      if (title.trim() === "") {
        // If the title is empty, show predefined text spans
        const defaultTexts = initialStates[elmId];

        defaultTexts && defaultTexts.forEach((defaultText) => {
          const defaultTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          if (
            !(CoverNumber === "2" && elmId === "author-text") &&
            !(CoverNumber === "6" && elmId === "author-text") &&
            !(CoverNumber === "5" && elmId === "heading-text") &&
            !(CoverNumber === "5" && elmId === "author-text") &&
            !(CoverNumber === "4" && elmId === "author-text")
          ) {
            defaultTspan.setAttribute("x", "50%");
            defaultTspan.setAttribute("dy", "1.2em");
          }
          defaultTspan.appendChild(document.createTextNode(`${defaultText}`));
          headingText.appendChild(defaultTspan);
        });
      } else {
        let lines = [title];
        // Check for specific covers to split the title into multiple lines
        if (CoverNumber === "2" && elmId === "heading-text") {
          const words = title.split(" ");
          lines = [];
          let currentLine = "";

          words.forEach((word: any) => {
            if (word.length > 8) {
              const splitWord = word.match(/.{1,9}/g);
              splitWord.forEach(part => {
                if (currentLine) {
                  lines.push(currentLine);
                  currentLine = part;
                } else {
                  currentLine = part;
                }
              });
            } else if (currentLine.length + word.length + 1 <= 9) {
              currentLine += (currentLine ? " " : "") + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
            }
          });

          if (currentLine) {
            lines.push(currentLine);
          }
        } else if ([1, 3, 4, 6].includes(Number(CoverNumber)) && elmId === "heading-text") {
          const words = title.split(" ");
          const mid = Math.ceil(words.length / 2);
          lines = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
        } else if (CoverNumber === "2" && elmId === "heading-text") {
          const words = title.split(" ");
          const third = Math.ceil(words.length / 3);
          lines = [
            words.slice(0, third).join(" "),
            words.slice(third, 2 * third).join(" "),
            words.slice(2 * third).join(" ")
          ];
        }

        lines.forEach((line, index) => {
          const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          if (
            !(CoverNumber === "2" && elmId === "author-text") &&
            !(CoverNumber === "6" && elmId === "author-text") &&
            !(CoverNumber === "5" && elmId === "heading-text") &&
            !(CoverNumber === "5" && elmId === "author-text") &&
            !(CoverNumber === "4" && elmId === "author-text")
          ) {
            tspan.setAttribute("x", "50%");
            tspan.setAttribute("dy", index === 0 ? "0em" : "1.2em");
          }
          tspan.appendChild(document.createTextNode(line));
          headingText.appendChild(tspan);
        });

        // Adjust y attribute for author name when CoverNumber is 1
        if (CoverNumber === "1" && elmId === "author-text") {
          headingText.setAttribute("y", yAxisOffsetOneauth);
        }
        // Adjust y attribute for title name when CoverNumber is 1
        if (CoverNumber === "1" && elmId === "heading-text") {
          headingText.setAttribute("y", yAxisOffsetOne);
        }
        // Adjust y attribute for title name when CoverNumber is 4
        if (CoverNumber === "4" && elmId === "heading-text") {
          headingText.setAttribute("y", yAxisOffsetFour);
        }
        // Adjust y attribute for title name when CoverNumber is 3
        if (CoverNumber === "3" && elmId === "heading-text") {
          headingText.setAttribute("y", yAxisOffsetThree);
        }
        // Adjust y attribute for author name when CoverNumber is 5
        if (CoverNumber === "5" && elmId === "author-text") {
          headingText.setAttribute("y", yAxisOffset);
        }
        // Adjust y attribute for title name when CoverNumber is 2
        if (CoverNumber === "2" && elmId === "heading-text") {
          headingText.setAttribute("y", yAxisOffsetTwo);
        }
        // Adjust y attribute for author name when CoverNumber is 2
        if (CoverNumber === "2" && elmId === "author-text") {
          headingText.setAttribute("y", yAxisOffsetTwoAuth);
          headingText.setAttribute("x", "67%");
        }
      }
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let maxLength = 30; // Default max length

    if (CoverNumber === "5") {
      maxLength = 25; // Adjust max length for CoverNumber 5
    }
    if (CoverNumber === "2") {
      maxLength = 25; // Adjust max length for CoverNumber 5
    }

    if (event.target.value.length <= maxLength) {
      appendTitleToSVG(event.target.value, "heading-text");
      setTitle(event.target.value);
    }
  };

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 17) {
      appendTitleToSVG(event.target.value, "author-text");
      setSubtitle(event.target.value);
    }
  };

  const handleBylineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 25) {
      setByline(event.target.value);
    }
  };

  useEffect(() => {
    !selectedColor && setSelectedColor("#197065");
  }, [selectedColor]);

  const setColorBasedOnCover = (CoverNumber) => {
    if (CoverNumber === "1") return "#F8F8F0";
    // else if (CoverNumber === "2") return "#ffffff"; //done
    else if (CoverNumber === "2")
      return "#F8F8F0"; //done replace halfwhite with whitw
    else if (CoverNumber === "3") return "#F3ECDA"; //done
    else if (CoverNumber === "4") return "#f3ecda"; //done
    else if (CoverNumber === "5") return "#000000"; //done
    else if (CoverNumber === "6") return "#f3ecda"; //done
  };

  const handleSaveCover = async () => {
    setButtonUpDateLoading(true);
    const res1 = await downloadPdf();
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("image", file);

    const reader = new FileReader();
    reader.onload = () => {
      setDroppedImage(reader.result);
      const base64Data = reader.result as string;
      setDroppedImage(base64Data);
      const coverImageElement = document.getElementById(
        "coverImage"
      ) as HTMLImageElement;
      if (coverImageElement) {
        coverImageElement.setAttribute("xlink:href", base64Data);
      }
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
  });

  useEffect(() => {
    dispatch(getBookCover());
  }, []);

  useEffect(() => {
    if (Array.isArray(coverData) && coverData.length === 0) {
      return; 
    }
    if (typeof coverData === "object" && coverData !== null) {

      setByline(coverData?.byLine);
      setTitle(coverData?.title);
      setSubtitle(coverData?.subTitle);
      setImageLink(coverData?.image);
      setSelectedColor(coverData?.color);
      setCoverId(coverData?._id);

      appendTitleToSVG(coverData?.subTitle, "author-text");
      appendTitleToSVG(coverData?.title, "heading-text");
      haveCoverImageAlready(coverData?.image);
    }
  }, [coverData]);

  const haveCoverImageAlready = (droppedImage) => {
    const coverImageElement = document.getElementById(
      "coverImage"
    ) as HTMLImageElement;
    if (coverImageElement) {
      convertUrlToBase64(droppedImage).then((result) => {
        coverImageElement.setAttribute(
          "xlink:href",
          `data:image/png;base64,${result}`
        );
      });
    }
  };

  //download Svg
  const downloadPdf = async () => {
    try {
      const svgElement = document.getElementById("mysvg");
      const doc: any = new jsPDF();
      const svgData = new XMLSerializer().serializeToString(svgElement);
      if (doc.addSVG) {
        await doc.addSVG(svgData, 0, 0); // Adjust coordinates as needed
      } else {
        console.warn(
          "jsPDF does not support native SVG rendering. Using alternative method."
        );
      }

      // **Method B: Converting SVG to canvas and then adding to PDF (fallback):**
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");



      // const img = new Image(0, 0);
      const img = document.createElement("img");
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        const imgData = canvas.toDataURL("image/png"); // Convert to PNG for compatibility
        uploadImageonCloudNew(imgData);
        doc.addImage(imgData, "PNG", 0, 0);
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`; // Encode SVG data
      if (img) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const updateOrSaveCover = (getImageCover) => {
    fetch(cropper)
      .then((response) => response.blob())
      .then((imgBlob) => {
        const formData = new FormData();
        formData.append("image", imgBlob);
        dispatch(uploadImage(formData))
          .unwrap()
          .then((res) => {
            toast.success("image uploaded successfully");

            setImageLink(res);
            setDroppedImage(res);
            setButtonLoading(true);
            dispatch(
              coverId
                ? updateBookCover({
                  id: coverId,
                  CoverNumber: CoverNumber,
                  title: title,
                  subTitle: subtitle,
                  byLine: byline,
                  color: setColorBasedOnCover(CoverNumber),
                  image: cropper ? res : imageLink,
                  coverPagePhoto: getImageCover,
                })
                : bookCover({
                  coverNumber: CoverNumber,
                  title: title,
                  subTitle: subtitle,
                  byLine: "byline",
                  color: setColorBasedOnCover(CoverNumber),
                  image: res,
                  coverPagePhoto: getImageCover,
                })
            )
              .unwrap()
              .then(() => {
                router.push(
                  `/dashboard/BookCover/ViewBookCover?CoverNumber=${CoverNumber}`
                );
              })
              .catch(() => {
                toast.error("Failed to save data");
                setButtonLoading(false);
              });
          })
          .catch(() => toast.error("Failed to upload image"));
      });
  };

  const uploadImageonCloudNew = async (formData) => {
    fetch(formData)
      .then((response) => response.blob())
      .then(async (imgBlob) => {
        const formData = new FormData();
        formData.append("image", imgBlob);
        const res = await dispatch(uploadImage(formData)).unwrap();

        localStorage.removeItem("image1");
        localStorage.setItem("image1", res);
        if (res) {
          updateOrSaveCover(res);
        }
        return res;
      });
  };

  async function convertUrlToBase64(url) {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const base64 = Buffer.from(response.data, "binary").toString("base64");
      return base64;
    } catch (error) {
      console.error("Error converting URL to base64:", error.message);
      throw error;
    }
  }

  const getCoverImage = (coverNumber: number) => {

    const imgArray = [];
    for (let i = 1; i <= coverNumber; i++) {
      imgArray.push(Img[`Cover${i}`]);
    }

    return imgArray[coverNumber - 1];
  };

  return (
    <div>
      <></>
      <Layout>
        <Box
          pb="25px"
          sx={{
            p: {
              sm: "0px",
              xs: "10px 20px",
            },
          }}
        >
          <SelectBookCoverHeader img={BookCover} discription={`${t("BookCover.BookCover")}`} />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: "40px", md: "50px", lg: "70px" },
              mt: "50px",
              overflowX: "auto",
            }}
          >
            <Box
              flex={"1"}
              display="flex"
              flexDirection="column"
              gap="24px"
              minWidth={"300px"}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                  }}
                >
                  {`${t("BookCoverCard.title")}`}*
                </Typography>
                <TextField
                  variant="outlined"
                  value={title}
                  placeholder={`${t("BookCoverCard.title")}`}
                  name={`${t("BookCoverCard.title")}`}
                  onChange={handleTitleChange}
                  sx={{
                    marginTop: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                      backgroundColor: "white",
                    },
                    width: "100%",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                  }}
                >
                  {`${t("BookCoverCard.author")}`}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={`${t("BookCoverCard.author")}`}
                  value={subtitle}
                  name={`${t("BookCoverCard.author")}`}
                  onChange={handleSubtitleChange}
                  sx={{
                    marginTop: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                      backgroundColor: "white",
                    },
                    width: "100%",
                  }}
                />
              </Box>

              {CoverNumber != "6" &&
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 12, sm: 14, md: 16, lg: 16 }, mb: "10px"
                    }}
                  >
                    Cover Photo
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "white",
                      width: "100%",
                      padding: "14px 0px",
                      textAlign: "center",
                      fontWeight: "500",
                      p: "6px",
                      border: " 0.355px solid #30422E",
                      borderRadius: "4px",
                    }}
                  >

                    {droppedImage && CoverNumber === "1" && (
                      <Cropper
                        ref={cropperRef}
                        src={droppedImage}
                        style={{ height: 300, width: "100%" }}
                        // aspectRatio={coverAspectRatio()}
                        // initialAspectRatio={16 / 9}
                        // initialAspectRatio={1/2}
                        aspectRatio={1.7 / 2.5}
                        background={false}
                        zoomTo={0}
                        viewMode={1}
                        minCropBoxWidth={10} // Set minCropBoxWidth to match the custom width
                        minCropBoxHeight={10}
                        guides={false}
                        dragMode="move"
                        onInitialized={(instance) => setCropper(instance)}
                        crop={onCrop}
                        autoCropArea={1}
                        responsive={true}
                        cropBoxResizable={false}
                      />
                    )}
                    {droppedImage && CoverNumber === "2" && (
                      <Cropper
                        ref={cropperRef}
                        src={droppedImage}
                        style={{ height: 300, width: "100%" }}
                        aspectRatio={1 / 2}
                        background={false}
                        zoomTo={0}
                        viewMode={1}
                        guides={false}
                        dragMode="move"
                        onInitialized={(instance) => setCropper(instance)}
                        crop={onCrop}
                        autoCropArea={1}
                        responsive={true}
                        cropBoxResizable={false}
                      />
                    )}
                    {droppedImage && CoverNumber === "3" && (
                      <Cropper
                        ref={cropperRef}
                        src={droppedImage}
                        style={{ height: 300, width: "100%" }}
                        initialAspectRatio={1.7 / 2.6}
                        background={false}
                        zoomTo={0}
                        viewMode={1}
                        minCropBoxWidth={10} // Set minCropBoxWidth to match the custom width
                        minCropBoxHeight={10}
                        guides={false}
                        dragMode="move"
                        onInitialized={(instance) => setCropper(instance)}
                        crop={onCrop}
                        autoCropArea={1}
                        responsive={true}
                        cropBoxResizable={false}
                      />
                    )}
                    {droppedImage && CoverNumber === "4" && (
                      <Cropper
                        ref={cropperRef}
                        src={droppedImage}
                        style={{ height: 300, width: "100%" }}
                        aspectRatio={1.4 / 2}
                        background={false}
                        zoomTo={0}
                        viewMode={1}
                        minCropBoxWidth={10} // Set minCropBoxWidth to match the custom width
                        minCropBoxHeight={10}
                        guides={false}
                        dragMode="move"
                        onInitialized={(instance) => setCropper(instance)}
                        crop={onCrop}
                        autoCropArea={1}
                        responsive={true}
                        cropBoxResizable={false}
                      />
                    )}
                    {droppedImage && CoverNumber === "5" && (
                      <Cropper
                        ref={cropperRef}
                        src={droppedImage}
                        style={{ height: 300, width: "100%" }}
                        aspectRatio={1.7 / 2.6}
                        background={false}
                        zoomTo={0}
                        viewMode={1}
                        minCropBoxWidth={10} // Set minCropBoxWidth to match the custom width
                        minCropBoxHeight={10}
                        guides={false}
                        dragMode="move"
                        onInitialized={(instance) => setCropper(instance)}
                        crop={onCrop}
                        autoCropArea={1}
                        responsive={true}
                        cropBoxResizable={false}
                      />
                    )}
                    {droppedImage && CoverNumber === "6" && (
                      <Cropper
                        ref={cropperRef}
                        src={droppedImage}
                        style={{ height: 300, width: "100%" }}
                        aspectRatio={1 / 2}
                        background={false}
                        zoomTo={0}
                        viewMode={1}
                        guides={false}
                        dragMode="move"
                        onInitialized={(instance) => setCropper(instance)}
                        crop={onCrop}
                        autoCropArea={1}
                        responsive={true}
                        cropBoxResizable={false}
                      />
                    )}
                    <div {...getRootProps()} style={{ cursor: "pointer" }}>
                      <input {...getInputProps()} />

                      <Box
                        sx={{
                          border: "1px dashed #30422E",
                          borderRadius: "4px",
                          p: "10px 0px",
                        }}
                      >
                        <Box>
                          <Image src={croppedImage || FileIcon} alt="" />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                            color: "#D3D3D3",
                          }}
                        >
                          {t("BookCoverCard.dragOrDrop")}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                            color: "#D3D3D3",
                          }}
                        >
                          {t("BookCoverCard.or")}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <GlobelBtn
                            btnText={`${t("BookCoverCard.browserFile")}`}
                            fontSize={{ sm: "10.6px", xs: "8.542px" }}
                            p="5px 20px"
                            color="#fff"
                          />
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </Box>
              }
            </Box>

            <Box
            // sx={{
            //   flex: "1",
            // }}
            >
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "#F4F4F4",
                  borderRadius: "4px",
                  padding: "20px",
                  overflowX: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >

                <Box sx={{ position: "relative", }}>
                  {CoverNumber &&
                    getCoverImage(
                      parseInt(typeof CoverNumber === "string" && CoverNumber)
                    )({ id: "mysvg", sx: { fontSize: "450px" } })}

                  {CoverNumber === "1" &&
                    <Box sx={{
                      position: "absolute",
                      bottom: "18px",
                      right: "75px",
                      width: "310.8px",
                      height: "435px",
                      zIndex: 2,
                      border: "2px dotted grey",
                    }}></Box>}
                  {CoverNumber === "2" &&
                    <Box sx={{
                      position: "absolute",
                      right: "64px",
                      top: "11px",
                      width: "321.5px",
                      height: "429px",
                      zIndex: 2,
                      border: "2px dotted grey",
                    }}></Box>}
                  {CoverNumber === "3" &&
                    <Box sx={{
                      position: "absolute",
                      right: "75px",
                      top: "11px",
                      width: "311px",
                      height: "429px",
                      zIndex: 2,
                      border: "2px dotted grey",
                    }}></Box>}
                </Box>

              </Box>

              <Box
                display="flex"
                columnGap="10px"
                rowGap="10px"
                mt="30px"
                justifyContent="flex-end"
                flexWrap="wrap"
              >
                <Box>
                  <GlobelBtn
                    btnText={`${t("BookCoverCard.changeCover")}`}
                    border="1px solid #E1683B"
                    bgColor="transparent"
                    color="#E1683B"
                    fontSize={{ xs: "12px", md: "16px" }}
                    onClick={() => {
                      router.push("/dashboard/BookCover/SelectBookCover");
                    }}
                    width={"180px"}
                  />
                </Box>
              
                {CoverNumber === "6" ? (
                  <Box
                    sx={{
                      opacity: (title && subtitle),
                    }}
                  >
                    <GlobelBtn
                      btnText={
                        buttonLoading
                          ? `${t("BookCoverCard.Saving")}`
                          : coverId
                            ? `${t("BookCoverCard.UpdateCover")}`
                            : `${t("BookCoverCard.saveCover")}`
                      }
                      bgColor="#30422E"
                      color="#fff"
                      fontSize={{ xs: "12px", md: "16px" }}
                      onClick={() => {
                        title &&
                          subtitle &&
                          !buttonLoading &&
                          handleSaveCover();
                      }}
                      isLoading={buttonUpDateLoading}
                      width={"180px"}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      opacity: (title && subtitle && imageLink) || cropper ? "1" : "0.5",
                    }}
                  >
                    <GlobelBtn
                      btnText={
                        buttonLoading
                          ? `${t("BookCoverCard.Saving")}`
                          : coverId
                            ? `${t("BookCoverCard.UpdateCover")}`
                            : `${t("BookCoverCard.saveCover")}`
                      }
                      bgColor="#30422E"
                      color="#fff"
                      fontSize={{ xs: "12px", md: "16px" }}
                      onClick={() => {
                        title &&
                          subtitle &&
                          !buttonLoading &&
                          handleSaveCover();
                      }}
                      isLoading={buttonUpDateLoading}
                      width={"180px"}
                    />
                  </Box>
                )}

              </Box>
            </Box>

          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default EditBookCover;