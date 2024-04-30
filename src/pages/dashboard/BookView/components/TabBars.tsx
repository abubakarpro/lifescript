import { Grid, Typography } from "@mui/material";

const TabBars = ({ tabs }) => {
  return (
    <Grid
      container
      sx={{
        color: "black",
        width: "100%",
        maxWidth: "1500px",
        columnGap: "5px",
        justifyContent: "space-between",
      }}
    >
      {tabs?.map((tab, index) => (
        <Grid
          key={index}
          item
          xs={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Typography
            sx={{
              marginBottom: "5px",
              color: tab.active ? "#30422E" : "#7C7C7C",
              fontSize: { md: "14.097px", sm: "10px", xs: "10px" },
              fontWeight: 700,
              textAlign: "left",
            }}
          >
            {tab.label}
          </Typography>
          <Grid
            sx={{
              bgcolor: tab.active ? "#7F886B" : "#7F886B33",
              borderRadius: "4px",
              height: "7px",
              width: "100%",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TabBars;
