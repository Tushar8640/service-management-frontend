import UserTable from "@/components/table/UserTable";
import DashboardLayout from "@/layouts/Admin";
import {useGetAllUsersQuery} from "@/redux/features/auth/authApi";
import React from "react";

export default function users() {
  const {data} = useGetAllUsersQuery("");

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold font-serif">Users:</h1>
      <UserTable />
    </DashboardLayout>
  );
}
