"use client";
import Layout from "@/components/Layout/Layout";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import RichText from "./richtext";
export default function Answers() {
  const router = useRouter();
  const { questionId } = router.query;

  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "#fff",
            m: { sm: "0px", xs: "15px" },
            borderRadius: "34px",
            padding: {
              xl: "30px 70px 100px",
              sm: "20px 40px 80px",
              xs: "20px 20px 50px",
            },
            border: "1px solid #30422E",
          }}
        >
          <RichText questionId={questionId} />
        </Box>
      </Layout>
    </>
  );
}
