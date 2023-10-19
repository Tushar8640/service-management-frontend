import {IUser} from "./user";

export type IFeedback = {
  _id: string;
  user: string | IUser;
  rating: number;
  comments: string;
};
export type IFeedbackProps = {
  feedback: IFeedback;
};
