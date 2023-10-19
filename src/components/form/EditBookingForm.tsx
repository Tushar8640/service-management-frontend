import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {IBookingProps} from "@/interfaces/booking";
import {useReScheduleBookingMutation} from "@/redux/features/bookings/bookingApi";

const EditBookingForm = ({booking}: IBookingProps) => {
  const [reScheduleBooking, {data, isError, isSuccess}] = useReScheduleBookingMutation();

  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    id: booking?._id,
    date: booking?.date,
    time: booking?.time,
  });

  //setting form data for edit
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    reScheduleBooking(formData);
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Booking Rescheduled successfully!`, "success");
      router.push("/dashboard/bookings");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif ">Reschedule Booking</h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="date">date</label>
            <Input type="date" id="date" name="date" value={formData?.date} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time">Time</label>
            <Input type="text" id="time" name="time" value={formData?.time} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="mt-2" type="submit">
            Reschedule
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditBookingForm;
