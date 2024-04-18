'use client'

import Head from 'next/head';
import NavBar from "@/__webComponents/navBar/NavBar";
import { Box } from "@mui/material";
import Working from "@/__webComponents/working/Working";
import Introduction from "./sections/Introduction";
import Suggestion from "./sections/Suggestion";
import StoryTelling from "./sections/StoryTelling";
import Reviews from "./sections/Reviews";
import Experience from "@/__webComponents/experience/Experience";
import GifTab from "./sections/GifTab";
import Pricing from "@/__webComponents/pricing/Pricing";
import Footer from "@/__webComponents/footer/Footer";
import Testimonial from "./sections/Testimonial";
import ContactFooter from "@/__webComponents/footer/ContactFooter";
import OurBooks from "./sections/OurBooks";
import GotQuestions from "@/__webComponents/questions/GotQuestions";

import Shape from "@/__webAssets/svgs/input-shape.svg"
import Logo from "@/__webAssets/svgs/logo.svg"
import Gift from "@/__webAssets/svgs/gift.svg"

const HomePage = () => {

  const pointsArray = [
    {
      no: "01",
      title: "Answer questions weekly",
      discription: "Or as often as you like"
    },
    {
      no: "02",
      title: "Turn answers into a chapter with a click",
      discription: "No writing experience needed."
    },
    {
      no: "03",
      title: "Repeat for all chapters",
      discription: "As many as you like."
    },
    {
      no: "04",
      title: "Receive a beautiful hardcover book",
      discription: "With free shipping."
    }
  ]

  return (
    <>
      <Head>
        <title>Easily Create or Gift a Personal Autobiography Book - LifeScript</title>
        <meta name="description" content="Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad, or grandparent." />
      </Head>


      <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
        <NavBar logo={Logo} color="#3E4F3C" />
        <Introduction />
        <Working data={pointsArray} heading=" How it" marked="works" />
        <Suggestion />
        <GifTab
          heading="Surprise your loved one with LifeScript and let them transform their memories into a keepsake book."
          button="Gift Now!!"
          icon={Gift}
        />
        <StoryTelling />
        <Reviews />
        <Box sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
          <Experience />
        </Box>
        <Pricing />
        <OurBooks />
        <Testimonial />
        <GotQuestions />
        <ContactFooter
          title="Missed the moment? Set a"
          marked="reminder!"
          date={true}
          subTitle="Complete the form, and we'll send you a reminder as your loved one's special day approaches."
          input1="Your email address"
          input2="What’s the occasion?"
          input3="When it’s happening?"
          button="Remind Me"
          shape={Shape}
        />
        <Footer />
      </Box >
    </>
  )
}

export default HomePage;