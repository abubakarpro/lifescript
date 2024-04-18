'use client'

import { Box } from "@mui/material";
import Footer from "@/__webComponents/footer/Footer";
import Policy from "./Policy";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
      <Policy />
      <Footer />
    </Box>
  )
}

export default PrivacyPolicy;