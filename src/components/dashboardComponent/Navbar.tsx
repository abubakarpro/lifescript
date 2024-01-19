import More from "@/_assets/svg/nav-menue.svg";
import NavMenu from "@/_assets/svg/sidebar/menuIcon.svg";
import Step1 from "@/_assets/svg/smallBook.svg";
import Logo from "@/_assets/svg/white-logo.svg";
import {
  getChapterNotifications,
  readNotification,
  selectChapterNotification,
} from "@/store/slices/chatSlice";
import { Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BellIcon from "../../_assets/svg/bellIcon.svg";

const ITEM_HEIGHT = 48;

const NavBar = ({ sideBarHandle }: { sideBarHandle?: () => void }) => {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const allNotifications = useSelector(selectChapterNotification);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    allNotifications && setNotifications(allNotifications);
  }, [allNotifications]);

  const handleNotificationNavigate = (notification) => {
    dispatch(readNotification({ id: notification?._id, isRead: true }))
      .unwrap()
      .then(() => {
        dispatch(getChapterNotifications());
        router.push(
          `/dashboard/narrative?chapterId=${notification?.chapter}&openai=true`
        );
      });
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleClickOption = (option) => {
    if (option.id === 1) {
      // dispatch(logout());
      localStorage.clear();
      router.push("/");
    }
    handleMoreClose();
  };

  let buttonsHide;
  if (router.asPath === "/dashboard/overview") {
    buttonsHide = true;
  }

  // const options = [`${t("navBar.logout")}`];
  const options = [{ id: 1, title: `${t("navBar.logout")}` }];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#30422E",
        padding: { xs: "0px 8px", md: "0 14px" },
        height: { xs: "48px", lg: "70px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "space-between", lg: "end" },
          width: "100%",
        }}
      >
        <Box
          sx={{ display: { xs: "block", lg: "none" } }}
          onClick={sideBarHandle}
        >
          <Image src={NavMenu} alt="logo" />
        </Box>
        <Box
          sx={{
            display: { xs: "block", lg: "none" },
          }}
        >
          <Image
            src={Logo}
            alt="logo"
            style={{
              width: "103px",
              height: "36.117px",
              marginRight: "-30px",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Notification Icon */}
          <IconButton
            aria-label="notifications"
            color="inherit"
            onClick={handleNotificationClick}
            style={{
              marginRight: "-5px",
            }}
          >
            <Badge badgeContent={notifications?.length} color="error">
              {/* <NotificationsIcon /> */}
              <Box
                sx={{
                  width: "20px",
                }}
              >
                <Image
                  src={BellIcon}
                  alt="BellIcon"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Badge>
          </IconButton>

          {/* Notification List */}

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 3.5,
                width: "260px",
                overflowY: "auto",
                background: "transparent",
                boxShadow: "none",
                padding: "0px !important",
              },
            }}
            sx={{
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                position: "relative",
                "&:after": {
                  content: '""',
                  width: "10px",
                  height: "10px",
                  borderBottom: "0.917px solid #30422E",
                  borderLeft: "0.917px solid #30422E",
                  position: "absolute",
                  right: " 54.5px",
                  top: "-5px",
                  transform: "rotate(135deg)",
                  zIndex: "1",
                  bgcolor: "white",
                },
                bgcolor: "white",
                boxShadow: "none",
              }}
            >
              {notifications?.length > 0 &&
                notifications?.map((notification, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleNotificationNavigate(notification)}
                    sx={{
                      borderBottom: "1.5px solid gray",
                      p: "10px 20px",
                      "&:hover": {
                        background: "white",
                        boxShadow: "none",
                      },
                      boxShadow: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        gap: "10px",
                      }}
                    >
                      <Box>
                        <Image
                          alt="icon"
                          src={Step1}
                          style={{
                            width: "18px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          whiteSpace: "wrap",
                          fontSize: "12px",
                          mt: "5px",
                        }}
                      >
                        {t("navBar.notif1")}{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {notification.title}
                        </span>{" "}
                        {t("navBar.notif2")}
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              {notifications.length === 0 && (
                <MenuItem
                  sx={{
                    bgcolor: "white",
                    borderBottom: "1.5px solid gray",
                    "&:hover": {
                      background: "white",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "10px",
                    }}
                  >
                    <Box>
                      <Image
                        alt="icon"
                        src={Step1}
                        style={{
                          width: "18px",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        whiteSpace: "wrap",
                        fontSize: "12px",
                        mt: "5px",
                      }}
                    >
                      {t("navBar.emptyNotif")}{" "}
                    </Box>
                  </Box>
                </MenuItem>
              )}
            </Box>
          </Menu>
          {/* More option :start */}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={moreAnchorEl ? "long-menu" : undefined}
            aria-expanded={moreAnchorEl ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleMoreClick}
            style={{
              marginLeft: "-5px",
            }}
          >
            <Box
              sx={{
                width: "20px",
              }}
            >
              <Image
                src={More}
                alt="options"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={moreAnchorEl}
            open={Boolean(moreAnchorEl)}
            onClose={handleMoreClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "260px",
                background: "transparent",
                boxShadow: "none",
                borderRadius: "5px",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                "&:after": {
                  content: '""',
                  width: "10px",
                  height: "10px",
                  borderBottom: "0.917px solid #30422E",
                  borderLeft: "0.917px solid #30422E",
                  position: "absolute",
                  right: " 10.5px",
                  top: "-5px",
                  transform: "rotate(135deg)",
                  zIndex: "1",
                  bgcolor: "white",
                },
                bgcolor: "white",
                boxShadow: "none",
                borderRadius: "5px",
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.id}
                  selected={option.title === "Pyxis"}
                  onClick={() => handleClickOption(option)}
                  sx={{
                    borderBottom: "1.5px solid gray",
                    p: "10px 15px",
                    "&:hover": {
                      background: "white",
                      boxShadow: "none",
                    },
                    boxShadow: "none",
                  }}
                >
                  {option.title}
                </MenuItem>
              ))}
            </Box>
          </Menu>
          {/* More option :end */}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
