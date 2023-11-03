import { IService } from "./service";
import { IUser } from "./user";

export type IBooking = {
  _id: string;
  totalCost: number;
  date: string;
  time: string;
  service: IService;
  user: string | IUser;
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
};

export type IBookingProps = {
  booking: IBooking;
};
