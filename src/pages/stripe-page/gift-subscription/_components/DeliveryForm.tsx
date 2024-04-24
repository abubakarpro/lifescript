"use client";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import GiftPlanCard from "./GiftPlanCard";
import { DatePicker } from "@mui/x-date-pickers";
const DeliveryForm = ({ onClick, selectedTab }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const maxDate = new Date();
  const router = useRouter();
  const { price, category } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Placeholder for API integration
    // console.log({
    //   selectedBooks,
    //   referralCode,
    //   cardHolderName,
    //   cardNumber,
    //   expiry,
    //   cvc,
    //   subscribeUpdates,
    // });
    // You can call your API endpoint here and handle the response accordingly
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box className={"Container"} sx={{ width: "40%", marginLeft: "100px" }}>
        <Box>
          <Typography sx={{ fontSize: "40px", marginBottom: "20px" }}>
            Personalize Your Gift
          </Typography>
        </Box>

        <Box>
          <Box>
            <Typography
              sx={{
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
              }}
            >
              Recipient’s Full Name
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter Recipient’s full name"
              name="name"
              sx={{
                marginBottom: "10px",
                width: "100%",
                bgcolor: "white",
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
              }}
            >
              Recipient’s Email
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter Recipient’s email address"
              name="email"
              sx={{
                marginBottom: "10px",
                width: "100%",
                bgcolor: "white",
              }}
            />
          </Box>

          {/* <Box>
            <Typography
              sx={{
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
              }}
            >
              Send my gift on:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="MM/DD/YYYY"
              name="date"
              sx={{
                marginBottom: "10px",
                width: "100%",
                bgcolor: "white",
              }}
            />
          </Box> */}
          <Box flex={1}>
              <Typography
                 sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
              >
               Send my gift on:
              </Typography>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                maxDate={maxDate}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "2px",
                    },
                  },
                }}
              />
            </Box>
        </Box>

        <Box>
          <Divider sx={{ width: "80%", marginTop: "30px" }} />

          <Typography
            sx={{ marginTop: "30px", marginBottom: "10px", fontSize: "20px" }}
          >
            Add a gift message!
          </Typography>

          <Box>
            <Typography
              sx={{
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
              }}
            >
              From
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Your name and all others taking part of this gift."
              name="from"
              sx={{
                marginBottom: "10px",
                width: "100%",
                bgcolor: "white",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
              }}
            >
              Your Message
            </Typography>
            <TextField
              placeholder="Hello, I've gifted you a LifeScript subscription, allowing you to easily share and preserve your stories in a beautiful hardcover book."
              multiline
              rows={7}
              maxRows={10}
              sx={{width:"575px", backgroundColor:"#FAFAFA"}}
            />
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => onClick(selectedTab + 1)}
          sx={{
            width: "200px",
            marginTop: "50px",
            bgcolor: "#e1693b",
            "&:hover": {
              backgroundColor: "#b5522d",
            },
          }}
        >
          Continue
        </Button>
      </Box>

      <Box>
        <GiftPlanCard price={price} category={category} />
      </Box>
    </Box>
  );
};

export default DeliveryForm;
