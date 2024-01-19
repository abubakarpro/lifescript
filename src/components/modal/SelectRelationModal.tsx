import { Box, Typography } from "@mui/material";
import CustomizationDialog from "./CustomizationDialog";

const SelectRelationModal = ({
  relations,
  setFamilyRelationModal,
  familyRelationModal,
  onClick,
  setFamilyModal,
}) => {
  return (
    <Box>
      <CustomizationDialog
        open={familyRelationModal}
        title="Select Family Member"
        handleClose={() => {
          setFamilyRelationModal(false);
        }}
        customStyles={{
          width: { md: "500px", sm: "400px", xs: "100%" },
          p: { md: "20px", sm: "15px", xs: "10px" },
        }}
      >
        <Box
          sx={{
            height: "50vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {relations.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  bgcolor: "#F9F9F9",
                  color: "black",
                  borderRadius: "6.091px",
                  mb: "10px",
                  borderLeft: "8.25px solid #30422E",
                }}
                onClick={() => {
                  setFamilyRelationModal(false);
                  onClick(item);
                  setFamilyModal(true);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    p: { md: "10px 25px", sm: "8px 20px", xs: "5px 8px" },
                    borderRadius: "6.091px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        md: "16.5px",
                        sm: "16.259px",
                        xs: "11.631px",
                      },
                    }}
                  >
                    Add {item}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CustomizationDialog>
    </Box>
  );
};

export default SelectRelationModal;
