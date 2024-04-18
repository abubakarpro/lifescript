import { Box, Typography } from "@mui/material";
import FlowerLine from "@/__webAssets/pngs/full-style.png"
import Image from "next/image";
import styles from "./HomeSections.module.css"
import Content from "@/__webComponents/headings/Content";
import Heroimage from "@/__webAssets/webp/family-collage-life-story-books.webp"
import ListPoints from "@/__webAssets/svgs/curved-list.svg"

const Suggestion = () => {

  const content = [
    {
      title: "Give a truly meaningful gift",
      subTitle: "For mother’s day, dad’s birthday, grandparents anniversary or just as a random heartfelt gesture and a chance to learn about them. The result is not only a book but an unparalleled experience to be cherished for years to come."
    },
    {
      title: "Share your Story and Wisdom",
      subTitle: "From your earliest memories to the lessons of adulthood, every story you share matters. Let your triumphs and trials inspire and guide the generations after you."
    },
    {
      title: "Connect with your Family",
      subTitle: "Uncover the stories of those who hold a special place in your heart, revealing hidden treasures about your family and forging deeper connections through stories that bring you closer together."
    },
    {
      title: "Reflect on your journey",
      subTitle: "Documenting personal challenges, triumphs, and growth serves as a therapeutic journey, encouraging self-reflection and possibly igniting resilience and appreciation within you and your family."
    },
  ]

  return (
    <Box sx={{ margin: { md: "100px 0", xs: " 20px 0 80px" } }}>
      {/* heading  */}
      <Box sx={{
        textAlign: "center",
        width: "100%",
        position: "relative",
        padding: "0 20px"
      }}
      >
        <Typography sx={{
          fontSize: { md: "52px", sm: "44px", xs: "32px" },
          margin: "0 auto",
          maxWidth: { sm: "100%", xs: "380px" },
          fontWeight: 500,
          fontFamily: "Besley !important"
        }}>
          <h2>
            Perfect for when you want to
          </h2>
        </Typography>
        <Image src={FlowerLine} alt="logo" className={styles.fullStyle} />
      </Box >
      <Box sx={{
        margin: {
          lg: "160px 60px 0 105px",
          md: "150px 40px 0 75px",
          sm: "100px auto 0",
          xs: "50px 16px 0"
        },
        display: "flex",
        flexDirection: { md: "row", sm: "column-reverse", xs: "column-reverse" },
        justifyContent: "center",
        alignItems: "center",
        columnGap: { lg: "100px", md: "50px" }
      }}>
        {/* left Section  */}
        <Box sx={{ display: "flex", alignItems: "center ", marginTop: { sm: "50px", md: "0", xs: "60px" } }}>
          <Image src={ListPoints} alt="points" className={styles.pointsLine} />
          <Box sx={{ marginLeft: { md: "30px", }, }}>
            {
              content.map((item, index) => <Content
                key={index}
                heading={item.title}
                subHeading={item.subTitle}
              />)
            }
          </Box>
        </Box>
        <Image
          src={Heroimage}
          alt="A collage of a dad with kids and a grandpa sitting on top of life story books packaged as a gift - LifeScript"
          title="Family collage photo"
          className={styles.suggestionImg}
        />
      </Box>
    </Box>
  )
}


export default Suggestion;