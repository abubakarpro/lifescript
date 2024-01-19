import GlobelBtn from "@/components/button/Button";
import { Box, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import backArrow from "../../../_assets/svg/left.svg";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import QaTabBars from "./qaTabBars";

export default function TabThree({ onClickBack, onClickNext, data, setQaTab }) {
  const [personalQuestion, setPersonalQuestion] =
    useState("ChronologicalOrder");
  const [questionFrequency, setQuestionFrequency] = useState("ONEDAY");

  useEffect(() => {
    if (data?.personalizedQuestion) {
      setPersonalQuestion(data.personalizedQuestion);
      setQuestionFrequency(data.questionAskType);
    }
  }, [data]);

  const handlePersonalInfo = (event) => {
    setPersonalQuestion(event.target.value);
  };
  const handleQuestionFrequency = (event) => {
    setQuestionFrequency(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          color: "black",
          display: { sm: "flex", xs: "none" },
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "44px", sm: "36px", xs: "26px" },
            fontWeight: 700,
          }}
        >
          Details
        </Typography>
        <Typography
          sx={{
            fontSize: { md: "16px", sm: "14px", xs: "12px" },
            fontWeight: 700,
            color: "rgba(78, 81, 109, 0.70)",
          }}
        >
          Details for personalized questions
        </Typography>
      </Box>
      <QaTabBars tabProp={3} />
      <Box sx={{ mt: 6 }}>
        <Typography
          sx={{
            fontSize: { md: "33px", sm: "25px", xs: "20px" },
            fontWeight: 700,
            color: "black",
          }}
        >
          Details for personalized questions
        </Typography>
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <RadioGroup value={personalQuestion} onChange={handlePersonalInfo}>
            <FormControlLabel
              value="ChronologicalOrder"
              checked={personalQuestion === "ChronologicalOrder"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "rgba(25, 112, 101, 1)",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    ml: 2,
                    fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Chronological order (starting from early childhood till
                  current age)
                </Typography>
              }
            />
            <FormControlLabel
              value="RandomOrder"
              checked={personalQuestion === "RandomOrder"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "rgba(25, 112, 101, 1)",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    ml: 2,
                    fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Random order
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            fontSize: { md: "33px", sm: "25px", xs: "20px" },
            fontWeight: 700,
            color: "black",
          }}
        >
          What should be the frequency of the questions?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <RadioGroup
            value={questionFrequency}
            onChange={handleQuestionFrequency}
          >
            <FormControlLabel
              value="ONEDAY"
              checked={questionFrequency === "ONEDAY"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "rgba(25, 112, 101, 1)",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    ml: 2,
                    fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Once in a day
                </Typography>
              }
            />
            <FormControlLabel
              value="TWODAYS"
              checked={questionFrequency === "TWODAYS"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "rgba(25, 112, 101, 1)",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    ml: 2,
                    fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Once in 2 days
                </Typography>
              }
            />
            <FormControlLabel
              value="FIVEDAYS"
              checked={questionFrequency === "FIVEDAYS"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "rgba(25, 112, 101, 1)",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    ml: 2,
                    fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Once in 5 days
                </Typography>
              }
            />
            <FormControlLabel
              value="SEVENDAYS"
              checked={questionFrequency === "SEVENDAYS"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "rgba(25, 112, 101, 1)",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    ml: 2,
                    fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    fontWeight: 400,
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Once in a week
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          mt: {
            sm: "0px",
            xs: "20px",
          },
        }}
      >
        <Box>
          <GlobelBtn btnText="Back" onClick={onClickBack} image={backArrow} />
        </Box>
        <Box>
          <GlobelBtn
            bgColor="#30422E"
            color="white"
            btnText="Take me in"
            onClick={() =>
              onClickNext({
                personal: personalQuestion,
                frequency: questionFrequency,
              })
            }
            image2={NextArrow}
          />
        </Box>
      </Box>
    </>
  );
}
