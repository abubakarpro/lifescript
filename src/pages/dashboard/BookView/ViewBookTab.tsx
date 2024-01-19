import GlobelBtn from "@/components/button/Button";
import PDFViewer from "@/pages/PDFBookView/view";
import { Box } from "@mui/material";
import backArrow from "../../../_assets/svg/left.svg";
import NextArrow from "../../../_assets/svg/rightArrow.svg";

const ReviewInterior = ({ setSelectedTab, interior }) => {
  const pdfUrl =
    "https://lifescript-media.s3.eu-north-1.amazonaws.com/82482b3f-42dd-4f63-82f2-78b1a5fd9e72-aqibbook.pdf";
  console.log("interior2", interior);
  // const pdfUrl = interior;
  return (
    <Box>
      <Box
        sx={{
          p: "26px 28px",
          bgcolor: "white",
          borderRadius: "7.348px",
          border: "0.367px solid #30422E",
          height: "1100px",
        }}
      >
        <Box>
          <PDFViewer pdfUrl={pdfUrl} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          py: "20px",
        }}
      >
        <Box>
          <GlobelBtn
            btnText="Back"
            onClick={() => {
              setSelectedTab(1);
            }}
            image={backArrow}
          />
        </Box>
        <Box>
          <GlobelBtn
            bgColor="#30422E"
            color="white"
            btnText="Next"
            image2={NextArrow}
            onClick={() => {
              setSelectedTab(3);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewInterior;
