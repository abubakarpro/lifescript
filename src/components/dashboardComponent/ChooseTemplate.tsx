import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import styles from "./HomeSteps.module.css";
import TemplateCard from "./templateCard";

const ChooseTemplate = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "#30422E",
        color: "#fff",
        borderRadius: { sm: "24px", xs: "5px" },
        height: { xs: "162px" },
        padding: { lg: "25px 70px", sm: "15px 30px", xs: "10px 15px" },
      }}
      className={styles.bgTree}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: { xs: "100%" },
        }}
      >
        <Box>
          <Typography sx={{ fontSize: { sm: "20px", xs: "18px" } }}>
            {t("StartNewTem.StartNewTem")}
          </Typography>
          <Typography sx={{ fontSize: { sm: "40px", xs: "34px" } }}>
            {t("StartNewTem.useTem")}
          </Typography>
          <Typography sx={{ fontSize: { sm: "13px", xs: "10px" } }}>
            Lorem ipsum doler Lorem ipsum doler Lorem ipsum doler Lorem ipsum
            doler
          </Typography>
        </Box>
        <Box
          sx={{
            // width: { lg: "350px", sm: "250px", xs: "170" },
            marginLeft: { xs: "15px" },
          }}
        >
          <TemplateCard />
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseTemplate;
