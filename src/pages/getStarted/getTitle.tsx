import GreenBlock from "@/_assets/png/getTitle-green-block.png";
import WhiteBlock from "@/_assets/png/getTitle-white-block.png";
import GlobelBtn from "@/components/button/Button";
import { bookTitle, getBookTitle } from "@/store/slices/chatSlice";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BookImage from "../../../public/getTitleBook.svg";
import styles from "./GetTitle.module.css";

const getTitle = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { userName } = router.query;
  const [text, setText] = useState("");
  const maxLength = 30; // Set the maximum character count to 20
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
        router.push("/dashboard/chapters");
      })
      .catch(() => {
        toast.error("Failed to save book title");
      });

    console.log("text", text);
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
          console.log("fail");
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
            backgroundImage: { sm: 'url("/GetTitle.svg")' },
            bgcolor: { xs: "#F3ECDA" },
            borderTop: { xs: "55px solid #30422E", sm: "none" },
            borderBottom: { xs: "55px solid #30422E", sm: "none" },
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: { sm: "100vh", xs: "100vh" },
            minHeight: "100%",
            margin: 0,
            padding: 0,
            gap: 0,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            color: "#000",
            position: "relative",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            sx={{
              marginLeft: { sm: "30px", xs: "20px" },
              padding: { xs: "20px 15px", sm: "0" },
            }}
          >
            <Typography
              sx={{
                fontSize: { md: "53px", sm: "40px", xs: "30px" },
                fontWeight: "400",
                marginTop: { sm: "120px" },
              }}
              className={styles.primaryText}
            >
              {t("getTitle.hi")}{" "}
              <span style={{ fontWeight: "600" }}>{userName},</span>
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: { md: "53px", sm: "40px", xs: "30px" },
                marginTop: "32px",
                width: "70%",
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
                  }}
                >
                  {t("getTitle.inputBottom")}
                </Typography>
              </Box>
              <Box mt="50px">
                <GlobelBtn
                  disabled={!text}
                  onClick={() => handleTitle()}
                  btnText={`${t("getTitle.getBtn")}`}
                  width={"200px"}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ height: "100%", display: "flex", alignItems: "center" }}
            className={styles.bookDiv}
          >
            <Image src={BookImage} alt="book image" className={styles.book} />
          </Box>
          <Image alt="image" src={GreenBlock} className={styles.greenBlock} />
          <Image alt="image" src={WhiteBlock} className={styles.whiteBlock} />
        </Box>
      )}
    </Box>
  );
};

export default getTitle;
