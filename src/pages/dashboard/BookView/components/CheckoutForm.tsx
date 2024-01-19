import GlobelBtn from "@/components/button/Button";
import TransitionsDialog from "@/components/modal/TransitionDialog";
import {
  selectLuluPaymentStatus,
  stripPaymentLulu,
  updateLuluPaymentStatus,
} from "@/store/slices/authSlice";
import { Box, TextField, Typography } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TickBg from "../../../../_assets/svg/bgTickIcon.svg";
import CrossBg from "../../../../_assets/svg/cancel.svg";

const useOptions = () => {
  const fontSize = "16px";
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CheckoutForm = ({ quantity, remainingPayment }) => {
  const options = useOptions();
  const [isError, setIsError] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [confirmationStripe, setConfirmationStripe] = useState(false);
  const [stripeSucceed, setStripeSucceed] = useState(false);
  const [stripeFailed, setStripeFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const luluPaymentStatus = useSelector(selectLuluPaymentStatus);

  useEffect(() => {
    if (luluPaymentStatus === "success") {
      setStripeSucceed(true);
    }
  }, [luluPaymentStatus]);

  useEffect(() => {
    dispatch(updateLuluPaymentStatus(" "));
    setStripeSucceed(false);
  }, []);

  const handleSubmit = async (event) => {
    setConfirmationStripe(false);
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setLoading(false);
      setIsError(true);
      setStripeFailed(true);
    } else {
      dispatch(
        stripPaymentLulu({
          country: "USA",
          amount: remainingPayment,
          token: result.token,
          quantity: quantity,
          cardHolderName: cardHolderName,
        })
      )
        .unwrap()
        .then(async (res) => {
          if (res?.status !== "succeeded") {
            const secureResult = await stripe.confirmCardPayment(
              res?.client_secret,
              {
                payment_method: {
                  card: card,
                },
              }
            );
            if (secureResult?.paymentIntent?.status === "succeeded") {
            } else {
              setStripeFailed(true);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          setStripeFailed(true);
        });
    }
  };
  return (
    <>
      {stripeFailed ? (
        <Box
          sx={{
            bgcolor: "#F8F6F9",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "144px",
                height: "144px",
                margin: "auto",
              }}
            >
              <Image
                src={CrossBg}
                alt="Success Icon"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "24.7px",
                color: "black",
                width: "70%",
                m: "50px auto 0px auto",
                textAlign: "center",
              }}
            >
              Payment for Lulu api Failed
            </Typography>
          </Box>
        </Box>
      ) : !stripeSucceed ? (
        <Box
          sx={{
            bgcolor: "#F8F6F9",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            p: "30px 24px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16.704px",
              fontWeight: 600,
              color: "#171725",
            }}
          >
            Payment for additional books
          </Typography>
          <Typography
            sx={{
              fontSize: "31.7px",
              fontWeight: 600,
              color: "#171725",
            }}
          >
            {remainingPayment}
          </Typography>
          <Box mb="20px">
            <Typography
              sx={{
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              Card Number
            </Typography>
            <Box
              sx={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "50px",
                backgroundColor: "white",
                p: "12px 35px",
                border: "1px solid #30422E",
              }}
            >
              <CardNumberElement
                options={options}
                onChange={(event) => {
                  setIsError(!event.complete || !!event.error);
                }}
              />
            </Box>
          </Box>
          <Box mb="20px">
            <Typography
              sx={{
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              Cardholder Name
            </Typography>
            <TextField
              variant="outlined"
              onChange={(event: any) => setCardHolderName(event.target.value)}
              placeholder={"Cardholder Name"}
              name="title"
              sx={{
                marginTop: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  backgroundColor: "white",
                  border: "1px solid #30422E",
                  height: "46px",
                },
                width: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              width: "100%",
              mb: "20px",
            }}
          >
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                }}
              >
                Expiration Date
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "50px",
                  backgroundColor: "white",
                  p: "12px 35px",
                  border: "1px solid #30422E",
                }}
              >
                <CardExpiryElement
                  options={options}
                  onChange={(event) => {
                    setIsError(!event.complete || !!event.error);
                  }}
                />
              </Box>
            </Box>
            <Box flex={1}>
              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                }}
              >
                CVC
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "50px",
                  backgroundColor: "white",
                  p: "12px 35px",
                  border: "1px solid #30422E",
                }}
              >
                <CardCvcElement
                  options={options}
                  onChange={(event) => {
                    setIsError(!event.complete || !!event.error);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ opacity: loading || isError || !cardHolderName ? 0.6 : 1 }}
          ></Box>
          <GlobelBtn
            btnText="Proceed to pay"
            bgColor=" #30422E"
            color="white"
            p="10px 0px"
            onClick={() => {
              if (!loading && !isError && cardHolderName) {
                setConfirmationStripe(true);
              }
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: "#F8F6F9",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "144px",
                height: "144px",
                margin: "auto",
              }}
            >
              <Image
                src={TickBg}
                alt="Success Icon"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "24.7px",
                color: "black",
                width: "70%",
                m: "50px auto 0px auto",
                textAlign: "center",
              }}
            >
              Payment successful proceed to Submit
            </Typography>
          </Box>
        </Box>
      )}

      <TransitionsDialog
        open={confirmationStripe}
        heading="Lulu Api Payment"
        description={`An amount of $${remainingPayment} will be deducted from your selected bank account. Do you really want to proceed?`}
        cancel={() => {
          setConfirmationStripe(false);
        }}
        closeModal={() => {
          setConfirmationStripe(false);
        }}
        proceed={handleSubmit}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(CheckoutForm), {
  ssr: false,
});
