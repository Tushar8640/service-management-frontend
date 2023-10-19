export type IService = {
  _id: string;
  title: string;
  description: string;
  status: "available" | "unavailable";
  duration: string;
  price: number;
  category: string;
  images: string[];
  addedBy: string;
};

export type IServiceProps = {
  service: IService;
};