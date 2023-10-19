import EditServiceForm from "@/components/form/EditServiceForm";
import EditProductForm from "@/components/form/EditServiceForm";
import EditUserForm from "@/components/form/EditUserForm";
import DashboardLayout from "@/layouts/Admin";
import {useGetSingleUserQuery} from "@/redux/features/auth/authApi";
import {useRouter} from "next/router";
import React from "react";

export default function EditUser() {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading} = useGetSingleUserQuery(id);
  return isLoading ? (
    <h1 className="text-4xl m-3 font-bold">Loading....</h1>
  ) : (
    <DashboardLayout>
      <EditUserForm user={data?.data} />
    </DashboardLayout>
  );
}
