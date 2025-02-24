import GlobelBtn from "@/components/button/Button";
import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddChapter({ chapterData, data, btnText = "Submit" }) {
  const { t } = useTranslation();
  const [chapter, setChapter] = useState("");
  useEffect(() => {
    data && setChapter(data);
  }, [data]);

  const handleSubmit = () => {
    chapterData(chapter);
  };

  return (
    <Box sx={{ margin: "10px" }}>
      <Box>
        <TextField
          variant="outlined"
          placeholder={`${t("ChModals.placeHolder")}`}
        
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              backgroundColor: "white",
              height: { md: "50px", sm: "45px", xs: "40px" },
            },
            width: { sm: "400px", xs: "100%" },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          mt: "20px",
          opacity: chapter ? "1" : "0.4",
        }}
      >
        <GlobelBtn
          disabled={!chapter}
          btnText={btnText}
          // btnText={"Add Chapter"}
          bgColor="#e1693b"
          color="#fff"
          // width={{ md: "234px", sm: "153px", xs: "103px" }}
          // border="1px solid #197065"
          onClick={(event: any) => handleSubmit()}
        />
      </Box>
    </Box>
  );
}
