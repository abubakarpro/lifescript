import GlobelBtn from "@/components/button/Button";
import {
  createLuluShipping,
  getLuluBalance,
  selectLuluBalance,
  updateLuluShipping,
} from "@/store/slices/authSlice";
import { Box, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import backArrow from "../../../_assets/svg/left.svg";
import ShippingCard from "./components/ShippingCard";
import ShippingForm from "./components/ShippingForm";

const Shipping = ({
  setSelectedTab,
  setCount,
  count,
  setRemainingPaymenmt,
}) => {
  const dispatch: any = useDispatch();
  const [shippingDataId, setShippingDataId] = useState(null);
  const [shippingData, setShippingData] = useState({
    email: "",
    city: "",
    country_code: "",
    name: "",
    phone_number: "",
    postcode: "",
    state_code: "",
    street1: "",
  });

  const [tooltip, setTooltip] = useState(false);
  const luluBalance = useSelector(selectLuluBalance);
  useEffect(() => {
    dispatch(getLuluBalance());
  }, []);

  useEffect(() => {
    setRemainingPaymenmt(count * 39 - luluBalance?.amount);
  }, [count]);

  const handleNext = () => {
    const isAnyFieldEmpty = Object.values(shippingData).some(
      (value) => value === ""
    );

    if (isAnyFieldEmpty) {
      setTooltip(true);
    } else {
      shippingDataId
        ? dispatch(updateLuluShipping(shippingData))
            .unwrap()
            .then((res) => {
              setSelectedTab(4);
            })
        : dispatch(createLuluShipping(shippingData))
            .unwrap()
            .then((res) => {
              setSelectedTab(4);
            });
    }
  };

  useEffect(() => {
    setTooltip(false);
  }, [shippingData]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        borderRadius: "4.164px",
        p: "20px 24px",
        gap: "20px",
        flexDirection: { md: "row", xs: " column" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: "300px",
        }}
      >
        <ShippingForm
          onChange={(obj) => setShippingData(obj)}
          data={shippingData}
          setShippingDataId={setShippingDataId}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: { md: "end", xs: "center" },
        }}
      >
        <Box
          sx={{
            width: { md: "auto", xs: "100%" },
            p: {
              sm: "0px",
              xs: "10px",
            },
          }}
        >
          <ShippingCard
            setCount={setCount}
            count={count}
            QuantityCheck={true}
            amount={luluBalance?.amount}
          />
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
                  setSelectedTab(2);
                }}
                image={backArrow}
              />
            </Box>
            <Box>
              <Tooltip
                title="Please fill in all fields"
                open={tooltip}
                onClose={() => setTooltip(false)}
              >
                <Box>
                  <GlobelBtn
                    bgColor="#30422E"
                    color="white"
                    btnText="Next"
                    border="0px"
                    onClick={handleNext}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;
