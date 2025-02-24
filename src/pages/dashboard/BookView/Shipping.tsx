import GlobelBtn from "@/components/button/Button";
import { Box, Tooltip } from "@mui/material";
import ShippingCard from "./components/ShippingCard";
import ShippingForm from "./components/ShippingForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  createLuluShipping,
  getLuluBalance,
  selectLuluBalance,
  updateLuluShipping,
} from "@/store/slices/authSlice";

const Shipping = ({
  setSelectedTab,
  setCount,
  count,
  setRemainingPaymenmt,
}) => {
  const { t } = useTranslation();
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
    apt: "",
  });

  const [tooltip, setTooltip] = useState(false);
  const luluBalance = useSelector(selectLuluBalance);

  useEffect(() => {
    dispatch(getLuluBalance());
    console.log("lulubalance is ", luluBalance.amount);
  }, [dispatch]);

  useEffect(() => {
    const totalAmount = count * 39;
    if (luluBalance.amount >= totalAmount) {
      setRemainingPaymenmt(0);
    } else {
      setRemainingPaymenmt(totalAmount - luluBalance.amount);
    }
  }, [count, luluBalance.amount, setRemainingPaymenmt]);

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
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#F3ECDA",
          borderRadius: "4px",
          p: "30px",
          gap: "20px",
          flexDirection: { md: "row", xs: " column" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            // minWidth: "300px",
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
              setPayment={setRemainingPaymenmt}
              setCount={setCount}
              count={count}
              QuantityCheck={true}
              quantity={luluBalance?.quantity}
              amount={luluBalance?.amount}
              shouldResetCount={true}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 2,
          mt: "30px",
        }}
      >
        <Box>
          <GlobelBtn
            btnText={t("reviewBook.backBtn")}
            bgColor="#fff"
            color="#E1683B"
            border="1px solid #E1683B"
            onClick={() => {
              setSelectedTab(2);
            }}
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
                bgColor="#E1683B"
                color="white"
                btnText={t("reviewBook.nextBtn")}
                border="0px"
                onClick={handleNext}
                disabled={
                  Object.values(shippingData).some((value) => value === "") ||
                  count <= 0
                }
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;
