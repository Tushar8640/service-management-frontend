import ServiceTable from "@/components/table/ServiceTable";
import DashboardLayout from "@/layouts/Admin";
import React from "react";

export default function products() {
  return (
    <DashboardLayout>
      <div>users</div>
      <ServiceTable />
    </DashboardLayout>
  );
}
