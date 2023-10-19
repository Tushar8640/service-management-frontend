import {useEffect, useState} from "react";
import {useAppDispatch} from "../redux/hooks";
import {useAuth} from "./useAuth";
import {userLoggedIn, userLoggedOut} from "@/redux/features/auth/authSlice";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const auth = JSON.parse(authData);
      dispatch(userLoggedIn(auth));
    }
    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};
