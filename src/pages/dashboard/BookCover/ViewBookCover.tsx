import BookCover from "@/_assets/svg/book-cover-header.svg";
import Layout from "@/components/Layout/Layout";
import GlobelBtn from "@/components/button/Button";
import SelectBookCoverCard from "@/components/dashboardComponent/SelectBookCoverCard";
import SelectBookCoverHeader from "@/components/dashboardComponent/SelectBookCoverHeader";
import { getBookCover, selectCoverData, uploadImageForCover, uploadImageWithCloudinary } from "@/store/slices/chatSlice";

import { Box } from "@mui/material";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { font } from "../../../styles/Besley";

const ViewBookCover = () => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const router = useRouter();

  const coverData = useSelector(selectCoverData);
  const { CoverNumber } = router.query;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [byline, setByline] = useState("");
  const [finalCover, setFinalCover] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const elementRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState<string>("#197065");
  const [isDownloading, setIsDownloading] = useState(false);

  const generatePDFOne = async (
    title,
    subtitle,
    name,
    imgUrl,
    color,
    finalCover,
    spine = 10.2
  ) => {
    setIsDownloading(true);
    const logo = CoverNumber === "5" ? "https://lifescript-media.s3.eu-north-1.amazonaws.com/logo+(5)+LifeScript+2+(1).png"
      : "https://lifescript-media.s3.eu-north-1.amazonaws.com/logo_lifescript+1.png";
    let pdfHeight: any;
    if (
      coverData?.coverNumber === "1" ||
      coverData?.coverNumber === "3"
    ) {
      pdfHeight = 229 + 30;
    } else if (coverData?.coverNumber === "2") {
      pdfHeight = 229 + 30;
    } else {
      pdfHeight = 229 + 40;
    }
    const leftContentWidth = 144;
    const rightContentWidth = 144;
    const gutterWidth = 8;
    const spineWidth = spine;

    let offset: any;
    if (
      coverData?.coverNumber === "1" ||
      coverData?.coverNumber === "3"
    ) {
      offset = 12;
    } else if (coverData?.coverNumber === "2") {
      offset = 8;
    } else {
      offset = 20;
    }
    const pdfWidth = leftContentWidth + gutterWidth + spineWidth + gutterWidth + rightContentWidth + 2 * offset;
    const pdf = new jsPDF({
      unit: "mm",
      format: [pdfWidth, pdfHeight],
      orientation: "landscape",
    });

    pdf.addFileToVFS("Besley-Regular.ttf", font);
    pdf.addFont("Besley-Regular.ttf", "Besley", "normal");

    const text2 = subtitle?.toUpperCase();
    const text1 = title?.toUpperCase();
    const writter = name?.toUpperCase();
    const bgcolor = color?.toString();
    const imageUrl = imgUrl;

    // Full background color including the offset area
    pdf.setFillColor(bgcolor);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

    if (CoverNumber === "2") {
      // Full background color including the offset area
      pdf.setFillColor("#FFFFFF");
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

      // Section 1: Left content area
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset, offset, leftContentWidth, pdfHeight - 2 * offset, "F");

      // Section 2: Left gutter
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

      // Section 3: Spine and inner spine
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth, offset, 1, pdfHeight - 2 * offset, "F");
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth + 1, offset, spineWidth - 2, pdfHeight - 2 * offset, "F");
      pdf.setFillColor("#FFFFFF");
      const spineBorder2 = offset + leftContentWidth + gutterWidth + spineWidth - 1;
      pdf.rect(spineBorder2, offset, 1, pdfHeight - 2 * offset, "F");

      // Section 4: Right gutter
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

      // Section 5: Right content area
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth, offset, rightContentWidth, pdfHeight - 2 * offset, "F");


    } else {
      // Section 1: Left content area
      pdf.setFillColor(bgcolor);
      pdf.rect(offset, offset, leftContentWidth, pdfHeight - 2 * offset, "F");

      // Section 2: Left gutter
      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

      // Section 3: Spine and inner spine
      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth, offset, 1, pdfHeight - 2 * offset, "F");
      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth + 1, offset, spineWidth - 2, pdfHeight - 2 * offset, "F");
      pdf.setFillColor(bgcolor);
      const spineBorder2 = offset + leftContentWidth + gutterWidth + spineWidth - 1;
      pdf.rect(spineBorder2, offset, 1, pdfHeight - 2 * offset, "F");

      // Section 4: Right gutter
      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");
      // Section 5: Right content area
      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth, offset, rightContentWidth, pdfHeight - 2 * offset, "F");

    }

    let y = 30;
    const fontSize = 10;
    const textCenter = offset + leftContentWidth + gutterWidth + spineWidth / 2 - 1.3;

    const charSpacing = 3.1;
    const drawTextVertically = (text) => {
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        pdf.setFontSize(fontSize);
        pdf.setFont("Besley");
        pdf.setTextColor(0, 0, 0);

        if (coverData?.coverNumber === "5") {
          pdf.setTextColor(255, 255, 255);
        } else {
          pdf.setTextColor(0, 0, 0);
        }
        // pdf.text(char, textCenter, y + .8, { angle: 270 });
        pdf.text(char, textCenter, y, { angle: 270 });
        if (char === "I") {
          y = y + 1.7;
        } else if (char === "F" || char === "Y") {
          y = y + 2.5;
        } else if (char === "M" || char === "W") {
          y = y + 3.7;
        } else {
          if (text[i + 1] === "O") {
            y = y + 2.7
          }
          else {
            y = y + charSpacing;
          }
        }
      }
    }

    drawTextVertically(text2);
    pdf.setFontSize(fontSize);
    pdf.setFont("Besley");
    if (coverData?.coverNumber === "5") {
      pdf.setTextColor(255, 255, 255);
    } else {
      pdf.setTextColor(0, 0, 0);
    }
    pdf.text("  |  ", offset + leftContentWidth + gutterWidth + spineWidth / 2 - 1, y, { angle: 270 });

    y = y + 6;

    drawTextVertically(writter);

    const logoWidth = 5;
    const logoHeight = 32;
    const logoUp = 5;
    const tailcenterX = offset + leftContentWidth + gutterWidth + (spineWidth - logoWidth) / 2;
    const verticalOffset = 8;
    const tailcenterY = pdfHeight - logoHeight - offset - verticalOffset - gutterWidth - logoUp;

    pdf.addImage(logo, "png", tailcenterX, tailcenterY, logoWidth, logoHeight);


    const newData = { imageUrl: finalCover };
    console.log(finalCover, "Final Cover");

    // const resp = await appendImageToFormData(finalCover)
    // console.log("resp", resp)
    // const newImageLink = await dispatch(uploadImageForCover(resp));
    // console.log(newImageLink, "new Image link");

    // const newImageLink = await dispatch(uploadImageWithCloudinary(newData));

    if (coverData?.coverNumber === "3") {
      const imageWidth = 159;
      const imageHeight = 259;
      const imageY = 0;

      pdf.addImage(
        finalCover,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        imageY,
        imageWidth,
        imageHeight
      );
    } else if (coverData?.coverNumber === "2") {
      const imageWidth = 155;
      const imageHeight = 259;
      const imageY = 0;

      pdf.addImage(
        finalCover,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        imageY,
        imageWidth,
        imageHeight
      );
    }
    else if (coverData?.coverNumber === "1") {
      const imageWidth = 156;
      const imageHeight = 250;
      const imageY = 14;

      pdf.addImage(
        finalCover,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        imageY,
        imageWidth,
        imageHeight
      );
    }
    else {
      pdf.addImage(
        finalCover,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        offset,
        rightContentWidth,
        pdfHeight - 2 * offset
      );
    }


    pdf.save("my_document2.pdf");
    setIsDownloading(false);
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // If the image is from a different origin, this may be necessary.
        img.src = src + '?test=123'
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function imageToBlob(img) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, 'image/png');
    });
}

