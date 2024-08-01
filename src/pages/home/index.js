"use client";

import Head from "next/head";
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

import Shape from "@/__webAssets/svgs/input-shape.svg";
import Logo from "../../../public/lifescript-life-story-book-logo.svg";
import Gift from "@/__webAssets/svgs/gift.svg";
import { useTranslation } from "react-i18next";
const HomePage = () => {
  const { t } = useTranslation();

  const pointsArray = [
    {
      no: "01",
      title: t("landingPage.howItWorks.step1.title"),
      discription: t("landingPage.howItWorks.step1.description"),
    },
    {
      no: "02",
      title: t("landingPage.howItWorks.step2.title"),
      discription: t("landingPage.howItWorks.step2.description"),
    },
    {
      no: "03",
      title: t("landingPage.howItWorks.step3.title"),
      discription: t("landingPage.howItWorks.step3.description"),
    },
    {
      no: "04",
      title: t("landingPage.howItWorks.step4.title"),
      discription: t("landingPage.howItWorks.step4.description"),
    },
  ];

  return (
    <>
      <Head>
        <title>
          Easily Create or Gift a Personal Autobiography Book - LifeScript
        </title>
        <meta
          name="description"
          content="Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad, or grandparent."
        />
      </Head>

      <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
        <NavBar logo={"home"} color="#3E4F3C" />
        <Introduction />
        <Working
          data={pointsArray}
          heading={t("landingPage.howItWorks.heading")}
          marked={t("landingPage.howItWorks.subHeading")}
          width={"300px"}
        />

        <Suggestion />
        <GifTab
          heading={t("landingPage.perfectSection.content5.cardText")}
          button={t("landingPage.perfectSection.content5.btntext")}
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
          title={t("landingPage.reminderSection.title")}
          marked={t("landingPage.reminderSection.subTitle")}
          date={true}
          subTitle={t("landingPage.reminderSection.description")}
          input1={t("landingPage.reminderSection.input1")}
          input2={t("landingPage.reminderSection.input2")}
          input3={t("landingPage.reminderSection.input3")}
          button={t("landingPage.reminderSection.btnText")}
          shape={Shape}
        />
        <Footer />
      </Box>
    </>
  );
};

export default HomePage;
