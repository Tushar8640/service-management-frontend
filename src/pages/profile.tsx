import UserProfile from "@/components/form/UserProfile";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import {useGetSingleUserQuery} from "@/redux/features/auth/authApi";
import {useAppSelector} from "@/redux/hooks";
import {useState} from "react";

export default function profile() {
  const userId = useAppSelector((state) => state.auth.user.id);
  const {data: user, isLoading} = useGetSingleUserQuery(userId);
  // Initialize state to hold form input values
  console.log(user);

  console.log(user);

  return isLoading ? (
    <h1 className="text-4xl m-3 font-bold">Loading....</h1>
  ) : (
    <PrivateLayout>
      <UserProfile user={user?.data} />
    </PrivateLayout>
  );
}
