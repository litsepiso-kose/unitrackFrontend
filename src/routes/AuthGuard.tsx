/* eslint-disable no-unsafe-optional-chaining */
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ROUTES, STR_TOKEN } from "../helpers/common";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/user-slice";
import { CircularProgress } from "@mui/joy";
import { useLocation, useParams } from "react-router-dom";

const VERIFY_TOKEN = gql(`
mutation VerifyToken($input: String!) {
  verifyToken(input: $input) {
    isValid
    token
    email
    userType
    voiceLanguage
  }
}
`);

type RootProps = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: RootProps) {
  const [loaded, setLoaded] = useState(false);
  const token = sessionStorage.getItem(STR_TOKEN);
  const { roomId } = useParams()
  const location = useLocation();

  const [verifyToken] = useMutation(VERIFY_TOKEN, {
    variables: { input: token || "" },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyTokenAsync = async () => {
      try {
        if (!token) {
          let url = ROUTES.SIGNIN;
          if (roomId) url += `roomId=${roomId}`
          else if (location?.pathname) {
            url += `?location=${location?.pathname}`
          }

          window.location.href = url
        };

        const rtn = await verifyToken({ variables: { input: token || "" } });

        if (rtn.data) {

          const { isValid } = rtn.data?.verifyToken;
          if (isValid) {
            const { email, token, userType, voiceLanguage } = rtn.data?.verifyToken;
            // console.log(rtn.data?.verifyToken)
            sessionStorage.setItem(STR_TOKEN, token);
            dispatch(setUser({ user: { email, userType, voiceLanguage } }));
            setLoaded(true);
          } else {
            sessionStorage.removeItem(STR_TOKEN);
            window.location.href = ROUTES.SIGNIN;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyTokenAsync();
  }, [dispatch, token, verifyToken]);

  if (loaded) return <>{children}</>;

  else
    return (
      <CircularProgress />
    );
}


