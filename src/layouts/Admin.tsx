import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";

type LayoutType = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: LayoutType) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const isChecked = useAuthCheck();

  const { data } = useGetAllUsersQuery("");
  console.log(data);
  useEffect(() => {
    if (isChecked) {
      if (!user.email) {
        router.push("/login");
      }
    }
    console.log(isChecked);
  }, [isChecked, user.email, router]);

  if (!isChecked) {
    return <p>... loading</p>;
  }

  return <div>{user?.email && children}</div>;
}
