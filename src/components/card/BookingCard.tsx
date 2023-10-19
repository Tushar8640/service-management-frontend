/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import { useAppSelector } from "@/redux/hooks";

import Link from "next/link";
import { IBookingProps } from "@/interfaces/booking";
import Swal from "sweetalert2";
import { useUpdateBookingStatusMutation } from "@/redux/features/bookings/bookingApi";

const BookingCard = ({ booking }: IBookingProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateStatus, { data, isSuccess, isError }] =
    useUpdateBookingStatusMutation();

  const handleCancel = () => {
    Swal.fire({
      title: `Do you want to cancel this booking?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id: booking._id, status: "canceled" });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    if (data?.success && isSuccess) {
      Swal.fire("Great!", "Status updated successfully!", "success");
    } else if (!data?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [data, isError, isSuccess]);

  return (
    <Card className="h-full">
      <Link href={`/services/${booking._id}`}>
        <CardHeader>
          <img
            src={
              "https://www.shutterstock.com/shutterstock/photos/182991422/display_1500/stock-photo-red-sea-anemonefish-in-bubble-anemone-182991422.jpg"
            }
            alt="card image"
            className="h-48"
          />
          <CardTitle>{booking?._id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Category:{booking?.time}</p>
          <p>Status:{booking?.status}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between">
        {booking.status !== "canceled" && (
          <Button className="" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