async function appendImageToFormData(finalCover) {
  const img = await loadImage(finalCover);
  const blob: any = await imageToBlob(img);

  const formData = new FormData();
  formData.append("image", blob);

  return formData;
}

  useEffect(() => {
    dispatch(getBookCover()).then((res) => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (coverData) {
      setByline(coverData.byLine);
      setTitle(coverData.title);
      setSubtitle(coverData.subTitle);
      setImageLink(coverData.image);
      setSelectedColor(coverData.color);
      setFinalCover(coverData.coverPagePhoto);
    }
  }, [coverData]);

  return (
    <div>
      <Layout>
        {/* <Cover1 id="mysvg" /> */}
        <Box
          sx={{
            p: { md: "0px", xs: "10px 20px" },
          }}
        >
          <SelectBookCoverHeader img={BookCover} discription={`${t("BookCover.BookCover")}`} />

          <Box
            display="flex"
            columnGap="30px"
            rowGap="10px"
            mt="40px"
            mb="20px"
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            <GlobelBtn
              btnText={`${t("BookCoverCard.editCover")}`}
              fontSize={{ xs: "12px", md: "16px" }}
              border="1px solid #E1683B"
              color="#E1683B"
              bgColor="transparent"
              width={"180px"}
              onClick={() => {
                router.push(
                  `/dashboard/BookCover/EditBookCover?CoverNumber=${CoverNumber}`
                );
              }}
            />
            <GlobelBtn
              btnText={!isDownloading ? ` ${t("BookCoverCard.viewPdf")}` : ""}
              bgColor="#30422E"
              color="#fff"
              fontSize={{ xs: "12px", md: "16px" }}
              border="1px solid #197065"
              onClick={
                () =>
                  generatePDFOne(
                    byline,
                    title,
                    subtitle,
                    imageLink,
                    selectedColor,
                    finalCover
                  )
              }
              width={"180px"}
              isLoading={isDownloading}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              mt: "20px"
            }}
          >
            <Box flex={"auto"}>
              <Box
                ref={elementRef}
                id={"bookcoverpdf"}
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <SelectBookCoverCard
                  landScape={CoverNumber?.toString()}
                  title={title}
                  subtitle={subtitle}
                  Byline={byline}
                  droppedImage={imageLink}
                  ColourPalette={selectedColor}
                  finalCover={finalCover}
                  isLoading={isLoading}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default ViewBookCover;
