import ServiceTable from "@/components/table/ServiceTable";
import DashboardLayout from "@/layouts/Admin";
import React from "react";

export default function products() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold font-serif">All Services:</h1>
      <ServiceTable />
    </DashboardLayout>
  );
}
