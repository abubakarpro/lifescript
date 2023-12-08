import { updateChapter } from "@/store/slices/chatSlice";
import { Box, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BookImage from "../../../public/chapterName.svg";
import Check from "../../../public/checkIcon.png";
import styles from "./AddChapterName.module.css";

const AddChapterName = ({
  chapter,
  chapterId,
  title,
}: {
  chapter: string;
  chapterId: any;
  title?: string;
}) => {
  const [chapterName, setChapterName] = useState("");
  const dispatch: any = useDispatch();

  const saveChapterName = () => {
    dispatch(updateChapter({ title: chapterName, id: chapterId }))
      .then(() => {
        toast.success("Chapter name updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update chapter name");
      });
  };

  useEffect(() => {
    chapter && setChapterName(chapter);
  }, [chapter]);

  return (
    <Box
      sx={{
        backgroundColor: "#197065",
        color: "#fff",
        borderRadius: { sm: "24px", xs: "5px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "165px",
        overflow: "hidden",
        width: "100%"
      }}
      className={styles.welcomeMain}
    >
      <Box
        sx={{
          padding: { sm: "27px 20px", xs: "10px 15px" },
          position: "relative",
          zIndex: "1"
        }}
      >
      {title === "templateView" && (
        <Typography
          sx={{
            fontSize: {
              xs: "25px",
              sm: "28.707px",
              md: "32px",
              lg: "39.707px",
            },
          }}
        >
          {chapter}
        </Typography>
      )}
      {title != "templateView" && (
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "22px",
                sm: "24.707px",
                md: "28px",
                lg: "39.707px",
              },
              fontWeight: 600,
            }}
          >
            Chapter Name
          </Typography>
          <Box>
            <TextField
              variant="outlined"
              value={chapterName}
              onChange={(e: any) => setChapterName(e.target.value)}
              placeholder="My Adventurous Life"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box sx={{ cursor: "pointer" }}>
                      <Image
                        onClick={saveChapterName}
                        src={Check}
                        alt="check-icon"
                      />
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginTop: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: { sm: "50px", md: "20px" },
                  backgroundColor: "white",
                },
                width: { sm: "300px", lg: "390px" },
              }}
            />
          </Box>
        </Box>
      )}
      </Box>
      <Box
        sx={{
          background:{xs: "transparent", sm:"#17756A"},
          height: {
            sm: "400px",
          },
          width: {
            xs: "230px",
            sm: "260px",
            lg: "360px",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",

        }}
      >
        <Image src={BookImage} alt="book image" className={styles.bookImage} />
      </Box>
    </Box>
  );
};

export default AddChapterName;
