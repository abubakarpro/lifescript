"use client";

import PrimaryHeading from "@/__webComponents/headings/PrimaryHeading"
import { Box } from "@mui/material"
import Image from "next/image"
import styles from "./HomeSections.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Book1 from "@/__webAssets/webp/bookCovers/anniversary-celebration-gift-book-cover-design.webp"
import Book2 from "@/__webAssets/webp/bookCovers/family-full-picture-life-story-book-cover-design.webp"
import Book3 from "@/__webAssets/webp/bookCovers/grandma-birthday-gift-book-cover-design.webp"
import Book4 from "@/__webAssets/webp/bookCovers/grandparents-book-cover-design.webp"
import Book5 from "@/__webAssets/webp/bookCovers/memoir-gift-book-cover-design.webp"
import Book6 from "@/__webAssets/webp/bookCovers/simplistic-autobiography-book-cover-design-minimalistic.webp"
import Left from "@/__webAssets/pngs/aero-left.png"
import Right from "@/__webAssets/pngs/aero-right.png"

import { useRef, useState } from "react";

const OurBooks = () => {

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <Box
      sx={{
        padding: { lg: "160px 0 110px", md: "150px 0 100px", sm: "100px 0 ", xs: "100px 0" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}
      className={styles.bookBox}
    >
      <PrimaryHeading lineWidth="160px" showStyle={true} heading="Our " marked="Books" color="#F3ECDA" />

      <Box position="relative" sx={{ marginTop: { sm: "120px", xs: "70px" }, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Slider {...settings} className={styles.slider} ref={sliderRef}>
          <Box sx={{ width: { sm: "450px", xl: "500px" } }}>
            <Image
              src={Book1}
              alt="A book cover design with an old man celebrating anniversary with his wife on a swing - LifeScript"
              title="Half picture-half title book cover design"
              className={styles.book}
            />
          </Box>
          <Box sx={{ width: { sm: "450px", xl: "500px" } }}>
            <Image
              src={Book2}
              alt="A full book cover picture design of a life story book with family standing in front of a lake - LifeScript"
              title="Full-picture book cover design"
              className={styles.book}
            />
          </Box>
          <Box sx={{ width: { sm: "450px", xl: "500px" } }}>
            <Image
              src={Book3}
              alt="A book cover design with an old couple celebrating grandma birthday - LifeScript"
              title="Full-picture book cover design"
              className={styles.book}
            />
          </Box>
          <Box sx={{ width: { sm: "450px", xl: "500px" } }}>
            <Image
              src={Book4}
              alt="A book cover design with a couple in the forest enjoying the sun and playing around - LifeScript"
              title="Side picture book cover design"
              className={styles.book}
            />
          </Box>
          <Box sx={{ width: { sm: "450px", xl: "500px" } }}>
            <Image
              src={Book5}
              alt="Memoir book cover design with small picture of author and customizable text - LifeScript"
              title="Memoir book cover design"
              className={styles.book}
            />
          </Box>
          <Box sx={{ width: { sm: "450px", xl: "500px" } }}>
            <Image
              src={Book6}
              alt="Simplistic design of autobiography book cover with minimalistic elements that you can customize - LifeScript"
              title="Simplistic design of autobiography book cover"
              className={styles.book}
            />
          </Box>
        </Slider>

        {/* <Image src={Left} alt="icon" className={styles.leftAero} onClick={goToPrevSlide} />
        <Image src={Right} alt="icon" className={styles.rightAero} onClick={goToNextSlide} /> */}
      </Box>

    </Box>
  )
}
export default OurBooks