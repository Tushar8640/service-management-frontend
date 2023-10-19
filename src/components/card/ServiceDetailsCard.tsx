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
import {
  useAddReviewsMutation,
  useGetReviewsQuery,
  useGetSingleServiceQuery,
} from "@/redux/features/services/serviceApi";
import { Input } from "../ui/input";
import { IReviewRating } from "@/interfaces/service";
const ServiceDetailsCard = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetSingleServiceQuery(id);
  //handling quantity of product
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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

  const [
    addReview,
    { data: reviewData, isError: reviewError, isSuccess: reviewAddSuccess },
  ] = useAddReviewsMutation();
  const handleAddReview = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addReview({
      rating: rating,
      review: review,
      service: data?.data?._id,
      user: user.id,
    });
  };
  //showing success or error message
  useEffect(() => {
    if (!reviewData?.success && reviewError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (reviewData?.success && reviewData?.data) {
      Swal.fire("Congratulations!", `Review Added  successfully!`, "success");
    }
  }, [reviewData, reviewError, reviewAddSuccess]);

  const { data: reviewAndRatingData } = useGetReviewsQuery(data?.data?._id);
  console.log(reviewAndRatingData);
  return (
    <section className="">
      <div className="md:container w-11/12 flex flex-col items-center mx-auto lg:flex-row mt-4 py-8">
        <div className="w-full lg:w-1/3">
          <img
            src={
              "https://www.shutterstock.com/shutterstock/photos/182991422/display_1500/stock-photo-red-sea-anemonefish-in-bubble-anemone-182991422.jpg"
            }
            alt="product"
            className="w-full"
          />
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
      <div className="w-full p-4 bg-white shadow-md rounded-lg">
        <h3 className="font-bold text-xl mb-4">Add A review</h3>
        <form onSubmit={handleAddReview} className="mb-4">
          <div className="mb-4">
            <Input
              min={0}
              max={5}
              type="number"
              id="rating"
              value={rating}
              name="rating"
              className="w-full border border-black p-2 rounded"
              placeholder="Your rating"
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="review"
              name="review"
              className="w-full border border-black p-2 rounded"
              placeholder="Your Comment"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4"></div>
          <div className="mb-4"></div>
          <div className="mt-8">
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </Button>
          </div>
        </form>

        <div>
          {reviewAndRatingData?.data?.map((item: IReviewRating) => (
            <div className="p-3 shadow-lg mb-3">
              <p className="font-bold text-xl">
                Name: {item?.user.name.firstName} {item?.user.name.lastName}
              </p>
              <p> Comment: {item?.review}</p>
              <p> Rating: {item?.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsCard;
