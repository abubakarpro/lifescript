import { Grid } from "@mui/material";

const QaTabBars = ({ tabProp }) => {
  return (
    <Grid
      container
      gap={2.5}
      sx={{ color: "black", width: "100%", maxWidth: "532px" }}
    >
      {/* Tab 1 */}
      <Grid
        item
        xs={tabProp === 1 ? 5.5 : 2.5}
        sx={{
          bgcolor: tabProp === 1 ? "#30422E" : "#005387",
          borderRadius: "3px",
          height: "10px",
          opacity: tabProp === 1 ? "1" : "0.2",
        }}
      ></Grid>

      {/* Tab 2 */}
      <Grid
        item
        xs={tabProp === 2 ? 5.5 : 2.5}
        sx={{
          bgcolor: tabProp === 2 ? "#30422E" : "#005387",
          borderRadius: "3px",
          height: "10px",
          opacity: tabProp === 2 ? "1" : "0.2",
        }}
      ></Grid>

      {/* Tab 3 */}
      <Grid
        item
        xs={tabProp === 3 ? 5.5 : 2.5}
        sx={{
          bgcolor: tabProp === 3 ? "#30422E" : "#005387", // Change this color as needed
          borderRadius: "3px",
          height: "10px",
          opacity: tabProp === 3 ? "1" : "0.2",
        }}
      ></Grid>
    </Grid>
  );
};

export default QaTabBars;
