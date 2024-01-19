import Layout from "@/components/Layout/Layout";
import GlobelBtn from "@/components/button/Button";
import SelectBookCoverCard from "@/components/dashboardComponent/SelectBookCoverCard";
import SelectBookCoverHeader from "@/components/dashboardComponent/SelectBookCoverHeader";
import { getBookCover, selectCoverData } from "@/store/slices/chatSlice";
import { Box } from "@mui/material";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ViewBookCover = () => {
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const router = useRouter();
  const coverData = useSelector(selectCoverData);
  const { CoverNumber } = router.query;
  const [title, setTitle] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [byline, setByline] = useState("");
  const elementRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState<string>("#30422E");

  const generatePDFOne = async (
    title,
    subtitle,
    name,
    imgUrl,
    color,
    spine = 41
  ) => {
    const logo =
      "https://res.cloudinary.com/dm3wjnhkv/image/upload/v1703775146/thelifescript/Vector2665ca7b6e91b2c78eb3976317d845f1e3fec5b46b8aa10f2de595ccfef0d2bb_xzgh3l.png";
    const pdfHeight = 255;
    const pageWidth = 169.5;
    const tail = spine;
    const pdfWidth = pageWidth + pageWidth + spine;
    const pdf = new jsPDF({
      unit: "mm", // Set the unit to millimeters
      format: [pdfWidth, pdfHeight], // Convert inches to millimeters (15 inches x 10 inches)
      orientation: "landscape",
    });

    const text2 = subtitle?.toUpperCase();
    const text1 = title?.toUpperCase();
    const writter = name?.toUpperCase();
    const bgcolor = color?.toString();
    const imageUrl = imgUrl;
    // Section 1:
    pdf.setFillColor(bgcolor);
    pdf.rect(0, 0, pageWidth, pdfHeight, "F"); // Convert inches to millimeters

    // Section 2:
    pdf.setFillColor(255, 255, 255);
    pdf.rect(pageWidth, 0, 1, pdfHeight, "F"); // Convert inches to millimeters
    pdf.setFillColor(bgcolor);
    pdf.rect(170.5, 0, tail - 2, pdfHeight, "F"); // Convert inches to millimeters
    pdf.setFillColor(255, 255, 255);
    pdf.rect(209.5, 0, 1, pdfHeight, "F"); // Convert inches to millimeters

    let y = 5; // Initial y-coordinate
    const fontSize = tail < 12 ? tail - 3 : 10;
    const textCenter = pageWidth + (tail - (tail - fontSize) / 2) / 2;

    for (let i = 0; i < text2.length; i++) {
      const char = text2[i];
      pdf.setFontSize(fontSize);
      pdf.setTextColor(255, 255, 255);
      pdf.text(char, textCenter, y, { angle: 270 });
      y = y + 3; // Move to the next line for each character
    }

    pdf.setFontSize(fontSize);
    pdf.setTextColor(255, 255, 255);
    pdf.text("  |  ", textCenter, y, { angle: 270 });

    y = y + 6;

    for (let i = 0; i < writter.length; i++) {
      const char = writter[i];
      pdf.setFontSize(fontSize);
      pdf.setTextColor(255, 255, 255);
      pdf.text(char, textCenter, y, { angle: 270 });
      y = y + 3; // Move to the next line for each character
    }
    const logoSize = tail < 22 ? tail - 3 : 20;
    const tailcenter = pageWidth + (tail - logoSize) / 2;
    pdf.addImage(imageUrl, "JPEG", tailcenter, 225, logoSize, logoSize);

    // Section 3:
    pdf.setFillColor(bgcolor);
    pdf.rect(pageWidth + tail, 0, pageWidth, pdfHeight, "F");
    const centerX = pageWidth + tail + pageWidth / 2;

    // 1st Text: "A good book" with font size 16px
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text(text1, centerX, 50.8, { align: "center" });

    // 2nd Text: "New Book" font size 22px, bold, and underlined
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    pdf.text(text2, centerX, 66.04, {
      align: "center",
    }); // Convert inches to millimeters

    const imgWidth = 140; // Convert inches to millimeters
    const imgHeight = 80; // Convert inches to millimeters
    const xPos = pageWidth + tail + (pageWidth - imgWidth) / 2; // Convert inches to millimeters
    const yPos = 87; // Convert inches to millimeters
    pdf.addImage(imageUrl, "JPEG", xPos, yPos, imgWidth, imgHeight);

    // 4th Text: "- good book -" font size 16px
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text(`-   ${writter}   -`, centerX, 178.4, { align: "center" }); // Convert inches to millimeters

    pdf.save("my_document.pdf");
  };

  const generatePDFTwo = async (
    title,
    subtitle,
    name,
    imgUrl,
    color,
    spine = 41
  ) => {
    const pdfHeight = 255;
    const pageWidth = 169.5;
    const tail = spine;
    const pdfWidth = pageWidth + pageWidth + spine;
    const pdf = new jsPDF({
      unit: "mm", // Set the unit to millimeters
      format: [pdfWidth, pdfHeight],
      orientation: "landscape",
    });

    const text2 = subtitle?.toUpperCase();
    const text1 = title?.toUpperCase();
    const writter = name?.toUpperCase();
    const bgColor = color.toString();
    const imageUrl = imgUrl;
    // Section 1: Blue background
    pdf.setFillColor(bgColor);
    pdf.rect(0, 0, pageWidth, pdfHeight, "F");

    // Section 2: Yellow background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(pageWidth, 0, 1, pdfHeight, "F");
    pdf.setFillColor(bgColor);
    pdf.rect(170.5, 0, tail - 2, pdfHeight, "F");
    pdf.setFillColor(255, 255, 255);
    pdf.rect(209.5, 0, 1, pdfHeight, "F");

    let y = 5; // Initial y-coordinate
    const fontSize = tail < 12 ? tail - 3 : 10;
    const textCenter = pageWidth + (tail - (tail - fontSize) / 2) / 2;

    for (let i = 0; i < text2.length; i++) {
      const char = text2[i];
      pdf.setFontSize(fontSize);
      pdf.setTextColor(255, 255, 255);
      pdf.text(char, textCenter, y, { angle: 270 });
      y = y + 3; // Move to the next line for each character
    }

    pdf.setFontSize(fontSize);
    pdf.setTextColor(255, 255, 255);
    pdf.text("  |  ", 190, y, { angle: 270 });

    y = y + 6;

    for (let i = 0; i < writter.length; i++) {
      const char = writter[i];
      pdf.setFontSize(fontSize);
      pdf.setTextColor(255, 255, 255);
      pdf.text(char, textCenter, y, { angle: 270 });
      y = y + 3; // Move to the next line for each character
    }
    const logoSize = tail < 22 ? tail - 3 : 20;
    const tailcenter = pageWidth + (tail - logoSize) / 2;
    pdf.addImage(imageUrl, "JPEG", tailcenter, 225, logoSize, logoSize);

    // Section 3
    pdf.setFillColor(bgColor);
    pdf.rect(pageWidth + tail, 0, pageWidth, pdfHeight, "F");
    const centerX = pageWidth + tail + pageWidth / 2;

    // 1st Text: "A good book" with font size 16px
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text(text1, centerX, 35, { align: "center" });

    const imgWidth = 100;
    const imgHeight = 120;
    const xPos = pageWidth + tail + (pageWidth - imgWidth) / 2;
    const yPos = 50;
    pdf.addImage(imageUrl, "JPEG", xPos, yPos, imgWidth, imgHeight);

    // 2nd Text: "New Book" font size 22px, bold, and underlined
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    pdf.text(text2, centerX, 190, {
      align: "center",
    });

    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(1);
    const lineStart = pageWidth + tail + 50;
    pdf.line(lineStart, 200, pdfWidth - 50, 200);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text(`-   ${writter}   -`, centerX, 215, { align: "center" }); // Convert inches to millimeters

    pdf.save("my_document.pdf");
  };

  useEffect(() => {
    dispatch(getBookCover());
  }, []);

  useEffect(() => {
    if (coverData) {
      setByline(coverData.byLine);
      setTitle(coverData.title);
      setSubtitle(coverData.subTitle);
      setImageLink(coverData.image);
      setSelectedColor(coverData.color);
    }
  }, [coverData]);

  return (
    <div>
      <Layout>
        <Box
          sx={{
            p: { md: "0px", xs: "10px 20px" },
          }}
        >
          <SelectBookCoverHeader discription={`${t("BookCover.BookCover")}`} />
          <Box
            display="flex"
            columnGap="30px"
            rowGap="10px"
            mt="10px"
            mb="20px"
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            <Box>
              <GlobelBtn
                btnText={`${t("BookCoverCard.viewPdf")}`}
                fontSize={{ xs: "12px", md: "16px" }}
                border="1px solid #30422E"
                onClick={() =>
                  CoverNumber.toString() === "2"
                    ? generatePDFTwo(
                        byline,
                        title,
                        subtitle,
                        imageLink,
                        selectedColor,
                        12
                      )
                    : generatePDFOne(
                        byline,
                        title,
                        subtitle,
                        imageLink,
                        selectedColor,
                        9
                      )
                }
                width={"180px"}
              />
            </Box>
            <Box>
              <GlobelBtn
                btnText={`${t("BookCoverCard.editCover")}`}
                bgColor="#30422E"
                borderRadius="23px"
                color="#fff"
                fontSize={{ xs: "12px", md: "16px" }}
                border="1px solid #30422E"
                width={"180px"}
                onClick={() => {
                  router.push(
                    `/dashboard/BookCover/EditBookCover?CoverNumber=${CoverNumber}`
                  );
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              mt: "20px",
              overflowX: "scroll",
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
