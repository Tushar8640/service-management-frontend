import ServiceCard from "@/components/card/ServiceCard";
import Navbar from "@/components/shared/Navbar";
import { IService } from "@/interfaces/service";
import MainLayout from "@/layouts/MainLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import { useGetServicesQuery } from "@/redux/features/services/serviceApi";
import { useAppSelector } from "@/redux/hooks";

export default function index() {
    const searchTerm = useAppSelector(
        (state: { filter: { searchText: any } }) => state.filter.searchText
      );
  const { data, isLoading } = useGetServicesQuery("");
  console.log(data);

  if (isLoading) {
    return <p>...loading</p>;
  }


  const filteredServices = data?.data?.filter((service: IService) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <PrivateLayout>
      <div className="w-10/12 mx-auto ">
        <h1 className="text-3xl font-serif font-semibold mt-4">
          Matched Services:
        </h1>
        <div className="grid grid-cols-4 mt-6 gap-6">
          {filteredServices?.map((item: IService) => (
            <ServiceCard key={item._id} service={item} />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
}
