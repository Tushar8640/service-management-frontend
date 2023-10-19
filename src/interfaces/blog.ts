import {IUser} from "./user";

export type IBlog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: IUser | string;
  views: number;
};

export type IBlogProps = {
  blog: IBlog;
};
