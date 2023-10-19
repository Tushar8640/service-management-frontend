export type ICart = {
  serviceId: string;
  price: number;
  quantity: number;
  user: string;
};

export type ICartProps = {
  product: ICart;
};
