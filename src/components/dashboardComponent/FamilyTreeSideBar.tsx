import DemoProfile from "@/_assets/svg/profile.svg";
import MenuIcon from "@/_assets/svg/sidebar/menuIcon.svg";
import Logo from "@/_assets/svg/white-logo.svg";
import { selectTreeData } from "@/store/slices/chatSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Typography } from "@mui/material";
import * as d3 from "d3";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CameraIcon from "../../_assets/svg/cameraIcon.svg";
import Profile from "../../_assets/svg/profile.svg";
import styles from "./Sidebar.module.css";

const FamilyTreeSideBar = ({ menuClick, handleSideCheck }) => {
  const [childsOpen, setChilsdOpen] = useState(true);

  const familyTreeData = useSelector(selectTreeData);
  const [allNodes, setAllNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState({
    name: "",
    born: "",
    died: "",
    image: "",
    myself: false,
  });

  useEffect(() => {
    if (familyTreeData) {
      const tree = d3
        .tree()
        .separation((a, b) => {
          return a.children && a.children === b.children ? 1 : 0.5;
        })
        .size([1200, 2200]);
      const nodes = d3.hierarchy(familyTreeData, (d) => d.childrens);
      const treeNodes = tree(nodes);
      const descendants = treeNodes.descendants().slice(1);

      let allNodes = [];

      // Iterate through descendants and create two objects for each entry
      descendants?.forEach((node) => {
        if (node?.data?.name) {
          const firstObject = {
            name: node?.data?.name,
            born: node?.data?.born?.slice(0, 4),
            died: node?.data?.died?.slice(0, 4),
            image: node?.data?.image,
            myself: node?.data?.myself,
          };
          // Push the first object into the allNodes array
          firstObject?.myself === true
            ? setSelectedNode(firstObject)
            : allNodes.push(firstObject);
        }

        if (node?.data?.spouseName) {
          const secondObject = {
            name: node?.data?.spouseName,
            born: node?.data?.spouseBorn?.slice(0, 4),
            died: node?.data?.spouseDied?.slice(0, 4),
            image: node?.data?.spouseImage,
            myself: node?.data?.myself,
          };
          // Push the second object into the allNodes array
          allNodes.push(secondObject);
        }
      });

      // Assuming setAllNodes is your state updater function
      setAllNodes(allNodes);
    }
  }, [familyTreeData]);

  return (
    <Box sx={{ color: "#fff", backgroundColor: "#30422E" }}>
      {!handleSideCheck && (
        <Box sx={{ padding: "13px 20px", height: "70px" }}>
          <Image src={Logo} alt="logo" className={styles.logo} />
        </Box>
      )}
      {handleSideCheck && (
        <Box
          sx={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            ml: "8px",
          }}
          onClick={menuClick}
        >
          <Image src={MenuIcon} alt="MenuIcon" />
        </Box>
      )}
      <Box
        sx={{
          borderTop: "1px solid #fff",
          bgcolor: "#FFF",
          color: "black",
          height: { lg: "calc(100vh - 70px)", xs: "calc(100vh - 45px)" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { md: "14.865px", xs: "12px" },
              color: "black",
              p: { md: "20px 15px", sm: "15px 15px", xs: "10px 15px" },
              borderBottom: "1px solid #ECECEC",
            }}
          >
            {selectedNode?.name} Family Tree
          </Typography>
          <Box
            sx={{
              fontSize: { md: "14.865px", xs: "12px" },
              color: "black",
              p: { md: "20px", sm: "15px", xs: "10px" },
              borderBottom: "1px solid #ECECEC",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: { md: "54.875px", sm: "45px", xs: "35px" },
                height: { md: "54.875px", sm: "45px", xs: "35px" },
                borderRadius: "50%",
                border: "1px solid #30422E",
                position: "relative",
                margin: "auto",
              }}
            >
              {/* <Image
                src={Profile}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              /> */}
              {!selectedNode?.image ? (
                <Image
                  src={Profile}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  alt="profile"
                  src={selectedNode?.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              )}
              <Box
                sx={{
                  width: { md: "14px", sm: "12px", xs: "10px" },
                  height: { md: "14px", sm: "12px", xs: "10px" },
                  bgcolor: "#30422E",
                  position: "absolute",
                  right: "-2px",
                  bottom: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={CameraIcon}
                  alt=""
                  style={{
                    width: "8px",
                    height: "8px",
                  }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: { md: "14.865px", xs: "12px" },
                color: "black",
                mt: "10px",
              }}
            >
              {selectedNode?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "11.865px", xs: "10px" },
                color: "black",
                mt: "2px",
              }}
            >
              Year of Birth {selectedNode?.born || "N/A"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box padding="35px 29px 30px 15px">
            <button
              style={{
                background: "transparent",
                color: "black",
                border: "0px",
                width: "100%",
              }}
            >
              <Box
                onClick={() => {
                  setChilsdOpen(!childsOpen);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>Family Tree</Box>
                {childsOpen ? (
                  <KeyboardArrowDownIcon
                    sx={{
                      width: { xs: "15px", md: "24px" },
                      ml: "5px",
                      mt: "3px",
                      color: "#30422E",
                    }}
                  />
                ) : (
                  <KeyboardArrowUpIcon
                    sx={{
                      width: { xs: "15px", md: "24px" },
                      ml: "5px",
                      color: "#30422E",
                      mt: "3px",
                    }}
                  />
                )}
              </Box>
              {childsOpen && (
                <Box>
                  {allNodes.length > 0 &&
                    allNodes.map((node, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          p: "10px 5px",
                        }}
                      >
                        {/* <Image src={node.gender === "male" ? MaleProfile : FemaleProfile} alt="profile" /> */}
                        {!node?.image ? (
                          <Image
                            alt="profile"
                            src={DemoProfile}
                            className={styles.profilePic}
                          />
                        ) : (
                          <img
                            alt="profile"
                            src={node?.image}
                            width={33}
                            height={32}
                          />
                        )}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: { md: "9.832px", xs: "8px" },
                              color: "black",
                            }}
                          >
                            {node.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { md: "7.079px", xs: "6px" },
                              color: "#BDBDBD",
                            }}
                          >
                            Year of Birth: <strong>{node.born || "N/A"}</strong>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { md: "7.079px", xs: "6px" },
                              color: "#BDBDBD",
                            }}
                          >
                            Year of Death: <strong>{node.died || "N/A"}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                </Box>
              )}
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FamilyTreeSideBar;
