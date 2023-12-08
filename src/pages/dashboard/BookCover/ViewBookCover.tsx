import Layout from "@/components/Layout/Layout";
import SelectBookCoverCard from "@/components/dashboardComponent/SelectBookCoverCard";
import SelectBookCoverHeader from "@/components/dashboardComponent/SelectBookCoverHeader";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ViewBookCover = () => {
  const router = useRouter();
  const {BookCoverCheck} = router.query;  
  return (
    <div>
      <Layout>
        <SelectBookCoverHeader />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            mt: "20px",
          }}
        >
          
          <Box flex={"auto"}>
          <Box display="flex" gap="30px" mt="10px" mb="20px" justifyContent="flex-end">
                <Button
                  sx={{
                    height: {sx: "25px", md: "30px", lg:"45px"},
                    borderRadius: "26.267px",
                    border: " 0.71px solid #197065",
                    p: { xs: '8px 20px', lg:"10.358px 26.989px"},
                    fontSize: {xs: "12px", md: '14px' ,lg:"18.752px"},
                    color: "#197065",
                    textTransform: "capitalize",
                  }}
                  onClick={()=>{
                  }}
                >
                  Print Book
                </Button>
                <Button
                  sx={{
                    height: {sx: "25px", md: "30px", lg:"45px"},
                    borderRadius: "26.267px",
                    border: " 0.71px solid #197065",
                    p: { xs: '8px 20px', lg:"10.358px 26.989px"},
                    fontSize: {xs: "12px", md: '14px' ,lg:"18.752px"},
                    color: "white",
                    textTransform: "capitalize",
                    bgcolor: "#197065",
                    "&:hover": {
                      bgcolor: "#197065",
                    }
                  }}
                  onClick={() => {
                    router.push(`/dashboard/BookCover/EditBookCover?BookCoverCheck=${BookCoverCheck}`)
                  }}
                >
                  Edit Cover
                </Button>
              </Box>
            <Box
            >
              <SelectBookCoverCard landScape={BookCoverCheck == "true" ? true : false} />
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
};

export default ViewBookCover;
