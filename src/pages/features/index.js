'use client'

import { Box } from "@mui/material";
import FeaturesIntroduction from "../../__webComponents/Introduction/Introduction";
import FeaturesItems from "./sections/Features";
import Footer from "@/__webComponents/footer/Footer";
import ContactFooter from "@/__webComponents/footer/ContactFooter";

const FeaturesPage = () => {
  return (
    <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
      <FeaturesIntroduction
        heading="Features That Make Your Storytelling Experience Fun and  "
        keyWorld="Easy"
      />
      <FeaturesItems />
      <ContactFooter
        title="Still confused? Ask away!"
        input1="Your name"
        input2="Your email address"
        input3="What’s on your mind?"
        button="Get in touch!"
      />
      <Footer />
    </Box>
  )
}

export default FeaturesPage;