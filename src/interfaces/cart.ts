import {IService} from "./service";
import {IUser} from "./user";

export type ICart = {
  serviceId: string | IService;
  price: number;
  quantity: number;
  user: string | IUser;
};

export type ICartProps = {
  cart: ICart;
};
