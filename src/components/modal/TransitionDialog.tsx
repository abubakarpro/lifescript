import ModalImage from "@/_assets/png/view-template-modal.png";
import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide, { SlideProps } from "@mui/material/Slide";
import Image from "next/image";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GlobelBtn from "../button/Button";

const Transition = React.forwardRef<HTMLDivElement, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function TransitionsDialog({
  heading,
  description,
  open,
  cancel,
  proceed,
  closeModal = () => {},
  proceedText = "",
  cancelText = "",
}) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => (closeModal ? closeModal() : cancel())}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          textAlign: "center",
          padding: "50px 20px 35px",
        }}
      >
        <Box
          sx={{
            width: { md: "91.562px", sm: "66.54px", xs: "41.709px" },
            height: { md: "60.005px", sm: "43.607px", xs: "27.334px" },
            margin: "auto",
          }}
        >
          <Image
            alt="image"
            src={ModalImage}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { md: "22px", sm: "21.679px", xs: "15.508px" },
            fontWeight: 700,
            color: "#070707",
            margin: { md: "25px 0", sm: "15px 0px", xs: "5px" },
          }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{
            fontSize: { md: "16.5px", sm: "16.259px", xs: "11.631px" },
            color: "#070707",
            width: { md: "500px", sm: "400px" },
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            mt: "20px",
            flexWrap: "wrap",
          }}
        >
          <Box flex={1}>
            <GlobelBtn
              btnText={proceedText ? proceedText : `${t("modals.yes")}`}
              bgColor="#fff"
              borderRadius="23px"
              color="#30422E"
              width="100%"
              // fontSize={{ md: "18px", sm: "13.627px", xs: "8.542px" }}
              // border="1px solid #30422E"
              onClick={proceed}
            />
          </Box>
          <Box flex={1}>
            <GlobelBtn
              btnText={cancelText ? cancelText : `${t("modals.no")}`}
              bgColor="#30422E"
              borderRadius="23px"
              color="#fff"
              width="100%"
              // fontSize={{ md: "18px", sm: "13.627px", xs: "8.542px" }}
              // border="1px solid #30422E"
              onClick={cancel}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
