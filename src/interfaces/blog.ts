import { IUser } from "./user";

export type IBlog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: IUser | string;
  views: number;
  createdAt: string;
};

export type IBlogProps = {
  blog: IBlog;
};
