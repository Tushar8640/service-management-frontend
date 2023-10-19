import DashboardLayout from "@/layouts/Admin";
import Link from "next/link";
import {useGetBlogsQuery} from "@/redux/features/blog/blog";
import {IBlog} from "@/interfaces/blog";
import BlogCard from "@/components/card/BlogCard";

const Blogs = () => {
  const {data, isLoading} = useGetBlogsQuery(undefined);
  console.log(data?.data);
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1 className="text-4xl font-bold">Loading....</h1>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif my-3 font-semibold">All Blogs:</h1>
            <Link href={`/dashboard/blogs/addblog`} className="bg-primary text-secondary py-1.5 px-3 rounded">
              Add New
            </Link>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-4">
            {data?.data?.map((blog: IBlog, i: number) => (
              <BlogCard blog={blog} key={i} />
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Blogs;
