import ModalImage from "@/_assets/png/view-template-modal.png";
import GlobelBtn from "@/components/button/Button";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
import { getBookInterior } from "@/store/slices/authSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import TOCMain from "../TableOfContent/components/TOCMain";
import { useTranslation } from "next-i18next";
import {selectTocData}from "@/store/slices/chatSlice";

const TableOfContentTab = ({ setSelectedTab, bookData }) => {
  const dispatch: any = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const data= useSelector(selectTocData)


  const handleClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <Box>
      <Box
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <TOCMain />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: "40px"
          }}
        >
          <GlobelBtn
            bgColor="#E1683B"
            color="white"
            disabled={data?.tableOfContent?.length === 0}
            btnText={loading ? "Loading..." : t("reviewBook.nextBtn")}
            width="110px"
            onClick={() => {
              if (!loading) {
                setLoading(true);
                dispatch(getBookInterior())
                  .unwrap()
                  .then((res) => {
                    bookData({ link: res.bookPdf, pages: res.totalPages });
                    setSelectedTab(1);
                    setLoading(false);
                  })
                  .catch((error) => {
                    setLoading(false);

                    setOpenModal(true);
                  });
              }
              setSelectedTab(1);
            }}
          />
        </Box>
      </Box>
      <CustomizationDialog
        open={openModal}
        title=""
        handleClose={() => {
          setOpenModal(false);
          router.push("/dashboard/chapters");
        }}
        customStyles={{ backgroundColor: "auto", borderRadius: "22px" }}
        marginTop={0}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: { md: "91.555px", sm: "66.161px", xs: "47px" },
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
            Sorry!
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "16.5px", sm: "16.259px", xs: "11.631px" },
              color: "#070707",
              width: { md: "400px", sm: "300px", xs: "180px" },
              margin: { md: "0 120px", sm: "0px 55px", xs: "0px" },
            }}
          >
            Interior is not enough to create book! Kindly write more content.
          </Typography>
          <Box
            sx={{
              margin: { md: "40px 0 30px", sm: "22px 0", xs: "16px 0" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GlobelBtn
              btnText="Start Writing"
              bgColor="#197065"
              color="white"
              onClick={() => {
                router.push("/dashboard/chapters");
                setOpenModal(false);
              }}
              width={{ md: "234px", sm: "153px", xs: "103px" }}
            />
          </Box>
        </Box>
      </CustomizationDialog>
    </Box>
  );
};

export default TableOfContentTab;
