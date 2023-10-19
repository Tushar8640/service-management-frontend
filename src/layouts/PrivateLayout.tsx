import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "@/redux/hooks";
import {useAuthCheck} from "@/hooks/useAuthCheck";
import Navbar from "@/components/shared/Navbar";

type LayoutType = {
  children?: React.ReactNode;
};

export default function PrivateLayout({children}: LayoutType) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const isChecked = useAuthCheck();
  useEffect(() => {
    if (isChecked) {
      if (!user.email) {
        router.push("/login");
      }
    }
  }, [isChecked, user.email, router]);

  if (!isChecked) {
    return <p>... loading</p>;
  }

  return (
    <div>
      <Navbar />

      <div className={`text-primary overflow-y-scroll no-scrollbar col-start-3 transition-all duration-300 pr-8 col-end-13 h-screen mt-8 z-0 pb-8 pt-20`}>{user?.email && children}</div>
    </div>
  );
}
