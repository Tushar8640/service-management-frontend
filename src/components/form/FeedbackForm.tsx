import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useAppSelector} from "@/redux/hooks";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {useAddServiceMutation} from "@/redux/features/services/serviceApi";
import {useAddFeedbackMutation} from "@/redux/features/feedback/feedback";

const FeedBackForm = () => {
  const {user} = useAppSelector((state) => state.auth);
  const [addFeedback, {data, isError, isSuccess}] = useAddFeedbackMutation();
  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    rating: 0,
    comments: "",
    user: user.id,
  });

  //setting form data to add service
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    const numericValue = name === "rating" ? parseFloat(value) : value;
    setFormData({...formData, [name]: numericValue});
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addFeedback(formData);
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `You Give Feedback successfully!`, "success");
      router.push("/");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif">Please give your valuable feedback</h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-6 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="rating">Rating</label>
            <Input type="number" id="rating" name="rating" value={formData.rating} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="comments">Comments</label>
            <Input type="text" id="comments" name="comments" value={formData.comments} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="mt-2" type="submit">
            Give Feedback
          </Button>
        </div>
      </form>
    </div>
  );
};
export default FeedBackForm;
