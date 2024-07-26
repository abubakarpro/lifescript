
import GlobelBtn from "@/components/button/Button";
import { bookTitle, getBookTitle } from "@/store/slices/chatSlice";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./GetTitle.module.css";

import BookImage from "../../../public/getTitleBook.png";
import DotsLeft from "@/_assets/svg/dots-left.svg";
import DotsRight from "@/_assets/svg/dots-right.svg";

const getTitle = () => {
  const name = localStorage.getItem("username");
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { userName } = router.query;
  const [text, setText] = useState(`Life of ${userName ? userName : name}`);
  const maxLength = 30; 
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= maxLength) {
      setText(inputText);
    }
  };

  const handleTitle = () => {
    dispatch(bookTitle({ title: text }))
      .unwrap()
      .then(() => {
        toast.success("Book title saved successfully");
        router.push(`/dashboard/Questionnaire?userName=${userName}`);  
      })
      .catch(() => {
        toast.error("Failed to save book title");
      });


  };

  useEffect(() => {
    setLoading(true);
    dispatch(getBookTitle())
      .unwrap()
      .then((res) => {
        if (res.length > 0 && res[0].title !== "") {
          setTimeout(() => {
            router.push("/dashboard/chapters");
            setLoading(false);
          }, 3000);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      })
      .catch(() =>
        setTimeout(() => {

          router.push(`/dashboard/Questionnaire?userName=${userName}`);
          setLoading(false);
        }, 3000)
      );
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: { xs: "#F3ECDA" },
            borderTop: { xs: "55px solid #30422E", sm: "none" },
            borderBottom: { xs: "55px solid #30422E", sm: "none" },
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#000",
            position: "relative",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            sx={{
              marginLeft: { md: "90px", sm: "50px", xs: "0" },
              padding: { xs: "20px 15px", sm: "0" },
              height: "100%", bg: "red",
              width: { sm: "50%", xs: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Box sx={{ maxWidth: "70%" }}>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: { md: "53px", sm: "40px", xs: "30px" },
                  marginTop: "32px",
                }}
                className={styles.primaryText}
              >
                {t("getTitle.getQues")}
              </Typography>
              <Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column" }}
                  className={styles.primaryText}
                >
                  <TextField
                    variant="standard"
                    value={text}
                    onChange={handleChange}
                    sx={{
                      maxWidth: "540px",
                      minWidth: "120px",
                      marginTop: "30px",
                    }}
                    className={styles.primaryText}
                    InputProps={{
                      style: { fontSize: "30px" },
                    }}
                  />
                  <Typography
                    sx={{
                      alignSelf: "flex-start",
                      color: "#969696",
                      fontSize: {
                        xl: "25px",
                        lg: "22px",
                        md: "20px",
                        sm: "18px",
                        xs: "16px",
                      },
                      ml: "15px",
                      mt: "15px"
                    }}
                  >
                    {t("getTitle.inputBottom")}
                  </Typography>
                </Box>
                <Box mt="50px">
                  <GlobelBtn
                    disabled={!text}
                    color='#fff'
                    onClick={() => handleTitle()}
                    btnText={`${t("getTitle.getBtn")}`}
                    width={"200px"}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ height: "100%", display: { sm: "flex", xs: "none" }, alignItems: "center", bgcolor: "#30422E", width: "40%" }}
          >
            <Image src={BookImage} alt="book image" className={styles.book} />
          </Box>
          <Image alt="image" src={DotsLeft} className={styles.topLeft} />
          <Image alt="image" src={DotsRight} className={styles.bottomRight} />
        </Box>
      )}
    </Box>
  );
};

export default getTitle;
