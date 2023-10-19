import {AiFillDelete, AiFillEdit, AiFillStar} from "react-icons/ai";
import Swal from "sweetalert2";
import {useEffect} from "react";
import Link from "next/link";
import {useDeleteFeedbackMutation, useGetFeedbackQuery} from "@/redux/features/feedback/feedback";
import DashboardLayout from "@/layouts/Admin";
import {IFeedback} from "@/interfaces/feedback";
import {IUser} from "@/interfaces/user";

const FeedBacks = () => {
  const {data, isLoading} = useGetFeedbackQuery(undefined);
  //delete feedback
  const [deleteFeedback, {data: deleteData, isSuccess, isError}] = useDeleteFeedbackMutation();

  const handleDeleteFeedback = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this feedback?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFeedback(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (deleteData?.success && isSuccess) {
      Swal.fire("Great!", "Feedback deleted successfully!", "success");
    } else if (!deleteData?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [deleteData, isError, isSuccess]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1 className="text-4xl font-bold">Loading....</h1>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif my-3 font-semibold">All Feedbacks:</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {data?.data?.map((feedback: IFeedback, i: number) => (
              <div className="bg-white p-4 rounded-lg shadow-lg" key={i}>
                <div className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {(feedback?.user as IUser)?.name.firstName} {(feedback?.user as IUser)?.name.lastName}
                </div>
                <p className="flex items-center justify-center">
                  <AiFillStar className="text-yellow-600" />
                  {feedback.rating}
                </p>
                <p className="text-gray-700 text-center">{feedback.comments}</p>
                <div onClick={() => handleDeleteFeedback(feedback._id)} className="flex justify-end">
                  <AiFillDelete className="text-lg text-red-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FeedBacks;
