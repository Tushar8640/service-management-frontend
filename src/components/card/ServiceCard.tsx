/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

import {Button} from "../ui/button";

import {useAddToCartMutation} from "@/redux/features/cart/cartApi";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useAppSelector} from "@/redux/hooks";
import {IServiceProps} from "@/interfaces/service";
import Link from "next/link";

const ServiceCard = ({service}: IServiceProps) => {
  //
  const [quantity, setQuantity] = useState(1);
  const {user} = useAppSelector((state) => state.auth);
  //adding service to cart
  const [addToCart, {data, isSuccess, isError}] = useAddToCartMutation();
  const handleAddToCart = () => {
    if (user.id) {
      addToCart({
        price: service?.price,
        serviceId: service?._id,
        quantity: quantity,
        user: user.id,
      });
    } else {
      Swal.fire("Sorry!", `You have to login first!`, "error");
    }
  };

  //showing success or error message when adding service
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `service Added to cart successfully!`, "success");
    }
  }, [isSuccess, isError, data]);
  return (
    <Card className="h-full">
      <Link href={`/services/${service._id}`}>
        <CardHeader>
          <img src={service?.image} alt="card image" className="h-48" />
          <CardTitle>{service?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Category:{service?.category}</p>
          <p>Status:{service?.status}</p>
          <p>price:{service?.price}৳</p>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={handleAddToCart} className="py-2">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
