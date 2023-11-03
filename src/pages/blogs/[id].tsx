import MainLayout from "@/layouts/MainLayout";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blog";
import { useRouter } from "next/router";
import Moment from "react-moment";

export default function details() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetSingleBlogQuery(id);
  console.log(data);
  return (
    <MainLayout>
      <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800">
        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
          <img
            src={data?.data?.image}
            alt=""
            className="w-full h-60 sm:h-96 bg-gray-500"
          />

          <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50">
            <Moment format="DD-MM-YYYY">{data?.data?.createdAt}</Moment>

            <div className="space-y-2">
              <p className="inline-block text-2xl font-semibold sm:text-3xl">
                {data?.data?.title}
              </p>
            </div>
            <div className="text-gray-800">
              <p>{data?.data?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
