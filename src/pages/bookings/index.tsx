import BookingCard from "@/components/card/BookingCard";
import {IBooking} from "@/interfaces/booking";
import MainLayout from "@/layouts/MainLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import {useGetBookingsByUserQuery} from "@/redux/features/bookings/bookingApi";
import {useAppSelector} from "@/redux/hooks";

export default function bookings() {
  const userId = useAppSelector((state) => state.auth.user.id);
  const {data, isLoading} = useGetBookingsByUserQuery(userId);
  console.log(data);
  return (
    <PrivateLayout>
      <div className="grid grid-cols-3">{}</div>
      <div className="grid grid-cols-3">
        {data?.data?.map((item: IBooking) => (
          <BookingCard key={item?._id} booking={item} />
        ))}
      </div>
    </PrivateLayout>
  );
}
