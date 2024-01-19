import SmallTick from "@/_assets/svg/smallTick.svg";
import GlobelBtn from "@/components/button/Button";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Items = ({ subList, title, description }) => {
  return (
    <Box
      sx={{
        bgcolor: "#F8F6F9",
        p: "30px 38px",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          mb: "22px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16.498px",
            fontWeight: 700,
            letterSpacing: "0.458px",
            mb: "14px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "12.498px",
            fontWeight: 600,
            letterSpacing: "0.458px",
            color: "#081131",
          }}
        >
          {description}
        </Typography>
      </Box>
      <Box sx={{ mb: "50px" }}>
        {subList?.map((items, index) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "12.832px",
                  color: "#081131",
                  mb: "18px",
                }}
              >
                <Box>
                  <Image src={SmallTick} alt="SmallTick" />
                </Box>
                <Box>{items.label}</Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box>
        <GlobelBtn
          bgColor="#30422E"
          color="white"
          btnText="Choose Plaedn"
          onClick={() => {
            // router.push(`/dashboard/BookCover/ViewBookCover?BookCoverCheck=${BookCoverCheck}`)
          }}
        />
      </Box>
    </Box>
  );
};

export default Items;
