import EditBookingForm from "@/components/form/EditBookingForm";
import DashboardLayout from "@/layouts/Admin";
import {useGetSingleBookingQuery} from "@/redux/features/bookings/bookingApi";
import {useRouter} from "next/router";
import React from "react";

export default function EditBooking() {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading} = useGetSingleBookingQuery(id);
  return isLoading ? (
    <h1 className="text-4xl m-3 font-bold">Loading....</h1>
  ) : (
    <DashboardLayout>
      <EditBookingForm booking={data?.data} />
    </DashboardLayout>
  );
}
