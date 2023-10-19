import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import DashboardLayout from "@/layouts/Admin";
import {useAddBlogMutation} from "@/redux/features/blog/blog";
import {useAppSelector} from "@/redux/hooks";
import {useRouter} from "next/router";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Swal from "sweetalert2";

const AddBlog = () => {
  const [addBlog, {data, isError, isSuccess}] = useAddBlogMutation();
  const {user} = useAppSelector((state) => state.auth);
  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: user.id,
    image: "",
  });

  //setting form data to add service
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addBlog(formData);
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Blog Added successfully!`, "success");
      router.push("/dashboard/blogs");
    }
  }, [isSuccess, isError, data, router]);
  return (
    <DashboardLayout>
      <div className="w-10/12 mx-auto mt-4">
        <h1 className="text-3xl font-semibold text-center mb-3 font-serif">Add Blog</h1>
        <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
          <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <Input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="rounded" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image">Image</label>
              <Input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} required className="rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea rows={4} className="w-full rounded" id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
            </div>
          </div>

          <div className="flex ">
            <Button className="mt-2" type="submit">
              Add Blog
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddBlog;
