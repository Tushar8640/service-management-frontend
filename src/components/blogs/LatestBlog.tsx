import DashboardLayout from "@/layouts/Admin";
import Link from "next/link";
import {useGetBlogsQuery} from "@/redux/features/blog/blog";
import {IBlog} from "@/interfaces/blog";
import BlogCard from "@/components/card/BlogCard";

const LatestBlog = () => {
  const {data, isLoading} = useGetBlogsQuery(undefined);
  return (
    <section className="p-6">
      <h1 className="text-3xl font-serif my-3 font-semibold text-center mb-4">Our Latest Blogs</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mt-4">
        {data?.data?.map((blog: IBlog, i: number) => (
          <BlogCard blog={blog} key={i} />
        ))}
      </div>
    </section>
  );
};

export default LatestBlog;
