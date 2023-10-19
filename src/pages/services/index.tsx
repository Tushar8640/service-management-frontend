import ServiceCard from "@/components/card/ServiceCard";
import Navbar from "@/components/shared/Navbar";
import {IService} from "@/interfaces/service";
import MainLayout from "@/layouts/MainLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import {useGetServicesQuery} from "@/redux/features/services/serviceApi";

export default function index() {
  const {data} = useGetServicesQuery("");
  console.log(data);

  return (
    <PrivateLayout>
      <div className="w-10/12 mx-auto pb-6">
        <h1 className="text-3xl font-serif font-semibold mt-4">All Services:</h1>
        <div className="grid grid-cols-3 mt-6 gap-6">
          {data?.data?.map((item: IService) => (
            <ServiceCard key={item._id} service={item} />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
}
