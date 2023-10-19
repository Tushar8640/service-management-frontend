export type IUser = {
  _id: string;
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  role: "admin" | "super admin" | "user";
  profile?: string;
  address: string;
};

export type IUserProps = {
  users: IUser[];
};

export type IStatProps = {
  users: number;
  products: number;
  admins: number;
};
