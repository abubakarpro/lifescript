'use client'

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@/__webComponents/button/Button";
import Image from "next/image";
import styles from "./HomeSections.module.css"
import Typed from "typed.js";
import Link from "next/link";

import Image1 from "@/__webAssets/webp/heroImages/lifescript-happy-mom-and-dad-storytelling-to-children-on-the-beach.webp"
import Image2 from "@/__webAssets/webp/heroImages/lifescript-kid-having-fun-with-a-cat-in-vintage-photograph-memories.webp"
import Image3 from "@/__webAssets/webp/heroImages/children-dancing-and-having-fun-with-bubbles-on-vintage-photograph.webp"
import Image4 from "@/__webAssets/webp/heroImages/grandma-and-grandpa-laughing-and-eating-ice cream-happy-memories.webp"
import Book from "@/__webAssets/webp/heroImages/old-opened-autobiography-book.webp"
import Pen from "@/__webAssets/svgs/writing-pen.svg"

const Introduction = () => {

  const color = { color: "#E1683B" }

  useEffect(() => {
    const element = document.querySelector(".multiple-text");
    if (element) {
      const typed = new Typed(element, {
        strings: ["Create", "Gift"],
        typeSpeed: 100,
        backSpeed: 100,
        delaySpeed: 100,
        loop: true,
        showCursor: false,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

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
          <h1>
            <span className="multiple-text" style={color}></span> a Personal Autobiography Book Easily
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
          Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad or grandparent.
        </Typography>
        <Box sx={{ width: { sm: "250px", xs: "100%" }, height: "55px" }}>
          <Link href="/_auth/Auth">
            <Button
              title='Start 7-Day Free Trial'
              width="100%"
              height="100%"
              img1={Pen}
            />
          </Link>
        </Box>
        <Typography
          sx={{
            fontSize: '11px', lineHeight: '24px', fontWeight: 500, fontFamily: "Avenir",
            margin: { lg: '10px 0 100px', md: "10px 0 70px", sm: "10px 0 40px" }
          }}
        >No credit card required
        </Typography>
      </Box>

      <Image
        src={Image1}
        alt="Mom with dad and their two daughters having fun on the beach with stories about their lifes - LifeScript"
        title="A happy family on the beach"
        className={styles.image1}
      />
      <Image
        src={Image3}
        alt="Children dancing and having fun with bubbles on a vintage photograph - LifeScript"
        title="Kids dancing and having fun with bubbles"
        className={styles.image3}
      />
      <Image
        src={Image2}
        alt="childhood memories with a vintage photograph of a kid having a laugh with a small kitten - LifeScript"
        title="A happy kid and a cat in a vintage photograph"
        className={styles.image2}
      />
      <Image
        src={Image4}
        alt="Grandma and Grandpa eating ice cream and having fun reflecting on their life journey - LifeScript"
        title="An old couple laughing and eating ice-cream"
        className={styles.image4}
      />
      <Image
        src={Book}
        alt="An old opened autobiography book - LifeScript"
        title="An old autobiography book"
        className={styles.bookImg}
      />
    </Box>
  )
}

export default Introduction;