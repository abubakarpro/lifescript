import GlobelBtn from "@/components/button/Button";
import { Box, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import backArrow from "../../../_assets/svg/left.svg";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import QaTabBars from "./qaTabBars";
import { useTranslation } from "react-i18next";

export default function TabThree({ onClickBack, onClickNext, data, setQaTab }) {
  const [personalQuestion, setPersonalQuestion] =
    useState("ChronologicalOrder");
  const [questionFrequency, setQuestionFrequency] = useState("ONEDAY");
  const { t } = useTranslation();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
      }}>
      <Box
        sx={{
          color: "#30422E",
          alignItems: "center",
          gap: "8px",
          mt: "20px"
        }}
      >
        <Typography
          sx={{
            fontSize: { md: "44px", sm: "36px", xs: "26px" },
            fontWeight: 700,
          }}
        >
          {t("onboarding.step4.step")}
        </Typography>
      </Box>
      <QaTabBars tabProp={4} />
      <Box sx={{ mt: 10 }}>
        <Typography
          sx={{
            fontSize: { md: "33px", sm: "25px", xs: "20px" },
            fontWeight: 700,
            color: "#30422E",
          }}
        >
          {t("onboarding.step4.question.statement")}
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
                   {t("onboarding.step4.question.options.option1")}
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
                 {t("onboarding.step4.question.options.option2")}
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
                {t("onboarding.step4.question.options.option3")}
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
                  {t("onboarding.step4.question.options.option4")}
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box
        flex={1}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          gap: 2,
        }}
      >
        <GlobelBtn
          bgColor="#ffffff"
          border='1px solid #E1683B'
          borderRadius="4px"
          color="#E1683B"
          btnText={t("onboarding.step2.buttonText.back")}
          onClick={onClickBack}
          image={backArrow}
        />

        <GlobelBtn
          borderRadius="4px"
          bgColor="#E1683B"
          color="white"
          btnText={t("onboarding.step2.buttonText.takemein")}
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
  );
}
