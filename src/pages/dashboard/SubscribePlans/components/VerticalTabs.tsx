"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import Items from "./Items";
import TabItem from "./TabItem";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabsStyling = {
  alignItems: "start",
  p: "14px 22px",
  maxWidth: " 100%",
  borderRadius: "10.999px",
  border: "0.917px solid #DEDEDE",
  position: "relative",
  color: "black",
  mb: "18px",
  overflow: "visible",
  "&.Mui-selected": {
    color: "#30422E",
    borderColor: " #30422E",
    position: "relative",
    fontWeight: 600,

    "&:after": {
      content: '""',
      width: "10px",
      height: "10px",
      borderBottom: "0.917px solid #30422E",
      borderLeft: "0.917px solid #30422E",
      position: "absolute",
      right: " -9.5px",
      top: "50%",
      transform: "rotate(-135deg) translateX(51%)",
      zIndex: "1",
      bgcolor: "white",
    },
    "&:before": {
      content: '"✅"',
      // content: '"✅"',
      width: "15px",
      height: "15px",
      position: "absolute",
      borderRadius: "50%",
      border: "1.5px solid gray",
      top: "14px",
      zIndex: "1",
      overflow: "hidden",
    },
  },
};

const subPremiumList = [
  {
    label: "Auto Proofreading",
  },
  {
    label: "Auto Editing",
  },
  {
    label: "Family Tree",
  },
  {
    label: "Formatting Features",
  },
  {
    label: "Speech-to-text Translation",
  },
  {
    label: "Narrative Fusion",
  },
  {
    label: "AI Photo Enhancement",
  },
  {
    label: "Premium Book Cover",
  },
  {
    label: "Free Shipping",
  },
];
const subBasicList = [
  {
    label: "Auto Proofreading",
  },
  {
    label: "Auto Editing",
  },
  {
    label: "Family Tree",
  },
  {
    label: "Free Shipping",
  },
];

const subStandardList = [
  {
    label: "Auto Proofreading",
  },
  {
    label: "Auto Editing",
  },
  {
    label: "Family Tree",
  },
  {
    label: "Formatting Features",
  },
  {
    label: "Speech-to-text Translation",
  },
  {
    label: "Narrative Fusion",
  },
  {
    label: "Free Shipping",
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [clickCheck, setClickCheck] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setClickCheck(newValue);
  };

  console.log("value", value);
  console.log("clickCheck", clickCheck === value);

  return (
    <Box>
      <Box sx={{ flexGrow: 1, display: "flex", gap: "10px" }}>
        <Box
          sx={{
            flex: "1",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              overflow: "visible",
            }}
          >
            <Tab
              label={
                <TabItem
                  title="Basic"
                  description="Lorem ipsum dolor sit amet consectetur."
                  realPrice="Free"
                  free="Free"
                />
              }
              {...a11yProps(0)}
              sx={tabsStyling}
            />
            <Tab
              label={
                <TabItem
                  title="Standard"
                  description="Lorem ipsum dolor sit amet consectetur."
                  realPrice="$ 1,250"
                  disconnectedPrice="$ 875"
                  percentOff="30"
                />
              }
              {...a11yProps(1)}
              sx={tabsStyling}
            />
            <Tab
              label={
                <TabItem
                  title="Premium"
                  description="Lorem ipsum dolor sit amet consectetur."
                  realPrice="$ 2,500"
                  disconnectedPrice="$ 1,750"
                  percentOff="30"
                />
              }
              {...a11yProps(2)}
              sx={tabsStyling}
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: "1",
          }}
        >
          <TabPanel value={value} index={0}>
            <Items
              subList={subBasicList}
              description="Lorem ipsum dolor sit amet consectetur."
              title="Basic Plan Offerings"
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Items
              subList={subStandardList}
              description="Lorem ipsum dolor sit amet consectetur."
              title="Standard Plan Offerings"
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Items
              subList={subPremiumList}
              description="Lorem ipsum dolor sit amet consectetur."
              title="Premium Plan Offerings"
            />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
