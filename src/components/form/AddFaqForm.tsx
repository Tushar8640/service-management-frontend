import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {useAddFaqMutation} from "@/redux/features/faq/faq";

const AddFAQForm = () => {
  const [addFaq, {data, isError, isSuccess}] = useAddFaqMutation();
  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  //setting form data to add service
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addFaq(formData);
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `FAQ Added successfully!`, "success");
      router.push("/dashboard/faq");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif">Add FAQ</h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="question">Question</label>
            <Input type="text" id="question" name="question" value={formData.question} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="answer">Answer</label>
            <Input type="text" id="answer" name="answer" value={formData.answer} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="mt-2" type="submit">
            Add FAQ
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddFAQForm;
