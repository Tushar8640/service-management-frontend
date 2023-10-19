import {IService} from "./service";
import {IUser} from "./user";

export type IBooking = {
  _id: string;
  totalCost: number;
  date: string;
  time: string;
  service: string | IService;
  user: string | IUser;
  status: "pending" | "confirmed" | "canceled";
};

export type IBookingsProps = {
  booking: IBooking[];
};
export type IBookingProps = {
  booking: IBooking;
};
