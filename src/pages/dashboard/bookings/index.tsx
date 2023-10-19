import BookingTable from "@/components/table/BookingTable";
import UserTable from "@/components/table/UserTable";
import DashboardLayout from "@/layouts/Admin";
import {useGetBookingsQuery} from "@/redux/features/bookings/bookingApi";
import React from "react";

export default function users() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold font-serif">All Bookings:</h1>
      <BookingTable />
    </DashboardLayout>
  );
}
