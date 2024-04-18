import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./AboutUs.module.css"
import Button from "@/__webComponents/button/Button";

import NextIcon from '@/__webAssets/svgs/next.svg'
import Diversity from "@/__webAssets/svgs/values/diversity.svg"
import Family from "@/__webAssets/svgs/values/family.svg"
import Empathy from "@/__webAssets/svgs/values/empathy.svg"
import Growth from "@/__webAssets/svgs/values/growth.svg"
import Inspiration from "@/__webAssets/svgs/values/inspiration.svg"
import Power from "@/__webAssets/svgs/values/power.svg"
import Link from "next/link";

const Values = () => {
  const ValueData = [
    {
      title: "Empowerment & Accessibility:",
      detail: "We empower individuals with an accessible platform for capturing and celebrating unique life stories, designed for all ages and abilities.",
      icon: Power
    },
    {
      title: "Family Legacy: ",
      detail: "We empower intergenerational connections through sharing and safeguarding personal stories, fostering a deeper family identity and sense of belonging.",
      icon: Family
    },
    {
      title: "Personal Growth: ",
      detail: "We champion self-discovery, self-reflection, and personal evolution that comes from revisiting and sharing life's moments.",
      icon: Growth
    },

    {
      title: "Inspiration:",
      detail: " Personal stories are wellsprings of motivation, lessons, wisdom, and encouragement for others to navigate their own paths in life.",
      icon: Inspiration
    },
    {
      title: "Empathy & Insight:",
      detail: "Our journey into personal stories cultivates profound empathy and a richer human experience.",
      icon: Empathy
    },
    {
      title: "Inclusivity & Diversity:",
      detail: "Our platform honors and preserves the diversity of all life stories, ensuring each narrative is valued and celebrated.",
      icon: Diversity
    },
  ]
  return (
    <Box sx={{
      padding: { lg: "180px 160px 150px 145px", md: "100px 80px 100px 100px", sm: "100px 50px 150px", xs: "100px 20px 150px" },
      display: "flex",
      justifyContent: "center"
    }}
      className={styles.valuesBox}
    >
      <Box sx={{ maxWidth: "1200px" }}>

        <Typography sx={{
          fontSize: { md: "52px", sm: "44px", xs: "32px" }, fontWeight: 500, paddingBottom: "20px", borderBottom: "1px solid #E1683B", fontFamily: "Besley !important"
        }}>
          <h2>Our Values</h2></Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1100px" }}>
          {ValueData.map((item, index) => <Value
            key={index}
            title={item.title}
            detail={item.detail}
            icon={item.icon}
          />)}
        </Box>
        <Box sx={{ margin: "30px 0 0 40px", display: { md: "block", sm: "none", xs: "none" } }}>
          <Link href="/_auth/Auth">
            <Button
              title='Get Started'
              width='210px'
              height='55px'
              img2={NextIcon}
            />
          </Link>
        </Box>
      </Box>

    </Box>
  )
}

export default Values;


function Value({ title, icon, detail }) {
  return (
    <Box sx={{ maxWidth: { lg: "440px", md: "380px", sm: "80%", xs: "100%" }, display: "flex", columnGap: "15px", margin: "50px 0 0" }}>
      <Image src={icon} alt="icon" />
      <Box>
        <Typography sx={{ fontSize: "20px", fontFamily: "Avenir8 !important", paddingBottom: "20px", }}><h3> {title}</h3></Typography>
        <Typography ><h4>{detail}</h4></Typography>
      </Box>
    </Box>
  )
}