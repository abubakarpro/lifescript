import Counter from "@/components/dashboardComponent/QuantityInput";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import HalfBook from "../../../../_assets/png/halfBook.png";

const ShippingCard = ({
  setCount,
  count,
  QuantityCheck = false,
  amount = 39,
}) => {
  return (
    <Box
      sx={{
        width: { md: "393px", sm: "360px", xs: "100%" },
        bgcolor: "#F3ECDA",
        borderRadius: "10px",
        p: "17px 21px",
        m: { md: "0px", xs: "auto" },
      }}
    >
      <Typography
        sx={{
          fontSize: { md: "18.752px", sm: "16px", xs: "14px" },
          fontWeight: 400,
          textTransform: "uppercase",
          mb: "30px",
        }}
      >
        Order Summary
      </Typography>
      <Box
        sx={{
          height: { md: "283.9px", sm: "260px", xs: "240px" },
          width: { md: "246.977px", sm: "220px", xs: "200px" },
          margin: "auto",
        }}
      >
        <Image
          src={HalfBook}
          alt="book"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: {
            md: "57px",
            sm: "40px",
            xs: "20px",
          },
          width: "80%",
          m: "auto",
        }}
      >
        <Box
          sx={{
            fontSize: {
              md: "18.752px",
              sm: "16.752px",
              xs: "14px",
            },
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1.2px solid #DCDCDC",
            pb: "8px",
          }}
        >
          <Typography>Quantity</Typography>
          <Typography>{count}</Typography>
        </Box>
        <Box
          sx={{
            fontSize: {
              md: "18.752px",
              sm: "16.752px",
              xs: "14px",
            },
            display: "flex",
            justifyContent: "space-between",
            mt: "5px",
          }}
        >
          <Typography>Price</Typography>
          <Typography>{count * 39 - amount} $</Typography>
        </Box>
        {!QuantityCheck && (
          <Box
            sx={{
              fontSize: {
                md: "18.752px",
                sm: "16.752px",
                xs: "14px",
              },
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1.2px solid #DCDCDC",
              pb: "8px",
              pt: "5px",
            }}
          >
            <Typography>Total:</Typography>
            <Typography>{count * 39 - 39} $</Typography>
          </Box>
        )}
      </Box>

      {QuantityCheck && (
        <Box>
          <Box
            sx={{
              mt: { md: "40px", sm: "30px", xs: "20px" },
              textAlign: "center",
              mb: { md: "30px", sm: "20px", xs: "15px" },
            }}
          >
            <Typography
              sx={{ fontSize: { md: "18.752px", sm: "16px", xs: "14px" } }}
            >
              Order Additional Books
            </Typography>
          </Box>
          <Box
            sx={{
              mb: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Counter min={1} setCount={setCount} count={count} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ShippingCard;
