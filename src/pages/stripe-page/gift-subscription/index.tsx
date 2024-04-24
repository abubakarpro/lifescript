"use client";
import Logo from "@/_assets/svg/logo-dashboard.svg";
import { Box } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import PurchaseForm from "../subscription/_components/PurchaseForm";
import RegisterPage from "../subscription/_components/RegisterPage";
import { useSession } from "next-auth/react";
import { facebookLogin } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import GiftTabPanel from "./_components/GiftTabPanel";
import GiftTabBar from "./_components/GiftTabBar";
import DeliveryForm from "./_components/DeliveryForm";

const GiftSubscriptionPage = () => {
  const dispatch:any = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user) {
        setSelectedTab(3);
        const payload = {
          name: session.user.name,
          email: session.user.email
        };
        dispatch(facebookLogin(payload));
      }
    }
  }, [session, dispatch]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const tabsData = [
    { label: "CHOOSE PLAN", active: selectedTab === 0 },
    { label: "DELIVERY", active: selectedTab === 1 },
    { label: "REGISTER", active: selectedTab === 2 && !session },
    { label: "PAYMENT", active: selectedTab === 3 }
  ];

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f3ecda",
          color: "#3e4f3c",
        }}
      >
        <Box
          sx={{
            bgcolor: "#30422e",
            height: "50px",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <Image src={Logo} alt="Logo" />
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "30px",
          marginLeft: "100px"
        }}>
          <GiftTabBar tabs={tabsData} onClick={handleTabClick} />
        </Box>

        <Box>
          <Box mt="15px">
            {selectedTab === 0 && (
              <GiftTabPanel selectedTab={selectedTab} onClick={handleTabClick} />
            )}
            {selectedTab === 1 && (
              <DeliveryForm selectedTab={selectedTab} onClick={handleTabClick} />
            )}
            {selectedTab === 2 && !session && (
              <RegisterPage selectedTab={selectedTab} onClick={handleTabClick} />
            )}
            {selectedTab === 3 && (
              <PurchaseForm selectedTab={selectedTab} onClick={handleTabClick} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GiftSubscriptionPage;
