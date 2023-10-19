import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "@/redux/hooks";
import {useAuthCheck} from "@/hooks/useAuthCheck";
import Sidebar from "@/components/shared/Sidebar";

type LayoutType = {
  children?: React.ReactNode;
};

export default function DashboardLayout({children}: LayoutType) {
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
      <div className={``}>
        <div className="grid md:grid-cols-12 ">
          <div className={`col-span-1 h-screen fixed left-0 w-44 shadow-md  z-50  transition-all duration-300 bg-main`}>
            {" "}
            <Sidebar />
          </div>
          <div className={`text-primary overflow-y-scroll no-scrollbar col-start-3 transition-all duration-300 pr-8 col-end-13 h-screen mt-8 z-0 pb-8`}>{user?.id && children}</div>
        </div>
      </div>
    </div>
  );
}
