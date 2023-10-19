/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import ProductBadge from "@/components/ui/ProductBadge";
import { Button } from "@/components/ui/button";
import { useGetSingleProductQuery } from "@/redux/features/products/productApi";

import { useEffect, useState } from "react";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { useGetSingleServiceQuery } from "@/redux/features/services/serviceApi";
const ServiceDetailsCard = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading} = useGetSingleServiceQuery(id);
  //handling quantity of product
  const [quantity, setQuantity] = useState(1);

  //adding product to cart
  const { user } = useAppSelector((state) => state.auth);
  const [addToCart, { data: addData, isSuccess, isError }] =
    useAddToCartMutation();
  const handleAddToCart = () => {
    addToCart({
      price: data?.data?.price,
      serviceId: data?.data?._id,
      quantity: quantity,
      user: user.id,
    });
  };
  //showing success or error message
  useEffect(() => {
    if (!addData?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (addData?.success && addData?.data) {
      Swal.fire(
        "Congratulations!",
        `Service Added to cart successfully!`,
        "success"
      );
    }
  }, [isSuccess, isError, addData]);
  return (
    <section className="">
      <div className="md:container w-11/12 flex flex-col items-center mx-auto lg:flex-row mt-4 py-8">
        <div className="w-full lg:w-1/3">
          <img src={"https://www.shutterstock.com/shutterstock/photos/182991422/display_1500/stock-photo-red-sea-anemonefish-in-bubble-anemone-182991422.jpg"} alt="product" className="w-full" />
        </div>
        <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
          <p className="text-2xl text-primary font-semibold font-serif">
            {data?.data?.name}
          </p>
          <div className="flex md:items-center gap-3 mt-3 flex-wrap">
            <ProductBadge text="Price:" value={`${data?.data?.price}`} />
            <ProductBadge text="Status:" value={`${data?.data?.status}`} />
            <ProductBadge text="Category:" value={`${data?.data?.category}`} />
 
          </div>
          <div className="border-b border-gray-300 my-2">
        
            <h1 className="my-2">
              {" "}
              <span className="font-semibold text-primary my-2 text-lg ">
                Description:
              </span>
              {data?.data?.description}
            </h1>
            <p>
              {/* <Rating initialRating={parseFloat((data?.data?.rating?.reduce((acc: any, rating: any) => acc + rating, 0) / data?.data?.rating?.length).toFixed(1))} emptySymbol={<FaStar className="text-yellow-200 text-lg" />} fullSymbol={<FaStar className="text-yellow-500 text-lg" />} readonly></Rating> */}
            </p>
   
            <Button
              variant={"outline"}
              className="my-4 w-1/5 bg-white hover:bg-black hover:text-gray-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
  
      
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsCard;
