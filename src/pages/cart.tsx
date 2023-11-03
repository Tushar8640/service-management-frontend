import CartCard from "@/components/card/CartCard";
import Error from "@/components/shared/Error";
import {Button} from "@/components/ui/button";
import {ICart} from "@/interfaces/cart";
import MainLayout from "@/layouts/MainLayout";
import PrivateLayout from "@/layouts/PrivateLayout";

import {useGetSingleCartQuery} from "@/redux/features/cart/cartApi";
import {useAppSelector} from "@/redux/hooks";
import Link from "next/link";

const Cart = () => {
  const {user} = useAppSelector((state) => state.auth);
  const {data, isLoading, isError} = useGetSingleCartQuery(user.id);
  //let decide what to render
  console.log(data);
  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    content = <Error message="No Products in cart!" />;
  }
  if (!isLoading && data?.data?.length === 0) {
    content = <h1 className="font-semibold font-serif text-xl">No Products in cart!</h1>;
  }
  if (!isLoading && data?.data?.length > 0) {
    content = data?.data?.length > 0 && data?.data?.map((cart: ICart, i: number) => <CartCard cart={cart} key={i} />);
  }
  return (
    <PrivateLayout>
      <div className="w-9/12 mx-auto py-12 ">
        <div className="flex items-center mb-3">
          <p className="text-xl font-semibold font-serif">Shopping Cart:</p>
        </div>
        <div className="grid grid-cols-1 gap-4 justify-center px-6 bg-gray-100 py-6">
          {content}
     
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Cart;
