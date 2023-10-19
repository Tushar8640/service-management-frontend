import BookingCard from "@/components/card/BookingCard";
import BookingTable from "@/components/table/BookingTable";
import { IBooking } from "@/interfaces/booking";
import { IService } from "@/interfaces/service";
import { IUser } from "@/interfaces/user";
import MainLayout from "@/layouts/MainLayout";
import { useGetBookingsByUserQuery } from "@/redux/features/bookings/bookingApi";
import { useAppSelector } from "@/redux/hooks";

export default function bookings() {
  const userId = useAppSelector((state) => state.auth.user.id);
  const { data, isLoading } = useGetBookingsByUserQuery(userId);
  console.log(data);
  return (
    <MainLayout>
      <div className="grid grid-cols-3">{}</div>
      <div className="grid grid-cols-3">
        {data?.data?.map((item: IBooking) => (
          <BookingCard key={item?._id} booking={item} />
        ))}
      </div>
    </MainLayout>
  );
}
