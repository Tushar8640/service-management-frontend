import DashboardLayout from "@/layouts/Admin";
import {useGetSingleFaqQuery, useUpdateFaqMutation} from "@/redux/features/faq/faq";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {useEffect, useState, ChangeEvent, FormEvent} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useGetSingleBlogQuery, useUpdateBlogMutation} from "@/redux/features/blog/blog";
const EditBlog = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading} = useGetSingleBlogQuery(id);
  const [updateBlog, {data: updateData, isError, isSuccess}] = useUpdateBlogMutation();

  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    title: data?.data?.title,
    description: data?.data?.description,
    image: data?.data?.image,
  });

  //setting form data for edit
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateBlog({id: data?.data?._id, data: formData});
  };
  //showing success or error message
  useEffect(() => {
    if (!updateData?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (updateData?.success && !isError) {
      Swal.fire("Congratulations!", `Blog updated successfully!`, "success");
      router.push("/dashboard/blogs");
    }
  }, [isSuccess, isError, updateData]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1 className="text-4xl font-bold">Loading....</h1>
      ) : (
        <div className="w-10/12 mx-auto mt-4">
          <h1 className="text-3xl font-semibold text-center mb-3 font-serif">Edit Blog</h1>
          <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
            <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
              <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <Input type="text" id="title" name="title" defaultValue={data?.data?.title} onChange={handleInputChange} required className="rounded" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="image">Image</label>
                <Input type="text" id="image" name="image" defaultValue={data?.data?.image} onChange={handleInputChange} required className="rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea rows={4} className="w-full rounded" id="description" name="description" defaultValue={data?.data?.description} onChange={handleInputChange}></textarea>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="mt-2" type="submit">
                Edit Blog
              </Button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditBlog;
