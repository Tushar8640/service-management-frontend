import BookingTable from "@/components/table/BookingTable";
import DashboardLayout from "@/layouts/Admin";
import React from "react";

export default function users() {
  return (
    <DashboardLayout>
      <div>Bookings</div>
      <BookingTable />
    </DashboardLayout>
  );
}
