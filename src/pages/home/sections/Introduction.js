'use client'

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./HomeSections.module.css";
import { useTranslation } from "react-i18next";

import Pen from "@/__webAssets/svgs/writing-pen.svg";

const Button = dynamic(() => import('@/__webComponents/button/Button'), { ssr: false });

const images = [
  {
    src: 'https://lifescript-media.s3.eu-north-1.amazonaws.com/lifescript-happy-mom-and-dad-storytelling-to-children-on-the-beach.webp',
    alt: 'Mom with dad and their two daughters having fun on the beach with stories about their lifes - LifeScript',
    className: styles.image1,
    width: 260,
    height: 290,
  },
  {
    src: 'https://lifescript-media.s3.eu-north-1.amazonaws.com/children-dancing-and-having-fun-with-bubbles-on-vintage-photograph.webp',
    alt: 'Children dancing and having fun with bubbles on a vintage photograph - LifeScript',
    className: styles.image3,
    width: 275,
    height: 330,
  },
  {
    src: 'https://lifescript-media.s3.eu-north-1.amazonaws.com/lifescript-kid-having-fun-with-a-cat-in-vintage-photograph-memories.webp',
    alt: 'childhood memories with a vintage photograph of a kid having a laugh with a small kitten - LifeScript',
    className: styles.image2,
    width: 225,
    height: 245,
  },
  {
    src: 'https://lifescript-media.s3.eu-north-1.amazonaws.com/grandma-and-grandpa-laughing-and-eating-ice+cream-happy-memories.webp',
    alt: 'Grandma and Grandpa eating ice cream and having fun reflecting on their life journey - LifeScript',
    className: styles.image4,
    width: 322,
    height: 290,
  },
  {
    src: 'https://lifescript-media.s3.eu-north-1.amazonaws.com/old-opened-autobiography-book.webp',
    alt: 'An old opened autobiography book - LifeScript',
    className: styles.bookImg,
    width: 870,
    height: 380,
  },
];

const Introduction = () => {
  const { t } = useTranslation();
  const [Typed, setTyped] = useState(null);

  useEffect(() => {
    let typedInstance;
    const loadTyped = async () => {
      if (!Typed) {
        const { default: TypedLib } = await import("typed.js");
        setTyped(() => TypedLib);
      }
    };

    loadTyped();

    if (Typed) {
      const element = document.querySelector(".multiple-text");
      if (element) {
        typedInstance = new Typed(element, {
          strings: [t("landingPage.hero.animationText1"), t("landingPage.hero.animationText2")],
          typeSpeed: 100, 
          backSpeed: 100, 
          delaySpeed: 100,
          loop: true,
          showCursor: false,
        });
      }
    }

    return () => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, [Typed, t]);

  const color = { color: "#E1683B" }

  return (
    <Box sx={{ padding: { md: "90px 0 0 75px", sm: "100px 0 0 50px", xs: "40px 16px 40px" }, position: "relative" }}>
      <Box sx={{ width: { md: '55%', sm: "100%", xs: "100%" }, zIndex: "20" }}>
        <Typography sx={{
          fontSize: { lg: '60px', md: "50px", sm: "44px", xs: "32px" },
          lineHeight: { sm: '70px', xs: "37px" },
          fontFamily: "Besley !important",
          maxWidth: { sm: "700px", xs: "100%" },
          minHeight: { sm: "150px", xs: "100px" },
          zIndex: "10",
          position: "relative"
        }}
        >
          <h1 className={styles.pureHeadings}>
            <span className="multiple-text" style={color}></span> {t("landingPage.hero.mainHeading")}
          </h1>
        </Typography>
        <Typography sx={{
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 500,
          fontFamily: "Avenir",
          margin: { sm: '90px 0 30px', xs: "32px 0 25px" },
          width: { sm: '70%', xs: "100%" }
        }}
        >
          {t("landingPage.hero.mainDescription")}
        </Typography>
        <Box sx={{ width: { sm: "250px", xs: "100%" }, height: "55px" }}>
          <Link href="/stripe-page">
            <Button
              title={t("landingPage.hero.mainButton")}
              width="100%"
              height="100%"
              img1={Pen}
            />
          </Link>
        </Box>
        <Typography
          sx={{
            fontSize: '11px', lineHeight: '24px', fontWeight: 500, fontFamily: "Avenir",
            margin: { lg: '10px 0 100px', md: "10px 0 0px", sm: "10px 0 40px" }
          }}
        >{t("landingPage.hero.buttonDescription")}
        </Typography>
      </Box>

      {images.map((image, index) => (
        <Image
          key={index}
          loading='lazy'
          src={image.src}
          alt={image.alt}
          title={image.alt}
          className={image.className}
          width={image.width}
          height={image.height}
        />
      ))}
    </Box>
  )
}

export default Introduction;