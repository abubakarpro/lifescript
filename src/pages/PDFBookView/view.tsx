import NextIcon from "@/_assets/svg/next-iconX.svg";
import PreviousIcon from "@/_assets/svg/previous-icon.svg";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { default as GlobelBtn } from "@/components/button/Button";
import SaveIcon from "@/_assets/svg/save-response-white-icon.svg";
import debounce from "lodash/debounce";
import ZoomIn from "@/_assets/svg/zoomin.svg";
import ZoomOut from "@/_assets/svg/zoom-out.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(450);
  const [pageHeight, setPageHeight] = useState(550);
  const [goToPageNumber, setGoToPageNumber] = useState("1");
  const [scale, setScale] = useState(1.0);

  const changeScale = useCallback(
    debounce((offset: number) => {
      setScale(offset);
    }, 300),
    []
  );

  useEffect(() => {
    if (numPages === 0) {
      setPageNumber(1);
    }
  }, [numPages]);

  const onPageLoadSuccess = (page) => {
    const originalPageWidth = page.originalWidth;
    const originalPageHeight = page.originalHeight;
    const value = lg ? 470 : sm ? 350 : xs ? 300 : 470;
    const value2 = lg ? 550 : sm ? 300 : xs ? 300 : 550;
    const scaleX = value / originalPageWidth;
    const scaleY = value2 / originalPageHeight;
    const scale = Math.min(scaleX, scaleY);

    setPageWidth(originalPageWidth * scale);
    setPageHeight(originalPageHeight * scale);
    setLoading(false);
  };

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const goToPage = (number: number) => {
    if (number <= numPages) {
      setPageNumber(number);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: { sm: "10px", xs: "5px" },
          mt: "2px",
          mb: "20px",
          justifyContent: { sm: "flex-end", xs: "center" },
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ mr: "-20px" }}>
          <ButtonIcons
            onClick={() => {
              changeScale(scale - 0.1);
            }}
            disabled={scale <= 1}
            img={ZoomOut}
            iconSize={35}
          />
        </Box>

        <ButtonIcons
          onClick={() => {
            changeScale(scale + 0.1);
          }}
          disabled={scale >= 2.0}
          img={ZoomIn}
          iconSize={35}
        />

        <GlobelBtn
          bgColor="#E1683B"
          btnText={`PDF Download`}
          color="#fff"
          image={SaveIcon}
          onClick={() => window.open(pdfUrl, "_blank")}
          fontSize="14px"
          p="8px 15px"
        />
      </Box>

      <Box hidden={false}>
        <Box display="flex" justifyContent={{lg:"center",xs:"center"} }alignItems="center">
          <Box>
            <Button
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber <= 1}
              color="primary"
              sx={{ opacity: pageNumber <= 1 ? 0.2 : 1 }}
            >
              <Image alt="icon" src={PreviousIcon} />
            </Button>
          </Box>

          <Box
            sx={{
              overflow: "scroll",
              border: "1px solid #ddd",
              width: { pageWidth },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) =>
                console.error("PDF loading error:", error)
              }
              options={options}
              renderMode="canvas"
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onLoadSuccess={onPageLoadSuccess}
                width={pageWidth}
                height={pageHeight}
                scale={scale}
              />
            </Document>
          </Box>

          <Box
            
          >
            <Button
              onClick={() => setPageNumber(pageNumber + 1)}
              color="primary"
              disabled={pageNumber >= numPages}
              sx={{ opacity: pageNumber >= numPages ? 0.2 : 1 }}
            >
              <Image alt="icon" src={NextIcon} />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: "20px 0",
          }}
        >
          <Box>
            Page{" "}
            <input
              type="number"
              style={{
                background: "#fff",
                border: "1.5px solid gray",
                outline: "0px",
                color: "black",
                width: "30px",
                textAlign: "center",
                fontSize: "18px",
              }}
              value={pageNumber}
              onChange={(e) => {
                goToPage(Number(e.target.value));
              }}
              className="pdfNumberInput"
            />{" "}
            of {numPages}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PDFViewer;

export const ButtonIcons = ({ onClick, iconSize, img, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        display: "flex",
        justifyContent: {lg:"center'"},
        alignItems: "center",
        columnGap: {lg:"8px"},
        "&:hover": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Image src={img} alt="icon" width={iconSize} />
    </Button>
  );
};
