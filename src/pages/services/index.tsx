import Navbar from "@/components/shared/Navbar";
import { useGetServicesQuery } from "@/redux/features/services/serviceApi";

export default function index() {
  const { data } = useGetServicesQuery("");
  console.log(data);
  return (
    <div>
      <Navbar />
    </div>
  );
}
