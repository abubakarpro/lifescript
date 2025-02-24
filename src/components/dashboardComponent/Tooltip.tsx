import { Box, Typography } from "@mui/material";

export default function Tooltip({
  title,
  text,
  position = "fixed",
  top = "0px",
  left = "33%",
  transform = "translate(-35%)",
}) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "2px solid #E1683B",
        borderRadius: "4px",
        width: "360px",
        height: "auto",
        position: position,
        bottom: "30px",
        left: left,
        transform: transform,
        boxShadow: "7px 10px 50px rgba(0, 0, 0, 0.25)",
        zIndex: "3",
        padding: "12px",
      }}
    >
      <Typography
        sx={{
          fontSize: "17px",
          fontWeight: 500,
          color: "#3e4f3c",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 300,
          color: "#3E4F3C",
          lineHeight: "150%",
          whiteSpace: "wrap",
          width: "90%",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}


export function TooltipMsg({ width, left, top, bottom, right, title }) {
  return (
    <Box sx={{
      bgcolor: "#fff",
      border: "1px solid #E1683B",
      borderRadius: "4px",
      boxShadow: "7px 10px 50px rgba(0, 0, 0, 0.25)",
      zIndex: "5",
      padding: "15px 15px",
      position: "absolute",
      color: "#30422E",
      fontSize: { sm: "14px", xs: "10px" },
      lineHeight: "20px",
      width: width,
      left: left,
      top: top,
      bottom: bottom,
      right: right
    }}>
      {title}
    </Box>
  )
}
