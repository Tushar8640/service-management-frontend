import DashboardLayout from "@/layouts/Admin";
import {useGetSingleFaqQuery, useUpdateFaqMutation} from "@/redux/features/faq/faq";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {useEffect, useState, ChangeEvent, FormEvent} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
const EditFAQ = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading} = useGetSingleFaqQuery(id);
  const [updateFaq, {data: updateData, isError, isSuccess}] = useUpdateFaqMutation();

  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    question: data?.data?.question,
    answer: data?.data?.answer,
  });

  //setting form data for edit
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateFaq({id: data?.data?._id, data: formData});
  };
  //showing success or error message
  useEffect(() => {
    if (!updateData?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (updateData?.success && !isError) {
      Swal.fire("Congratulations!", `FAQ updated successfully!`, "success");
      router.push("/dashboard/faq");
    }
  }, [isSuccess, isError, updateData]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1 className="text-4xl font-bold">Loading....</h1>
      ) : (
        <div className="w-10/12 mx-auto mt-4">
          <h1 className="text-3xl font-semibold text-center mb-3 font-serif">Edit FAQ</h1>
          <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
            <div className="grid grid-cols-1 items-center gap-2 w-10/12 my-2 mx-auto">
              <div className="flex flex-col">
                <label htmlFor="question">Question</label>
                <Input type="text" id="question" name="question" defaultValue={data?.data?.question} onChange={handleInputChange} required className="rounded" />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="answer">Answer</label>
                <Input type="text" id="answer" name="answer" defaultValue={data?.data?.answer} onChange={handleInputChange} required className="rounded" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="mt-2" type="submit">
                Edit FAQ
              </Button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditFAQ;
