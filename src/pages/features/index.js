'use client'

import Head from 'next/head';
import { Box } from "@mui/material";
import FeaturesIntroduction from "../../__webComponents/Introduction/Introduction";
import FeaturesItems from "./sections/Features";
import Footer from "@/__webComponents/footer/Footer";
import ContactFooter from "@/__webComponents/footer/ContactFooter";

const FeaturesPage = () => {
  return (
    <>
      <Head>
        <title>Features That Make Your Storytelling Fun and Easy</title>
        <meta name="description" discription="Take advantage of our assisted editing, text formatting features, voice-to-text, family tree, automatic photo improvement, premium book covers and more." />
      </Head>


      <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
        <FeaturesIntroduction
          heading="Features That Make Your Storytelling Experience Fun and  "
          keyWorld="Easyyy"
        />
        <FeaturesItems />
        <ContactFooter
          title="Still confused? Ask"
          marked=" away!"
          lineWidth={150}
          input1="Your name"
          input2="Your email address"
          input3="What’s on your mind?"
          button="Get in touch!"
        />
        <Footer />
      </Box>
    </>
  )
}

export default FeaturesPage;