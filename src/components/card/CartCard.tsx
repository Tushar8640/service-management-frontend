import {useEffect} from "react";
import {Card, CardContent} from "../ui/card";
import {Button} from "../ui/button";

import {useDeleteToCartMutation, useGetSingleCartQuery, useHandleQuantityMutation} from "@/redux/features/cart/cartApi";
import {useAppSelector} from "@/redux/hooks";
import Swal from "sweetalert2";
import {ICartProps} from "@/interfaces/cart";
import {DeleteIcon} from "lucide-react";
import {useAddBookingMutation} from "@/redux/features/bookings/bookingApi";

const CartCard = ({cart}: ICartProps) => {
  const {data: cartData} = useGetSingleCartQuery({
    id: cart.serviceId,
  });

  //remove cart from cart
  const {user} = useAppSelector((state) => state.auth);

  const [deleteToCart, {data, isError, isSuccess}] = useDeleteToCartMutation();

  const handleDelete = () => {
    deleteToCart({
      user: user.id,
      serviceId: cart.serviceId,
    });
  };

  //showing success or error message on delete
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `cart Deleted from cart successfully!`, "success");
    }
  }, [isSuccess, isError, data]);
  const currentDate = new Date().toISOString().split("T")[0];

  // Get the current time in HH:mm format (e.g., "10:30")
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [book, {data: bookingData, isError: bookingError, isSuccess: bookingSuccess}] = useAddBookingMutation();
  const handleBook = () => {
    if (user.id) {
      book({
        totalCost: cart?.price,
        service: cart?.serviceId,
        user: user.id,
        date: currentDate,
        time: currentTime,
      });
    } else {
      Swal.fire("Sorry!", `You have to login first!`, "error");
    }
  };
  useEffect(() => {
    if (!bookingData?.success && bookingError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (bookingData?.success && bookingData?.data) {
      Swal.fire("Congratulations!", `Booking  successfully completed!`, "success");
    }
  }, [bookingSuccess, bookingData, bookingError]);
  return (
    <Card className="text-black hover:shadow-xl p-2">
      <CardContent className="">
        <div className="grid md:grid-cols-4 justify-between md:items-center gap-2">
          <img src={cartData?.data?.image} alt="card image" className="w-14 h-14" />
          <div className="flex flex-col justify-center">
            <p className="lg:text-center mt-3 text-sm font-medium mx-auto">{cartData?.data?.category}</p>
          </div>

          <div className="flex flex-col justify-center items-end">
            <p>{(cart?.price * cart.quantity).toFixed(2)}৳</p>
          </div>
          <div className="flex items-center justify-center gap-1 mx-auto">
            <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => handleBook()}>
              Book Now
            </Button>

            <DeleteIcon className="text-xl text-red-400 cursor-pointer" onClick={handleDelete} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartCard;
