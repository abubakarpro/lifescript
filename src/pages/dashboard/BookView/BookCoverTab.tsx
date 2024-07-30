import GlobelBtn from "@/components/button/Button";
import SelectBookCoverCard from "@/components/dashboardComponent/SelectBookCoverCard";
import {
  getBookCover,
  selectCoverData,
  updateBook,
  uploadImage,
  uploadImageForCover,
  uploadImageWithCloudinary
} from "@/store/slices/chatSlice";
import { Box } from "@mui/material";
import jsPDF from "jspdf";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { font } from "../../../styles/Besley";
import Loading from "./components/Loading";

const BookCoverTab = ({ setSelectedTab, pages }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [byline, setByline] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("#197065");

  const dispatch: any = useDispatch();
  const [spineSize, setSpineSize] = useState(null);
  const coverData = useSelector(selectCoverData);
  const [loading, setLoading] = useState(false);
  const [finalCover, setFinalCover] = useState("");
  const handleClick = (event: any) => {
    event.stopPropagation();
  };

  const onClickHandler = async () => {
    setLoading(true);
    try {
      await generateAndUploadPDF();
    } catch (error) {
      console.error("Error generating or uploading PDF:", error);
    }
  };

  const generatePDFOne = async (
    title,
    subtitle,
    name,
    imgUrl,
    color,
  ) => {
    const logo = coverData?.coverNumber === "5" ? "https://lifescript-media.s3.eu-north-1.amazonaws.com/logo+(5)+LifeScript+2+(1).png"
      : "https://lifescript-media.s3.eu-north-1.amazonaws.com/logo_lifescript+1.png";

    let pdfHeight;
    if (coverData?.coverNumber === "1" || coverData?.coverNumber === "3") {
      pdfHeight = 229 + 30;
    } else if (coverData?.coverNumber === "2") {
      pdfHeight = 229 + 30;
    } else {
      pdfHeight = 229 + 40;
    }

    const leftContentWidth = 144;
    const rightContentWidth = 144;
    const gutterWidth = 8;
    const spineWidth = spineSize;
    let offset;
    if (coverData?.coverNumber === "1" || coverData?.coverNumber === "3") {
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

    pdf.setFillColor(bgcolor);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

    if (coverData?.coverNumber === "2") {
      pdf.setFillColor("#FFFFFF");
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset, offset, leftContentWidth, pdfHeight - 2 * offset, "F");

      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth, offset, 1, pdfHeight - 2 * offset, "F");
      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth + 1, offset, spineWidth - 2, pdfHeight - 2 * offset, "F");
      pdf.setFillColor("#FFFFFF");
      const spineBorder2 = offset + leftContentWidth + gutterWidth + spineWidth - 1;
      pdf.rect(spineBorder2, offset, 1, pdfHeight - 2 * offset, "F");

      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

      pdf.setFillColor("#FFFFFF");
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth, offset, rightContentWidth, pdfHeight - 2 * offset, "F");

    } else {
      pdf.setFillColor(bgcolor);
      pdf.rect(offset, offset, leftContentWidth, pdfHeight - 2 * offset, "F");

      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth, offset, 1, pdfHeight - 2 * offset, "F");
      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth + 1, offset, spineWidth - 2, pdfHeight - 2 * offset, "F");
      pdf.setFillColor(bgcolor);
      const spineBorder2 = offset + leftContentWidth + gutterWidth + spineWidth - 1;
      pdf.rect(spineBorder2, offset, 1, pdfHeight - 2 * offset, "F");

      pdf.setFillColor(bgcolor);
      pdf.rect(offset + leftContentWidth + gutterWidth + spineWidth, offset, gutterWidth, pdfHeight - 2 * offset, "F");

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

    const newImage = coverData && coverData?.coverPagePhoto;

    const newData = { imageUrl: newImage };
    // const resp = await appendImageToFormData(newImage)
    // const newImageLink = await dispatch(uploadImageForCover(resp));

    // const newImageLink = await dispatch(uploadImageWithCloudinary(newData));

    if (coverData?.coverNumber === "3") {
      const imageWidth = 159;
      const imageHeight = 259;
      const imageY = 0;

      pdf.addImage(
        newImage,
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
        newImage,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        imageY,
        imageWidth,
        imageHeight
      );
    } else if (coverData?.coverNumber === "1") {
      const imageWidth = 156;
      const imageHeight = 250;
      const imageY = 14;

      pdf.addImage(
        newImage,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        imageY,
        imageWidth,
        imageHeight
      );
    } else {
      pdf.addImage(
        newImage,
        "png",
        offset + leftContentWidth + gutterWidth + spineWidth + gutterWidth,
        offset,
        rightContentWidth,
        pdfHeight - 2 * offset
      );
    }

    const pdfContent = pdf.output("datauristring");

    return pdfContent;
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

  const generateAndUploadPDF = async () => {
    const pdfContent = await generatePDFOne(
      coverData.byLine,
      coverData.title,
      coverData.subTitle,
      coverData.image,
      coverData.color,
      // spineSize
    );

    const pdfBlob = await fetch(pdfContent).then((res) => res.blob());

    const formData = new FormData();
    formData.append("image", pdfBlob, "luluBookCover.pdf");

    dispatch(uploadImage(formData))
      .unwrap()
      .then((pdfUrl) => {

        dispatch(updateBook({ coverPdf: pdfUrl }))
          .unwrap()
          .then(() => {
            setLoading(false);
            setSelectedTab(2);
          });
      });
  };

  useEffect(() => {
    dispatch(getBookCover());
  }, []);

  function calculatePageSize(pages: number) {
    let dynamicValue = Math.min(Math.floor(pages / 100) * 0.6, 3.0);
    const spineSize = (pages / 10) * 0.5 + dynamicValue + 4;
    return spineSize;
  }

  useEffect(() => {
    if (pages) {
      const spine = calculatePageSize(pages);
      setSpineSize(spine);
    }
  }, [pages]);

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
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </Box>
      ) : (

        <Box onClick={(e) => handleClick(e)}>
          <SelectBookCoverCard
            landScape={coverData.coverNumber?.toString()}
            title={title}
            subtitle={subtitle}
            Byline={byline}
            droppedImage={imageLink}
            ColourPalette={selectedColor}
            finalCover={finalCover}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 2,
              mt: '40px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                pb: '20px',
              }}
            >
              <Box>
                <GlobelBtn
                  btnText={t("reviewBook.backBtn")}
                  color="#E1683B"
                  bgColor="#fff"
                  border="1px solid #E1683B"
                  onClick={() => setSelectedTab(0)}
                  width="110px"
                />
              </Box>
              <Box>
                <GlobelBtn
                  bgColor="#E1683B"
                  color="white"
                  btnText={loading ? "Saving..." : t("reviewBook.nextBtn")}
                  border="0px"
                  width="110px"
                  onClick={onClickHandler}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BookCoverTab;
