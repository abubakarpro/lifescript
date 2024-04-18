'use client'

import PrimaryHeading from "@/__webComponents/headings/PrimaryHeading";
import { Box, Typography } from "@mui/material";

import LeftStyle from "@/__webAssets/pngs/left-style2.png"
import RightStyle from "@/__webAssets/pngs/right-style2.png"

const Mission = () => {
  return (
    <Box sx={{ margin: { md: "50px 150px 80px", sm: "50px 0px 100px", xs: "40px 20px 50px" }, }}>
      <PrimaryHeading heading="Our " marked="Mission" showStyle={true} left={LeftStyle} right={RightStyle} />
      <Typography sx={{
        fontSize: "16px", textAlign: "center",
        margin: { md: "65px 30px 0", sm: "40px 30px 0", xs: "30px 0 0" },
        paddingBottom: "40px",
        borderBottom: "1px solid #E1683B",
        fontFamily: "Avenir"
      }}>
        <h3>There is this notion that to have your own autobiography book, you need to be either rich or famous. But we believe that every life is special and deserves to be remembered. That is why we have created an easy-to-use, affordable platform to help people preserve their memories, rediscover their roots, and create a deeper connection with themselves and their families.</h3>
      </Typography>
    </Box>
  )
}

export default Mission;