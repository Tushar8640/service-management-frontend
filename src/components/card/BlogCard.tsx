import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {IBlogProps} from "@/interfaces/blog";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import Swal from "sweetalert2";
import {useEffect} from "react";
import {useDeleteBlogMutation} from "@/redux/features/blog/blog";
import Link from "next/link";
import Image from "next/image";
import blogImg from "../../assets/blog.png";
const BlogCard = ({blog}: IBlogProps) => {
  //delete faq
  const [deleteBlog, {data: deleteData, isSuccess, isError}] = useDeleteBlogMutation();

  const handleDeleteBlog = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this Blog?",
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
        deleteBlog(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (deleteData?.success && isSuccess) {
      Swal.fire("Great!", "Blog deleted successfully!", "success");
    } else if (!deleteData?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [deleteData, isError, isSuccess]);
  return (
    <Card>
      <CardHeader>
        <img src={"blogImg"} alt="card-img" className="mx-auto" />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl">{blog.title}</CardTitle>
        <CardDescription>{blog.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div onClick={() => handleDeleteBlog(blog._id)} className="mr-3">
          <AiFillDelete className="text-lg text-red-500 cursor-pointer" title="Delete" />
        </div>
        <Link href={`/dashboard/blogs/editblog/${blog._id}`}>
          <div>
            <AiFillEdit className="text-lg" title="Edit" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
