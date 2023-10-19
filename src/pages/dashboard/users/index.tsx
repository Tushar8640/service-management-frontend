import UserTable from "@/components/table/UserTable";
import DashboardLayout from "@/layouts/Admin";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import React from "react";

export default function users() {
  const { data } = useGetAllUsersQuery("");

  return (
    <DashboardLayout>
      <div>users</div>
      <UserTable users={data?.data} />
    </DashboardLayout>
  );
}
