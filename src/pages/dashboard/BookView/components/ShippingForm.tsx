import InputWithLabel from "@/components/Input";
import CountrySelect from "@/components/dashboardComponent/AutoComplete";
import { getLuluShipping, selectLuluData } from "@/store/slices/authSlice";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

const ShippingForm = ({ onChange, data, setShippingDataId }) => {
  const dispatch: any = useDispatch();
  const luluData = useSelector(selectLuluData);
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

  useEffect(() => {
    onChange(shippingData);
  }, [shippingData]);

  useEffect(() => {
    data && setShippingData(shippingData);
  }, [data]);

  useEffect(() => {
    dispatch(getLuluShipping());
  }, []);

  useEffect(() => {
    if (luluData) {
      setShippingData((prevData) => ({
        ...prevData,
        email: luluData?.email,
        name: luluData?.name,
        country_code: luluData?.country_code,
        city: luluData?.city,
        phone_number: luluData?.phone_number,
        postcode: luluData?.postcode,
        state_code: luluData?.state_code,
        street1: luluData?.street1,
      }));
      setShippingDataId(luluData?._id);
    }
  }, [luluData]);

  return (
    <Box
      sx={{
        flex: 1,
        p: { md: "30px 24px", sm: "25px 18px", xs: "20px 10px" },
        bgcolor: "#F8F6F9",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <InputWithLabel
        color="#474E60"
        label="Name"
        value={shippingData?.name}
        onChange={(e) =>
          setShippingData((prevData) => ({
            ...prevData,
            name: e.target.value,
          }))
        }
        placeholder="Name"
        borderRadius="47.202px"
        bgColor="white"
        border="1px solid #30422E"
      />
      <InputWithLabel
        color="#474E60"
        label="Email"
        value={shippingData?.email}
        onChange={(e) =>
          setShippingData((prevData) => ({
            ...prevData,
            email: e.target.value,
          }))
        }
        placeholder="Email"
        borderRadius="47.202px"
        bgColor="white"
        border="1px solid #30422E"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexDirection: { sm: "row", xs: "column" },
        }}
      >
        <Box flex={1} width={"100%"}>
          <InputWithLabel
            color="#474E60"
            label="City"
            value={shippingData?.city}
            onChange={(e) =>
              setShippingData((prevData) => ({
                ...prevData,
                city: e.target.value,
              }))
            }
            placeholder="City"
            borderRadius="47.202px"
            bgColor="white"
            border="1px solid #30422E"
          />
        </Box>

        <Box flex={1} width={"100%"}>
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              color: "black",
              ml: "5px",
            }}
          >
            Country Code
          </Typography>
          <Box
            sx={{
              height: "56px",
              border: "1px solid #30422E",
              bgcolor: "white",
              borderRadius: "47.202px",
            }}
          >
            <CountrySelect
              value={shippingData?.country_code}
              stripe={true}
              backgroundColor="transparent"
              onSelect={(val) => {
                setShippingData((prevData) => ({
                  ...prevData,
                  country_code: val,
                }));
              }}
            />
          </Box>
        </Box>
      </Box>
      <InputWithLabel
        color="#474E60"
        label="Phone Number"
        placeholder="Phone Number"
        value={shippingData?.phone_number}
        onChange={(e) =>
          setShippingData((prevData) => ({
            ...prevData,
            phone_number: e.target.value,
          }))
        }
        borderRadius="47.202px"
        bgColor="white"
        border="1px solid #30422E"
        type="number"
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
          flexDirection: { sm: "row", xs: "column" },
        }}
      >
        <Box flex={1} width={"100%"}>
          <InputWithLabel
            color="#474E60"
            label="State Code"
            value={shippingData?.state_code}
            onChange={(e) =>
              setShippingData((prevData) => ({
                ...prevData,
                state_code: e.target.value,
              }))
            }
            placeholder="State Code"
            borderRadius="47.202px"
            bgColor="white"
            border="1px solid #30422E"
            type="number"
          />
        </Box>
        <Box flex={1} width={"100%"}>
          <InputWithLabel
            color="#474E60"
            label="Post Code"
            value={shippingData?.postcode}
            onChange={(e) =>
              setShippingData((prevData) => ({
                ...prevData,
                postcode: e.target.value,
              }))
            }
            placeholder="Post Code"
            borderRadius="47.202px"
            bgColor="white"
            border="1px solid #30422E"
            type="number"
          />
        </Box>
      </Box>
      <InputWithLabel
        color="#474E60"
        label="Street"
        value={shippingData?.street1}
        onChange={(e) =>
          setShippingData((prevData) => ({
            ...prevData,
            street1: e.target.value,
          }))
        }
        placeholder="Street"
        borderRadius="47.202px"
        bgColor="white"
        border="1px solid #30422E"
      />
    </Box>
  );
};

export default ShippingForm;
