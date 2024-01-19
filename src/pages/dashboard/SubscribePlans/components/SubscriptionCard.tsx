import SmallTick from "@/_assets/svg/smallTick.svg";
import GlobelBtn from "@/components/button/Button";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

interface SubscriptionCardProps {
  subList: { label: string }[];
  mainTitle: string;
  mainDescription: string;
  price: number;
  offerTitle: string;
  onClick?: any;
  btnCheck?: boolean;
  buttonDisable?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subList,
  mainTitle,
  mainDescription,
  price,
  buttonDisable,
  offerTitle,
  onClick,
  btnCheck = true,
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: "24px 34px",
        borderRadius: "11px",
        border: "1px solid #CCC",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: { xs: "260px", md: "205px", lg: "250px" },
      }}
    >
      <Box>
        <Box
          sx={{
            fontSize: { md: "30.5px", sm: "24px", xs: "20px" },
            letterSpacing: "0.458px",
            fontWeight: "700",
            textTransform: "capitalize",
            mb: { md: "17px", sm: "13px", xs: "8px" },
          }}
        >
          {mainTitle}
        </Box>

        <Box
          sx={{
            fontSize: { md: "10.999px", xs: "8.5px" },
            letterSpacing: "0.458px",
            fontWeight: "600",
            textTransform: "capitalize",
            mb: { md: "17px", sm: "13px", xs: "8px" },
          }}
        >
          {mainDescription}
        </Box>

        <Box
          sx={{
            fontSize: { md: "30.5px", sm: "24px", xs: "20px" },
            letterSpacing: "0.458px",
            fontWeight: "700",
            textTransform: "capitalize",
            mb: { md: "17px", sm: "13px", xs: "8px" },
            color: "#30422E",
          }}
        >
          ${price}
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "2px",
            bgcolor: "#CCCCCC",
            mb: { md: "17px", sm: "13px", xs: "8px" },
          }}
        ></Box>

        <Box
          sx={{
            fontSize: { md: "16.498px", sm: "14px", xs: "12px" },
            letterSpacing: "0.458px",
            fontWeight: "700",
            textTransform: "capitalize",
            mb: "14px",
          }}
        >
          {offerTitle}
        </Box>

        <Box
          sx={{
            fontSize: { md: "12.832px", sm: "10px", xs: "9px" },
            letterSpacing: "0.458px",
            fontWeight: "600",
            textTransform: "capitalize",
            mb: "22px",
            color: "#081131",
          }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </Box>

        <Box
          sx={{
            mb: "20px",
            height: "22vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {subList?.map((items, index) => {
            return (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    fontSize: { md: "12.832px", sm: "10px", xs: "9px" },
                    color: "#081131",
                    mb: { md: "18px", sm: "13px", xs: "8px" },
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
      </Box>

      {btnCheck && (
        <Box>
          <GlobelBtn
            bgColor="#30422E"
            color="white"
            btnText={`${t("SubsPlan.cardBtn")}`}
            onClick={() => onClick(price)}
            width={"100%"}
          />
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionCard;
