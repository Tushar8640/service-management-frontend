import EditServiceForm from "@/components/form/EditServiceForm";
import MainLayout from "@/layouts/MainLayout";
import {useGetSingleServiceQuery} from "@/redux/features/services/serviceApi";
import {useRouter} from "next/router";
import React from "react";

export default function ServiceDetails() {
  const router = useRouter();
  const {id} = router.query;
  const {data, isLoading, isError} = useGetSingleServiceQuery(id);
  console.log(data);
  return isLoading ? (
    <h1 className="text-4xl m-3 font-bold">Loading....</h1>
  ) : (
    <MainLayout>
      <h1>Hello</h1>
      <h1 className="text-dark mt-20">{data?.data?.title}</h1>
    </MainLayout>
  );
}
