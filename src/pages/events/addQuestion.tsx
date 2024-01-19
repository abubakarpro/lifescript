import GlobelBtn from "@/components/button/Button";
import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AddQuestionProps {
  questionData?: (question: string) => void; // Assuming the return type is void, modify as needed
  questionText?: string;
  btnText: string;
}
export default function AddQuestion({
  questionData,
  questionText,
  btnText,
}: AddQuestionProps) {
  const [question, setQuestion] = useState("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    questionData(question);
  };

  useEffect(() => {
    setQuestion(questionText);
  }, [questionText]);
  return (
    <Box sx={{ margin: "10px" }}>
      <Box>
        <TextField
          variant="outlined"
          placeholder={`${t("ChName.AddQuesBtn")}`}
          name="email"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: "white",
              height: { md: "50px", sm: "45px", xs: "40px" },
            },
            width: { sm: "400px", xs: "100%" },
          }}
        />
      </Box>
      <Box sx={{ justifyContent: "center", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            mt: "20px",
            opacity: question ? "1" : "0.4",
          }}
        >
          <GlobelBtn
            disabled={!question}
            btnText={btnText}
            bgColor="#30422E"
            borderRadius="23px"
            color="#fff"
            // width={{ md: "234px", sm: "153px", xs: "103px" }}
            border="1px solid #30422E"
            onClick={(event: any) => handleSubmit()}
          />
        </Box>
      </Box>
    </Box>
  );
}
