import GlobelBtn from "@/components/button/Button";
import { useState } from "react";
import PDFViewer from "@/pages/PDFBookView/view";
import { Box } from "@mui/material";
import backArrow from "../../../_assets/svg/left.svg";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import ShippingModal from "@/components/modal/ShippingModal";
import { useTranslation } from "react-i18next";

const ReviewInterior = ({ setSelectedTab, interior }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  // const pdfUrl =
  // "https://lifescript-media.s3.eu-north-1.amazonaws.com/36453ad9-3feb-47e1-acd9-ee754be5a7e9.pdf";
  const pdfUrl = interior;
  return (
    <Box>
      <Box
        sx={{
          p: {lg:"30px 28px"},
          bgcolor: "#F3ECDA",
          borderRadius: "4",
          height: {lg:"740px" , sm:"100%"},
          mt: "50px"
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
          gap: 2, mt: "30px",
        }}
      >
        <Box sx={{}}>
          <GlobelBtn
            btnText={t("reviewBook.backBtn")}
            color="#E1683B"
            border="1px solid #E1683B"
            bgColor='#fff'
            width="110px"
            onClick={() => {
              setSelectedTab(1);
            }}
          />
        </Box>

        <Box>
          <GlobelBtn
            bgColor="#E1683B"
            color="white"
            width="110px"
            btnText={t("reviewBook.nextBtn")}
            onClick={() => {
              setOpen(true);

            }}
          />
        </Box>
      </Box>
      <ShippingModal open={open} setOpen={setOpen} setSelectedTab={setSelectedTab} />
    </Box>
  );
};

export default ReviewInterior;
