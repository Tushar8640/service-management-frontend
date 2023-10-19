import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useAppSelector} from "@/redux/hooks";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {useAddServiceMutation} from "@/redux/features/services/serviceApi";

const AddServiceForm = () => {
  const {user} = useAppSelector((state) => state.auth);
  const [addService, {data, isError, isSuccess}] = useAddServiceMutation();
  const [images, setImages] = useState<string[]>([]);
  const [imageBox, setImageBox] = useState<string[]>(["add"]);
  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    duration: "",
    category: "",
    status: "available",
    description: "",
    images: images,
    addedBy: user.id,
  });
  //handling images

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.value;
    setImages((prevData) => [...prevData, image]);
    console.log(images);
  };
  //setting form data to add service
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    const numericValue = name === "price" ? parseFloat(value) : value;
    setFormData({...formData, [name]: numericValue});
    formData.images = images;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addService(formData);
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Service Added successfully!`, "success");
      router.push("/dashboard/services");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif">Add Service</h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <Input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <Input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="price">Price</label>
            <Input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required className="rounded" />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <Input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea rows={4} className="w-full rounded" id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>

        <div className="grid grid-cols-2 items-start gap-2 mb-2">
          <div>
            {imageBox.map((image, index) => (
              <div key={index}>
                <label htmlFor={`image${index}`}>Image URL</label>
                <Input type="text" id={`image${index}`} name={`image${index}`} onChange={(e) => handleImages(e)} className="rounded w-full" />
              </div>
            ))}
          </div>
          <div className="flex mt-6">
            <div className="py-1.5 px-2 rounded bg-zinc-700 text-white" onClick={() => setImageBox((prevData) => [...prevData, "add"])}>
              Add More Image
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="mt-2" type="submit">
            Add Service
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddServiceForm;
