import {IUser} from "./user";

export type IService = {
  _id: string;
  title: string;
  description: string;
  status: "available" | "unavailable";
  duration: string;
  price: number;
  category: string;
  image: string;
  addedBy: string;
};
export type IReviewRating = {
  _id: string;
  rating: number;
  review: string;
  service: string | IService;
  user: IUser | string;
};

export type IServiceProps = {
  service: IService;
};
