import GlobelBtn from "@/components/button/Button";
import { Box, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from "react";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import QaTabBars from "./qaTabBars";

export default function TabOne({ onClick, data, setQaTab }) {
  const [selectedValue, setSelectedValue] = useState();
  console.log("333344", selectedValue);

  useEffect(() => {
    setSelectedValue(data || "MySelf");
  }, [data]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
      }}
    >
      <Box>
        <Box
          sx={{
            color: "black",
            gap: "8px",
            mt: "20px",
            display: { sm: "block", xs: "none" },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: "44px", sm: "36px", xs: "26px" },
              fontWeight: 700,
            }}
          >
            For Whom?
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "16px", sm: "14px", xs: "12px" },
              fontWeight: 700,
              color: "rgba(78, 81, 109, 0.70)",
            }}
          >
            Who will use lifescript?
          </Typography>
        </Box>
        <QaTabBars tabProp={1} />
        <Box sx={{ mt: { md: 6, sm: 4, xs: 2 } }}>
          <Typography
            sx={{
              fontSize: { md: "33px", sm: "25px", xs: "20px" },
              fontWeight: 700,
              color: "black",
            }}
          >
            Who will use lifescript?
          </Typography>
          <Box
            sx={{
              mt: { md: 3, sm: 2, xs: 1 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <RadioGroup value={selectedValue} onChange={handleChange}>
              <FormControlLabel
                value="MySelf"
                checked={selectedValue === "MySelf"}
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
                      ml: { md: 2, sm: 1, xs: 0.5 },
                      fontSize: { md: "24px", sm: "20px", xs: "16px" },
                      fontWeight: 400,
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    I am writing my biography
                  </Typography>
                }
              />
              <FormControlLabel
                value="BelovedOne"
                checked={selectedValue === "BelovedOne"}
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
                      ml: { md: 2, sm: 1, xs: 0.5 },
                      fontWeight: 400,
                      color: "rgba(0, 0, 0, 0.6)",
                      fontSize: { md: "24px", sm: "20px", xs: "16px" },
                    }}
                  >
                    I am gifting life story to a loved one
                  </Typography>
                }
              />
              <FormControlLabel
                value="SomeOne"
                checked={selectedValue === "SomeOne"}
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
                      ml: { md: 2, sm: 1, xs: 0.5 },
                      fontSize: { md: "24px", sm: "20px", xs: "16px" },
                      fontWeight: 400,
                      color: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    I am using life story for someone
                  </Typography>
                }
              />
            </RadioGroup>
          </Box>
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
          bgColor="#30422E"
          color="white"
          btnText="Next"
          onClick={() => onClick(selectedValue)}
          image2={NextArrow}
        />
      </Box>
    </Box>
  );
}
