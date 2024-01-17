import Layout from "@/components/Layout/Layout";
import AddChapterName from "@/components/dashboardComponent/AddChapterName";
import DetailCard from "@/components/dashboardComponent/DetailCard";
import { getTemplates, selectTemplates } from "@/store/slices/chatSlice";
import styles from "@/styles/Dashboard.module.css";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch: any = useDispatch();
  const templates = useSelector(selectTemplates);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  return (
    <Layout>
      <Box className={styles.subContainer}>
        <Box
          sx={{
            display: { sm: "block", xs: "none" },
          }}
        >
          <AddChapterName
            chapterId
            chapter={`${t("template.temp")}`}
            title="templateView"
            subTitle={`${t("template.ch")}`}
          />
        </Box>
        <Box
          sx={{ marginTop: { xs: "18px" }, p: { md: "0px", xs: "10px 30px" } }}
          className={styles.CardsContainer}
        >
          {templates?.map((template, index) => (
            <DetailCard
              key={index + 1}
              chapter={template}
              percentageCheck={false}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
