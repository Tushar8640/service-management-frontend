import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlogProps } from "@/interfaces/blog";
import Link from "next/link";

const BlogHomeCard = ({ blog }: IBlogProps) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`/blogs/${blog?._id}`}>
          <img src={blog?.image} alt="card-img" className="mx-auto" />
        </Link>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl">{blog.title}</CardTitle>
        <CardDescription>{blog.description.slice(0, 50)}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default BlogHomeCard;
