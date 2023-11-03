import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlogProps } from "@/interfaces/blog";
import Link from "next/link";
import Moment from "react-moment";

const BlogHomeCard = ({ blog }: IBlogProps) => {
  console.log(blog);
  return (
    <Card>
      <Link href={`/blogs/${blog?._id}`}>
        <CardHeader>
          <img src={blog?.image} alt="card-img" className="mx-auto" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl">{blog.title}</CardTitle>
          <CardDescription>{blog.description.slice(0, 50)}</CardDescription>
        </CardContent>
        <CardFooter className="mt-auto">
          <Moment format="DD-MM-YYYY">{blog?.createdAt}</Moment>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogHomeCard;
