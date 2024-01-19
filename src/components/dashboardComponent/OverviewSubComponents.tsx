import ModalImage from "@/_assets/png/view-template-modal.png";
import NextIcon from "@/_assets/svg/next-icon.svg";
import { getChapters, selectAllChapters } from "@/store/slices/chatSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import GlobelBtn from "../button/Button";
import CustomizationDialog from "../modal/CustomizationDialog";
import TransitionsDialog from "../modal/TransitionDialog";
import styles from "./Custom.module.css";

export const ViewBook = () => {
  const dispatch: any = useDispatch();
  const chapters = useSelector(selectAllChapters);
  const [viewReady, setViewReady] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [buyPremium, setBuyPremium] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const accessRole = decodedToken.accessRole;
      console.log("roleee", accessRole);
      if (accessRole !== "FreePlan") {
        setIsPremium(true);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getChapters());
  }, []);

  useEffect(() => {
    if (chapters.length > 0) {
      const inProgressChapters = chapters.filter(
        (chapter) =>
          chapter.status !== true && chapter.compilingStatus === false
      );
      inProgressChapters.length > 0 ? setViewReady(false) : setViewReady(true);
    }
  }, [chapters]);

  const router = useRouter();
  const { t } = useTranslation();
  return (
    <>
      <Box
        onClick={() => {
          if (!viewReady) {
            setOpenModal(true);
          } else if (!isPremium) {
            setBuyPremium(true);
          } else {
            router.push("/dashboard/BookView");
          }
        }}
        sx={{
          bgcolor: "#30422E",
          color: "#fff",
          width: "100%",
          padding: "16px 0",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
        }}
        className={styles.viewBook}
      >
        <Typography
          sx={{
            fontSize: { xl: "21px", sm: "18px", xs: "12px" },
            fontWeight: 500,
          }}
        >
          {t("overView.ViewBtn")}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: "10%" },
            transform: "translateY(-50%)",
            height: "19.603px",
            width: "13px",
          }}
        >
          <Image alt="next" src={NextIcon} className={styles.nextAero} />
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
            Complete all chapters before View Book
          </Typography>
          <Box
            sx={{
              margin: { md: "40px 0 30px", sm: "22px 0", xs: "16px 0" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GlobelBtn
              btnText="Edit"
              bgColor="#30422E"
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

      <TransitionsDialog
        open={buyPremium}
        heading="Buy Premium"
        description="This feature is not avaiable in Free trial."
        cancel={() => {
          setBuyPremium(false);
        }}
        closeModal={() => {
          setBuyPremium(false);
        }}
        proceed={() => router.push("/dashboard/SubscribePlans")}
      />
    </>
  );
};

export const ViewTree = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Box
      onClick={() => router.push("/familyTree")}
      sx={{
        bgcolor: "#30422E",
        cursor: "pointer",
        color: "#fff",
        width: "100%",
        padding: "16px 0",
        borderRadius: "14px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={styles.viewTree}
    >
      <Typography
        sx={{
          fontSize: { xl: "21px", sm: "18px", xs: "12px" },
          fontWeight: 500,
        }}
      >
        {t("overView.famliyTreeBtn")}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "10%",
          transform: "translateY(-50%)",
          height: "19.603px",
          width: "13px",
        }}
      >
        <Image alt="next" src={NextIcon} className={styles.nextAero} />
      </Box>
    </Box>
  );
};

export const PrintBook = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        color: "#30422E",
        bgcolor: "#fff",
        width: "100%",
        padding: { lg: "30px 30px", xs: "25px" },
        borderRadius: "19px",
        display: "flex",
        flexDirection: { sm: "row", xs: "column" },
        justifyContent: "space-between",
        gap: "15px",
        border: "1px solid #30422E",
      }}
    >
      <Box sx={{ width: { md: "65%", sm: "85%", xs: "90%" } }}>
        <Typography
          sx={{ fontSize: { xl: "33px", sm: "28px" }, fontWeight: 700 }}
        >
          {t("overView.EverySpecial")}
        </Typography>
        <Typography
          sx={{ fontSize: { xl: "14px", sm: "12px" }, marginTop: "15px" }}
        >
          Lorem ipsum dolor sit amet consectetur. Morbi eleifend sapien
          vestibulum ante facilisis. Ultrices tincidunt elit
        </Typography>
      </Box>
      <Box>
        <GlobelBtn
          bgColor="#30422E"
          color="white"
          btnText={`${t("overView.continue")}`}
          // onClick={}
          width={{ xl: "250px", sm: "180px" }}
        />
      </Box>
    </Box>
  );
};
