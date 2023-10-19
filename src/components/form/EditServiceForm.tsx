import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import Swal from "sweetalert2";
import {IServiceProps} from "@/interfaces/service";
import {useRouter} from "next/router";
import {useUpdateServiceMutation} from "@/redux/features/services/serviceApi";
import {Select} from "@radix-ui/react-select";
import {Option} from "lucide-react";

const EditServiceForm = ({service}: IServiceProps) => {
  const [updateService, {data, isError, isSuccess}] = useUpdateServiceMutation();

  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    title: service?.title,
    price: service?.price,
    category: service?.category,
    status: service?.status,
    description: service?.description,
    image: service?.image,
    duration: service?.duration,
  });

  //setting form data for edit
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    const numericValue = name === "price" ? parseFloat(value) : value;
    setFormData({...formData, [name]: numericValue});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateService({id: service?._id, data: formData});
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Service Updated successfully!`, "success");
      router.push("/dashboard/services");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif ">Update Service</h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <Input type="text" id="title" name="title" value={formData?.title} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <Input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="price">Price</label>
            <Input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required className="rounded" />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <Input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required className="rounded" />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={formData?.status} onChange={handleInputChange} required className="rounded w-full py-2 px-2">
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea rows={4} className="w-full rounded" id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>

        <div className="grid grid-cols-2 items-start gap-2 mb-2">
          <div>
            <label htmlFor={`image`}>Image URL</label>
            <Input type="text" id={`image`} name={`image`} onChange={handleInputChange} className="rounded w-full" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="mt-2" type="submit">
            Edit Service
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditServiceForm;
