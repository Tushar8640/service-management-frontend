import ServiceDetailsCard from "@/components/card/ServiceDetailsCard";
import EditServiceForm from "@/components/form/EditServiceForm";
import MainLayout from "@/layouts/MainLayout";
import { useGetSingleServiceQuery } from "@/redux/features/services/serviceApi";
import { useRouter } from "next/router";
import React from "react";

export default function ServiceDetails() {
  const router = useRouter();

  return (
    <MainLayout>
      <h1>Hello</h1>
      <ServiceDetailsCard />
    </MainLayout>
  );
}
