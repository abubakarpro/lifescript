"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import grandmaBookImage from "../../../../../public/grandmaBookImage.svg";
import Check from "@/__webAssets/svgs/check.svg"
import Lock from "@/__webAssets/svgs/lock.svg"

const BasicPlanCard = ({price, category}) => {

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
  ]
  return (
    <Box
      sx={{
        // border: "2px solid black",
        borderRadius:"3px",
        width: "446px",
        height: "auto",
        backgroundColor: "#c5c4ae",
        float:"right",
        marginRight:"20px",
        marginTop:"150px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"10px"
        }}
      >
        <Image
          src={grandmaBookImage}
          alt="grandma Book Image "
          width={250}
          height={348}
        />
      </Box>

      <Box sx={{ marginLeft: "20px", marginTop:"20px" }}>
        <Typography
          sx={{
            color: "#30422e",
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          {category ? `${category} Plan` : "Choose Plan"}
        </Typography>

        <Box>
          <Typography>
            Includes a premium full-color hardcover book, free shipping and one
            year LifeScript subscription with:
          </Typography>
        </Box>
        <Box sx={{marginTop:"30px"}}>
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

        <Box sx={{
          fontSize: "30px",
          fontWeight: "800",
          borderBottom: "1px solid #BFC4B5",
          padding: "10px 0",
          marginBottom: "34px",
          fontFamily: "Avenir8"
        }}
          // className={styles.price}
        >
          {/* {"$135"} */}{price ?? "$0"}
          <Typography sx={{ color: "black", fontSize: "12px", display: "inline" }}>
            / year
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BasicPlanCard;
