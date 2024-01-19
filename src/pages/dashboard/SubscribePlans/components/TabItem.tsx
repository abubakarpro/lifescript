import { Box } from "@mui/material";

interface Props {
  title: string;
  description: string;
  realPrice?: string;
  disconnectedPrice?: string;
  percentOff?: string;
  free?: string;
}

const TabItem = ({
  title,
  description,
  realPrice,
  disconnectedPrice,
  percentOff,
  free,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          gap: "14px",
        }}
      >
        <Box
          sx={{
            width: "18px",
            height: "18px",
            border: "2px solid #737373",
            borderRadius: "50%",
            flexShrink: "0",
          }}
        ></Box>
        <Box textAlign={"left"}>
          <Box
            sx={{
              fontSize: "14px",
              lineHeight: "21.998px",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              fontSize: "10.999px",
              lineHeight: "18.332px",
              textTransform: "capitalize",
              color: "black",
              fontWeight: 500,
            }}
          >
            {description}
          </Box>
        </Box>
      </Box>

      <Box>
        {free ? (
          <Box
            sx={{
              fontSize: "12.832px",
              letterSpacing: "0.458px",
              flexShrink: "0",
            }}
          >
            {free}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "11px",
            }}
          >
            <Box
              sx={{
                fontSize: "12.832px",
                letterSpacing: "0.458px",
                color: "black",
                textDecorationLine: "line-through",
                fontWeight: "500",
                flexShrink: "0",
              }}
            >
              {realPrice}
            </Box>
            <Box
              sx={{
                fontSize: "16.498px",
                letterSpacing: "0.458px",
                flexShrink: "0",
              }}
            >
              {disconnectedPrice}
            </Box>
          </Box>
        )}
      </Box>
      {!free && (
        <Box
          sx={{
            position: "absolute",
            right: "-5px",
            top: "-27px",
            border: "0.917px solid #30422E",
            bgcolor: "white",
            borderRadius: "22.914px",
            p: "6.416px 7.333px",
            fontSize: "9.166px",
            color: "#30422E",
            textTransform: "capitalize",
          }}
        >
          {percentOff}% off
        </Box>
      )}
    </Box>
  );
};

export default TabItem;
