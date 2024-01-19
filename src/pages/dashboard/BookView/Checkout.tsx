import GlobelBtn from "@/components/button/Button";
import {
  getLuluBalance,
  luluCall,
  selectLuluBalance,
} from "@/store/slices/authSlice";
import { Box, Checkbox, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import backArrow from "../../../_assets/svg/left.svg";
import NextArrow from "../../../_assets/svg/rightArrow.svg";
import CheckoutForm from "./components/CheckoutForm";
import ShippingCard from "./components/ShippingCard";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY);

const Checkout = ({ setSelectedTab, setCount, count, remainingPayment }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch: any = useDispatch();
  const luluBalance = useSelector(selectLuluBalance);
  const router = useRouter();

  const handleFinish = () => {
    if (isChecked === true && luluBalance.amount >= count * 39) {
      dispatch(luluCall({ quantity: count }))
        .unwrap()
        .then(() => router.push("/dashboard/overview"))
        .catch(() => {
          toast.error("Failed to call Lulu api");
          router.push("/dashboard/overview");
        });
    }
  };

  useEffect(() => {
    dispatch(getLuluBalance());
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "4.164px",
        p: "20px 24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          mb: "40px",
        }}
      >
        <Box mt="-7px">
          <Checkbox
            color="success"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { md: "18.752px", sm: "16px", xs: "14px" },
            width: "70%",
          }}
        >
          I acknowledge that I have input all the information on my behalf and
          has reviewed the interior and book cover. I want to print the book as
          it is.
        </Typography>
      </Box>
      <Box display={"flex"}>
        {remainingPayment > 0 && (
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Elements stripe={stripePromise}>
              <CheckoutForm
                quantity={count}
                remainingPayment={remainingPayment}
              />
            </Elements>
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: remainingPayment > 0 ? "end" : "center",
          }}
        >
          <Box width={"100%"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: remainingPayment > 0 ? "end" : "center",
              }}
            >
              <ShippingCard setCount={setCount} count={count} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 2,
                my: "20px",
              }}
            >
              <Box>
                <GlobelBtn
                  btnText="Back"
                  onClick={() => {
                    setSelectedTab(3);
                  }}
                  image={backArrow}
                />
              </Box>
              <Box>
                <GlobelBtn
                  bgColor="#30422E"
                  color="white"
                  btnText="Finish"
                  image2={NextArrow}
                  border="0px"
                  onClick={handleFinish}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
