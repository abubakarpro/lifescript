'use client'

import { Box } from "@mui/material";
import Footer from "@/__webComponents/footer/Footer";
import ContactFooter from "@/__webComponents/footer/ContactFooter";
import FeaturesIntroduction from "@/__webComponents/Introduction/Introduction";
import Mission from "./sections/Mission";
import Story from "./sections/Stories";
import Values from "./sections/Values";

const AboutUs = () => {
  return (
    <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>

      <FeaturesIntroduction heading="Empowering people to create a timeless legacy, resonating across" width="75%" keyWorld=" generations." />
      <Mission />
      <Story />
      <Values />
      <ContactFooter
        title="Still confused? Ask"
        marked=" away!"
        lineWidth={150}
        subTitle="Contact us Now!!!"
        input1="Your name"
        input2="Your email address"
        input3="What’s on your mind?"
        button="Get in touch!"
      />
      <Footer />
    </Box>
  )
}

export default AboutUs;