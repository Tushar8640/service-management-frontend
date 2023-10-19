import {IFeedback} from "@/interfaces/feedback";
import {IUser} from "@/interfaces/user";
import {useGetFeedbackQuery} from "@/redux/features/feedback/feedback";
import {AiFillStar} from "react-icons/ai";
const Feedbacks = () => {
  const {data, isLoading} = useGetFeedbackQuery(undefined);

  return (
    <div className="col-span-4">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
