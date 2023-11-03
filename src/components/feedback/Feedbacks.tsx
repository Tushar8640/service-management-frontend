import { IFeedback } from "@/interfaces/feedback";
import { IUser } from "@/interfaces/user";
import { useGetFeedbackQuery } from "@/redux/features/feedback/feedback";
import { AiFillStar } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const Feedbacks = () => {
  const { data, isLoading } = useGetFeedbackQuery(undefined);
  console.log(data);

  return (
    <div className="col-span-4">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className=""
        >
          {data?.data?.map((feedback: IFeedback, i: number) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {/* <div className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {(feedback?.user as IUser)?.name.firstName}{" "}
                  {(feedback?.user as IUser)?.name.lastName}
                </div> */}
                <p className="flex items-center justify-center">
                  <AiFillStar className="text-yellow-600" />
                  {feedback.rating}
                </p>
                <p className="text-gray-700 text-center">{feedback.comments}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Feedbacks;
