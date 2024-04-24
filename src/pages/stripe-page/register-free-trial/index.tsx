

"use client";
import Logo from "@/_assets/svg/logo-dashboard.svg";
import { Box } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { facebookLogin } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import RegisterFreeTrial from "./_components/RegisterFreeTrial";
import BgLogo from "../../../_assets/svg/BgLogo.svg";


const RegisterTrialPage = () => {
    // const dispatch = useDispatch();
    // const { data: session } = useSession();
  
    // useEffect(() => {
    //   if (session) {
    //     if (session.user) {
    //       const payload = {
    //         name: session.user.name,
    //         email: session.user.email
    //       };
    //       dispatch(facebookLogin(payload));
    //     }
    //   }
    // }, [session, dispatch]);

    // useEffect(() => {
    //     if (session) {
    //       if (session.user) {
    //         const payload = {
    //           name: session.user.name,
    //           email: session.user.email
    //         };
    //         dispatch(facebookLogin(payload))
    //         .unwrap() 
    //         .then((res) => {
    //           console.log("Res Console" ,res)
    //           alert(res?.data?.name)
    //           alert(res?.data?.token)
    //           toast.success(t("login with facebook"));
    //           router.push(`/getStarted/getTitle?userName=${res?.name}`); 
    //         })
    //         .catch((error) => {
    //           toast.error(error.message);
    //         });
    //       }
    //     }
    //   }, [session, dispatch]);

    return (
        <>

            <Box
                sx={{
                    bgcolor: "#f3ecda",
                    color: "#3e4f3c",
                    height: "100vh",
                    position: "relative",
                }}
            >
                <Box position={"relative"} zIndex={2}>
                    <Box
                        sx={{
                            bgcolor: "#30422e",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                        }}
                    >
                        <Image src={Logo} alt="Logo" />
                    </Box>

                    <Box
                    sx={{
                      marginTop: "90px",
                      marginLeft: "10px",
                    //   width: "600px",
                    }}
                    >
                        <Box mt="70px">

                            <RegisterFreeTrial />
                        </Box>


                    </Box>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        right: "0px",
                        bottom: "0px",
                        zIndex: 1,
                        maxWidth: "600px",
                        // width: "100%",
                    }}
                >
                    <Image
                        src={BgLogo}
                        alt="Giving Tree Logo"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default RegisterTrialPage;
