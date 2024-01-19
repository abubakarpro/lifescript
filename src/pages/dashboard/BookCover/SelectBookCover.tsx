import Layout from "@/components/Layout/Layout";
import GlobelBtn from "@/components/button/Button";
import SelectBookCoverCard from "@/components/dashboardComponent/SelectBookCoverCard";
import SelectBookCoverHeader from "@/components/dashboardComponent/SelectBookCoverHeader";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SelectBookCover = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div>
      <Layout>
        <Box
          sx={{
            p: {
              sm: "0px",
              xs: "10px 20px",
            },
          }}
        >
          <SelectBookCoverHeader
            discription={`${t("BookCover.SelectBookCover")}`}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              mt: "20px",
              overflowX: "auto",
            }}
          >
            <Box flex={"auto"}>
              <Box
                onClick={() =>
                  router.push(
                    `/dashboard/BookCover/EditBookCover?CoverNumber=1`
                  )
                }
              >
                <SelectBookCoverCard landScape="1" />
              </Box>
            </Box>
            <Box flex={"auto"}>
              <Box
                onClick={() =>
                  router.push(
                    `/dashboard/BookCover/EditBookCover?CoverNumber=2`
                  )
                }
              >
                <SelectBookCoverCard landScape="2" />
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt="40px">
            <GlobelBtn
              btnText={`${t("BookCover.viewMore")}`}
              border="1px solid #30422E"
              width={"180px"}
            />
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default SelectBookCover;
