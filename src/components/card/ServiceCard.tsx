/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux/hooks";
import { IServiceProps } from "@/interfaces/service";
import Link from "next/link";

const ServiceCard = ({ service }: IServiceProps) => {
  //
  const [quantity, setQuantity] = useState(1);
  const { user } = useAppSelector((state) => state.auth);
  //adding service to cart
  const [addToCart, { data, isSuccess, isError }] = useAddToCartMutation();
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
  //
  const handleQuantity = (operation: string) => {
    if (operation === "plus") {
      setQuantity(quantity + 1);
    }
    if (operation === "minus" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  //showing success or error message when adding service
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire(
        "Congratulations!",
        `service Added to cart successfully!`,
        "success"
      );
    }
  }, [isSuccess, isError, data]);
  return (
    <Card className="h-full">
      <Link href={`/services/${service._id}`}>
        <CardHeader>
          <img
            src={
              "https://www.shutterstock.com/shutterstock/photos/182991422/display_1500/stock-photo-red-sea-anemonefish-in-bubble-anemone-182991422.jpg"
            }
            alt="card image"
            className="h-48"
          />
          <CardTitle>{service?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Category:{service?.category}</p>
          <p>Status:{service?.status}</p>
          <p>price:{service?.price}৳</p>
          +-
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold"
            onClick={() => handleQuantity("plus")}
          >
            +
          </Button>
          <h2 className="font-bold">{quantity}</h2>
          <Button
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold"
            onClick={() => handleQuantity("minus")}
          >
            -
          </Button>
        </div>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
