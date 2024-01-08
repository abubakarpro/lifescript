import ModalImage from "@/_assets/png/view-template-modal.png";
import Layout from "@/components/Layout/Layout";
import GlobelBtn from "@/components/button/Button";
import SubscriptionHeader from "@/components/dashboardComponent/subscriptionHeader";
import CustomizationDialog from "@/components/modal/CustomizationDialog";
import { customerSupport } from "@/store/slices/chatSlice";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SupportScreen = () => {
  const dispatch: any = useDispatch();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleComplaint = () => {
    setShowModal(true);
    setShowTooltip(false);
    if (!subject || !description) {
      setShowTooltip(true);
    } else {
      dispatch(customerSupport({ subject: subject, description: description }));
    }
  };

  return (
    <Box>
      <Layout>
        <Box
          sx={{
            p: { sm: "0px", xs: "10px 10px" },
          }}
        >
          <SubscriptionHeader title="Support" description="" />
          <Box
            sx={{
              display: "flex",
              gap: "30px",
              borderRadius: "14.994px",
              bgcolor: "#FFF",
              border: " 1.669px solid #E2E7F0",
              p: { md: "26px 30px", sm: "20px 20px", xs: "16px" },
              mt: "26px",
              flexWrap: "wrap",
            }}
          >
            <Box
              flex={0.7}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                minWidth: "280px",
                mt: { xs: "20px", sm: "0px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mt: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "#474E60",
                    ml: "5px",
                  }}
                >
                  Add Subject
                </Typography>
                <TextField
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  placeholder="Write Subject here..."
                  multiline
                  rows={1}
                  maxRows={1}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20.202px",
                      backgroundColor: "#F6F9FB",
                      border: "0px",
                      pl: "15px",
                    },
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "0px",
                    },
                    width: "100%",
                    "&:hover": {
                      border: "none",
                      outline: "none",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mt: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
                    color: "#474E60",
                    ml: "5px",
                  }}
                >
                  Add Description
                </Typography>
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write Description here..."
                  multiline
                  rows={8}
                  maxRows={8}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20.202px",
                      backgroundColor: "#F6F9FB",
                      border: "0px",
                      pl: "15px",
                    },
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "0px",
                    },
                    width: "100%",
                    "&:hover": {
                      border: "none",
                      outline: "none",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  mt: "20px",
                }}
              >
                <Tooltip
                  open={showTooltip}
                  onClose={() => setShowTooltip(false)}
                  title="Please fill in all fields before proceeding."
                >
                  <Box>
                    <GlobelBtn
                      btnText="Submit"
                      width="200px"
                      onClick={handleComplaint}
                    />
                  </Box>
                </Tooltip>
              </Box>
              {/* <Tooltip
              open={showTooltip}
              onClose={() => setShowTooltip(false)}
              title="Please fill in all fields before proceeding."
            >
              <Box
                sx={{
                  mt: "20px",
                }}
              >
                <GlobelBtn
                  btnText="Support"
                  width="200px"
                  onClick={handleComplaint}
                />
              </Box>
            </Tooltip> */}
            </Box>
          </Box>
        </Box>
      </Layout>
      <CustomizationDialog
        open={showModal}
        title=""
        handleClose={() => {
          setShowModal(false);
        }}
        customStyles={{ backgroundColor: "auto" }}
      >
        <Box sx={{ textAlign: "center", p: "20px" }}>
          <Box
            sx={{
              width: { md: "91.562px", sm: "66.54px", xs: "41.709px" },
              height: { md: "60.005px", sm: "43.607px", xs: "27.334px" },
              margin: "auto",
            }}
          >
            <Image
              alt="image"
              src={ModalImage}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: { md: "22px", sm: "21.679px", xs: "15.508px" },
              fontWeight: 700,
              color: "#070707",
              margin: "15px 0",
            }}
          >
            Thank You!
          </Typography>
          <Typography
            sx={{
              fontSize: { md: "16.5px", sm: "16.259px", xs: "11.631px" },
              color: "#070707",
              // width: "400px",
            }}
          >
            Your complaint has submited.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "20px",
            }}
          >
            <GlobelBtn
              btnText={"Okay"}
              bgColor="#197065"
              borderRadius="23px"
              color="#fff"
              // width={{ md: "234px", sm: "153px", xs: "103px" }}
              // fontSize={{ md: "18px", sm: "13.627px", xs: "8.542px" }}
              border="1px solid #197065"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </Box>
        </Box>
      </CustomizationDialog>
    </Box>
  );
};

export default SupportScreen;
