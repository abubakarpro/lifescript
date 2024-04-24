import { facebookLogin } from "@/store/slices/authSlice";
import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SsoRedirecting = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter()
    const { data: session } = useSession();
    useEffect(() => {
        setLoading(true)
        if (session) {
            console.log('session data', session)
          if (session.user) {
            const payload = {
              name: session.user.name,
              email: session.user.email
            };
            dispatch(facebookLogin(payload))
            .unwrap() 
            .then((res) => {
                setLoading(false)
              console.log("Res Console" ,res)
              toast.success("login with facebook");
              router.push('/dashboard/chapters')
              router.push(`/getStarted/getTitle?userName=${res?.name}`); 
            //   window.location.href = `/getStarted/getTitle?userName=${res?.name}`
            })
            
            .catch((error) => {
                setLoading(false)
              toast.error(error.message);
            });
          }
        }
      }, [session, dispatch]);


  return <Box>{loading && <CircularProgress />}</Box>;
};

export default SsoRedirecting;
