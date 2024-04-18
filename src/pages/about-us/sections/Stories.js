import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./AboutUs.module.css"

import StoryImg from "@/__webAssets/webp/about-story.webp"

const Story = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      flexDirection: { md: "row", sm: "column-reverse", xs: "column-reverse" },
      alignItems: { md: "center", sm: "center" },
      columnGap: { lg: "120px", md: "80px" },
      margin: { lg: "0 90px 0 145px", md: "0 50px 0 100px", sm: "0 50px", xs: "0 20px 0" },
    }}>
      <Box sx={{ maxWidth: "510px" }}>
        <Typography sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontSize: { md: "52px", sm: "44px", xs: "32px" },
          fontWeight: 500,
          marginBottom: "20px",
          fontFamily: "Besley !important"
        }}>
          <h2> Our Story...</h2>
        </Typography>
        <Typography sx={{ fontSize: "16px", marginTop: { md: "0", sm: "20px", xs: "20px" }, fontFamily: "Avenir" }}>A couple of years ago, our founder, Angel, accidentally found a dusty, forgotten book that turned out to be a portal to the past. It was written by his great grandfather who passed away shortly after Angel was born, and chronicled his personal experiences and memories from the harsh 20th century communist regime in his home country - Bulgaria. After reading the book, Angel felt a deep connection to his great grandfather, as if they had known each other well, despite never having met.</Typography>
        <Typography sx={{ fontSize: "16px", margin: "15px 0", fontFamily: "Avenir" }}>This experience sparked a realization that personal stories have the power to inspire us, to heal us, and to bring us together across time and space.</Typography>
        <Typography sx={{ fontSize: "16px", fontFamily: "Avenir" }}>Embracing this insight, Angel took on a journey to make autobiography book creation not just as a service, but as a mission to keep our joys, our struggles and our stories alive. That journey is what we now call Lifescript.</Typography>
      </Box>
      <Image src={StoryImg} alt="img" className={styles.storyImage} />
      <Typography sx={{ fontSize: { md: "52px", sm: "44px", xs: "32px" }, display: { md: "none", sm: "block", xs: "block" }, fontWeight: 500, marginBottom: "20px", fontFamily: "Besley !important" }}>Our Story...</Typography>
    </Box>
  )
}

export default Story;