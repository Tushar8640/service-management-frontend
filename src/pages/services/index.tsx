import ServiceCard from "@/components/card/ServiceCard";
import Navbar from "@/components/shared/Navbar";
import { IService } from "@/interfaces/service";
import MainLayout from "@/layouts/MainLayout";
import { useGetServicesQuery } from "@/redux/features/services/serviceApi";

export default function index() {
  const { data } = useGetServicesQuery("");
  console.log(data);

  return (
    <MainLayout>
      <h1>Hello</h1>
      <div className="grid grid-cols-3 mt-[100px] gap-3">
        {data?.data?.map((item: IService) => (
          <ServiceCard key={item._id} service={item} />
        ))}
      </div>
    </MainLayout>
  );
}
