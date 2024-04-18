'use client'

import { Box } from "@mui/material";
import Footer from "@/__webComponents/footer/Footer";
import TermsAndConditions from "./TermsAndConditions";

const TermsOfUse = () => {
  return (
    <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
      <TermsAndConditions />
      <Footer />
    </Box>
  )
}

export default TermsOfUse;