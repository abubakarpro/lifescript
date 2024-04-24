"use client"
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from '../../../../__webComponents/ComponentsStyles.module.css';
// import Button from "../button/Button";
import Button from "../../../../__webComponents/button/Button";

import Check from "@/__webAssets/svgs/check.svg";
import Lock from "@/__webAssets/svgs/lock.svg";
import NextIcon from '@/__webAssets/svgs/next.svg';

import { useRouter } from 'next/router';

const GiftPricingCard = ({ price, category, card, id, handleHover }) => {
  const router = useRouter();

  const CheckArray = [
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: true,
      dis: "Spelling and grammar assistance "
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: true,
      dis: "Automatic photo improvement "
    },

    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: true,
      dis: "Text formatting features  "
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: false,
      dis: "Narrative Fusion "
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: false,
      dis: "Voice-to-text "
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: false,
      dis: "Family Tree"
    },
    {
      standardStatus: false,
      PrimuimStatus: true,
      basicStatus: false,
      dis: "Premium book covers"
    },
    {
      standardStatus: false,
      PrimuimStatus: true,
      basicStatus: false,
      dis: "Priority customer support"
    },
    {
      standardStatus: false,
      PrimuimStatus: true,
      basicStatus: false,
      dis: "Exclusive access to new features "
    },

  ]

  const handleButtonClick = () => {
    router.push({
      pathname: '/stripe-page/gift-subscription',
      query: { price, category },
    });
  };

  return (
    <>
    <Box
      sx={{
        borderRadius: "8px",
        width: { sm: "350px", xs: "340px" },
        height: { lg: "700px" },
        position: "relative",
        margin: "20px"

      }}
      backgroundColor={card == "2" ? "#30422E" : "#F4F4F4"}
      color={card == "2" && "#f4f4f4"}
      id={id}
      onMouseOver={() => handleHover(id)}
    >
      <Box sx={{ padding: { lg: "39px 30px 85px 45px", md: "35px 20px 85px", sm: "39px 45px 85px", xs: "35px 25px 80px" } }}>
        <Box sx={{
          borderRadius: "4px", backgroundColor: "#E7E7E7", padding: "4px 8px", display: "inline", color: "#3E4F3C", fontFamily: "Avenir5"
        }}
        >
          {category}
        </Box>
        {category == 'Standard' && <Box sx={{
          borderRadius: "4px",
          backgroundColor: "#E1683B",
          padding: "4px 8px",
          color: "#F4F4F4",
          marginLeft: "6px",
          display: "inline",
          fontFamily: "Avenir5"
        }}>
          Popular
        </Box>}
        <Box sx={{
          fontSize: "36px",
          fontWeight: "400",
          borderBottom: "1px solid #BFC4B5",
          padding: "10px 0",
          marginBottom: "34px",
          // fontFamily: "Avenir8"
        }}
          className={styles.price}
        >
          {price}
          <Typography sx={{ color: "#BFC4B5", fontSize: "12px", display: "inline" }}>
            / year
          </Typography>
        </Box>

        {category == 'Basic' && <Box>
          {
            CheckArray.map((item, index) => <Box
              sx={{
                display: "flex",
                columnGap: "25px",
                alignItems: "center",
                marginBottom: "24px",
              }}
              key={index}>
              <Image src={item.basicStatus ? Check : Lock} alt="check" />
              <Typography sx={{ fontSize: "15px", fontFamily: "Avenir" }}>{item.dis}</Typography>
            </Box>
            )}
        </Box>
          ||
          category == 'Standard' && <Box>
            {
              CheckArray.map((item, index) => <Box
                sx={{
                  display: "flex",
                  columnGap: "25px",
                  alignItems: "center",
                  marginBottom: "24px"
                }}
                key={index}>
                <Image src={item.standardStatus ? Check : Lock} alt="check" />
                <Typography sx={{ fontSize: "15px", fontFamily: "Avenir" }}>{item.dis}</Typography>
              </Box>
              )}
          </Box>
          ||
          category == 'Premium' && <Box>
            {
              CheckArray.map((item, index) => <Box
                sx={{
                  display: "flex",
                  columnGap: "25px",
                  alignItems: "center",
                  marginBottom: "24px"
                }}
                key={index}>
                <Image src={item.PrimuimStatus ? Check : Lock} alt="check" />
                <Typography sx={{ fontSize: "15px", fontFamily: "Avenir" }}>{item.dis}</Typography>
              </Box>
              )}
          </Box>
        }
      </Box>
      <Box sx={{ position: "absolute", bottom: "0", left: "0", right: "0" }}>
        <Button
          title='Get Started'
          width='100%'
          height='75px'
          font="24px"
          borderRadius="0px 0px 8px 8px"
          img2={NextIcon}
          onClick={() => handleButtonClick()} img1={undefined} backgroundColor={undefined} bgHover={undefined} />
      </Box>
    </Box >
    </>
    
  )
}

export default GiftPricingCard;