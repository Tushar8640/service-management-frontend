import EditProductForm from "@/components/form/EditServiceForm";
import DashboardLayout from "@/layouts/Admin";
import { useGetSingleServiceQuery } from "@/redux/features/services/serviceApi";
import { useRouter } from "next/router";
import React from "react";

export default function editservice() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data } = useGetSingleServiceQuery(id);
  console.log(data);
  return (
    <DashboardLayout>
      <EditProductForm product={data?.data} />
    </DashboardLayout>
  );
}
