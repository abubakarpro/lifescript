import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

const steps = ["20%", "40%", "60%", "80%", "100%"];

export default function ProgressBar() {
  const activeStep = 2; // Set the active step index (0-indexed)

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          width: "100%",
          "& .MuiStepConnector-line": {
            border: "none",
            width: "100%",
            height: "10px",
            background: (theme) => (activeStep === 2 ? "#30422E" : "#EDEDED"),
            mt: -0.7,
          },
          "& .MuiSvgIcon-root": {
            color: "#30422E",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
