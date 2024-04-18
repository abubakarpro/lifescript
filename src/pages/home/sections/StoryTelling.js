import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./HomeSections.module.css"
import Content from "@/__webComponents/headings/Content";
import Link from "next/link";

import StoryImage1 from "@/__webAssets/webp/storytelling/happy-grandma-holding-her-granddaughter.webp"
import StoryImage2 from "@/__webAssets/webp/storytelling/grandpa-writing-by-hand-his-memoir.webp"
import StoryImage3 from "@/__webAssets/webp/storytelling/grandma-recording-her-memories-over-the-phone.webp"
import StoryImage4 from "@/__webAssets/webp/storytelling/three-generations-family-smiling-at-the-camera.webp"
import Button from "@/__webComponents/button/Button";
import NextIcon from '@/__webAssets/svgs/next.svg'
import Line from "@/__webAssets/svgs/line-orange.svg"
import Bg from "@/__webAssets/pngs/bg-story-telling.png"

const StoryTelling = () => {
  const stories = [
    {
      heading: "Easy and Time-saving",
      content: "Tell your story by simply answering thought-provoking questions and have fun while you reflect along the way. Save valuable time and avoid the hassle of years of writing, extensive interviews, and proofreading for typos.",
      image: StoryImage1,
      alt: "A picture of a happy grandma holding her granddaughter who is kissing her on the cheek in the forest - LifeScript",
      title: "Happy grandma with granddaughter",
      direction: "row"
    },
    {
      heading: "Supported",
      content: "Enjoy a stress-free experience with our support through live chat, video tutorials, FAQs, and more. Our dedicated team is here to guide you at every step of your storytelling journey, ensuring you have the resources and assistance needed to effortlessly bring your story to life.",
      image: StoryImage2,
      alt: "A close-up photo of the hands of a grandpa who is writing his memoir book by hand - LifeScript ",
      title: "Grandpa writing his memoir",
      direction: "row-reverse"
    },
    {
      heading: "Flexible",
      content: " Your story is unique, and so is the way you tell it. If you don't feel like writing, feel free to speak your mind! Choose your own pace down memory lane on any device, anytime, anywhere.",
      image: StoryImage3,
      alt: "A photo of an old lady who is recording her memories over the phone - LifeScript",
      title: "Grandma recording memories over the phone",
      direction: "row"
    },
    {
      heading: "Connected",
      content: "Safeguard your legacy with our Family Tree feature, capturing your lineage from parents and great-grandparents to distant ancestors by visualizing them at the end of your book.",
      image: StoryImage4,
      alt: "Three generation family together in a circle smiling at the camera - LifeScript",
      title: "Three generation family smiling at the camera",
      direction: "row-reverse",
      button: true
    },
  ]

  return (
    <Box sx={{ padding: { md: "150px 0 0", sm: "100px 0 0 ", xs: "60px 20px 100px " }, position: "relative" }} >

      <Box sx={{
        fontSize: { md: "54px", sm: "44px", xs: "32px" },
        fontWeight: 500,
        marginBottom: { md: "30px", sx: "20px", xs: "30px" },
        fontFamily: "Besley !important",
        textAlign: { sm: "center", xs: "left" }
      }}>
        Your storytelling journey is{" "}
        <span className={styles.marked}>
          now:
          <Image src={Line} alt="mark" className={styles.line} />
        </span>
      </Box>

      <Box sx={{
        padding: { lg: "0px 0px 180px", md: "50px 40px 150px", sm: "50px 50px 150px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>

        {stories.map((item, index) => <StoryWraper
          key={index}
          cardNo={index + 1}
          heading={item.heading}
          content={item.content}
          button={item.button}
          image={item.image}
          alt={item.alt}
          title={item.title}
          direction={item.direction}
        />)}
      </Box>
      <Image src={Bg} alt="bg" className={styles.storyBg} />
    </Box>
  )
}


export default StoryTelling;


function StoryWraper({ direction, heading, content, image, alt, button = false, cardNo, title }) {
  return (
    <Box sx={{
      display: "flex",
      paddingTop: { sm: "120px", xs: "30px" },
      columnGap: { lg: "170px", md: "70px" },
      justifyContent: "space-between",
      alignItems: { md: "center" },
      flexDirection: { md: direction, sm: "column-reverse", xs: "column-reverse" },
    }}
    >
      <Box sx={{ margin: { md: "0", sm: "30px 0 0", xs: "20px 0 0" } }}>
        <Box sx={{ maxWidth: { lg: "475px", md: "400px" }, position: "relative", zIndex: "100" }}>
          <Content width="100%" subWidth="100%" heading={heading} subHeading={content} />
        </Box>

        {button && <Box sx={{ marginTop: "40px", width: { sm: "240px", xs: "100%" }, position: "relative", zIndex: "100" }}>
          <Link href="/_auth/Auth">
            <Button
              title='Get Started'
              width="100%"
              font="24px"
              height='55px'
              img2={NextIcon}
            />
          </Link>
        </Box>}
      </Box>

      <Image src={image} alt={alt} title={title} className={`${styles.stroyImages} ${cardNo == '1' && styles.index}`} />
    </Box>
  )
}