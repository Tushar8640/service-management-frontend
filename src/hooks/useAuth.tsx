import { useAppSelector } from "@/redux/hooks";

export const useAuth = () => {
  const auth = useAppSelector((state) => state?.auth);
  if (auth?.user?.token) {
    return true;
  } else {
    return false;
  }
};
