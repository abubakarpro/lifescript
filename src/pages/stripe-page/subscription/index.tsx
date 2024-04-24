"use client";
import Logo from "@/_assets/svg/logo-dashboard.svg";
import { facebookLogin } from "@/store/slices/authSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NewTabBar from "./_components/NewTabBar";
import PurchaseForm from "./_components/PurchaseForm";
import RegisterPage from "./_components/RegisterPage";
import TabPanel from "./_components/TabPanel";

const SubscriptionPage = () => {
  const dispatch:any = useDispatch();
  const [selectedTab, setSelectedTab]: any = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user) {
        setSelectedTab(2);
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
    { label: "REGISTER", active: selectedTab === 1 && !session },
    { label: "PAYMENT", active: selectedTab === 2 }
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
          marginLeft: "80px"
        }}>
          <NewTabBar tabs={tabsData} onClick={handleTabClick} />
        </Box>

        <Box>
          <Box mt="15px">
            {selectedTab === 0 && (
              <TabPanel selectedTab={selectedTab} onClick={handleTabClick} />
            )}
            {selectedTab === 1 && !session && (
              <RegisterPage selectedTab={selectedTab} onClick={handleTabClick} />
            )}
            {selectedTab === 2 && (
              <PurchaseForm selectedTab={selectedTab} onClick={handleTabClick} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionPage;
