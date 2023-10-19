import {useEffect} from "react";
import Swal from "sweetalert2";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "../ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {useDeleteBookingMutation, useGetSingleBookingQuery, useUpdateBookingStatusMutation} from "@/redux/features/bookings/bookingApi";

//
export type TableProps = {
  id: string;
};
const BookingTableAction = ({id}: TableProps) => {
  const {data} = useGetSingleBookingQuery(id);
  //delete service
  const [deleteBooking, {data: deleteData, isSuccess, isError}] = useDeleteBookingMutation();

  const handleDeleteBooking = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this booking?",
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
        deleteBooking(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (deleteData?.success && isSuccess) {
      Swal.fire("Great!", "Booking deleted successfully!", "success");
    } else if (!deleteData?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [deleteData, isError, isSuccess]);
  //update status
  const [updateStatus, {data: updateData, isSuccess: updateSuccess, isError: updateError}] = useUpdateBookingStatusMutation();
  const handleStatus = (status: string) => {
    Swal.fire({
      title: `Do you want to ${status === "confirmed" ? "confirm" : "cancel"} this booking?`,
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
        updateStatus({id, status});
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on update
  useEffect(() => {
    if (updateData?.success && updateSuccess) {
      Swal.fire("Great!", "Status updated successfully!", "success");
    } else if (!updateData?.success && updateError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [updateData, updateError, updateSuccess]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href={`/dashboard/bookings/editbooking/${id}`}>Reschedule</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteBooking(id)}>Delete</DropdownMenuItem>
        {data?.data?.status === "pending" && <DropdownMenuItem onClick={() => handleStatus("confirmed")}>Confirm</DropdownMenuItem>}
        {data?.data?.status === "pending" && <DropdownMenuItem onClick={() => handleStatus("canceled")}>Cancel</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookingTableAction;
