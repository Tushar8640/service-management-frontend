import BookingTable from "@/components/table/BookingTable";
import UserTable from "@/components/table/UserTable";
import DashboardLayout from "@/layouts/Admin";
import { useGetBookingsQuery } from "@/redux/features/bookings/bookingApi";
import React from "react";

export default function users() {
 
  return (
    <DashboardLayout>
      <div>Bookings</div>
      {/* <BookingTable /> */}
    </DashboardLayout>
  );
}
