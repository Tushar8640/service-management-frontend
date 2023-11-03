import Image from "next/image";
import MainLayout from "@/layouts/MainLayout";
import LeftContent from "@/components/feedback/LeftContent";
import Feedbacks from "@/components/feedback/Feedbacks";
import AvailableService from "@/components/services/AvailableService";
import LatestBlog from "@/components/blogs/LatestBlog";
import HeroSection from "@/components/home/HeroSection";

import { useGetFaqsQuery } from "@/redux/features/faq/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IFaq } from "@/interfaces/faq";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Link from "next/link";

export default function Home() {
  const { data, isLoading } = useGetFaqsQuery(undefined);
  return (
    <MainLayout>
      <HeroSection />
      {/* available services */}
      <AvailableService />
      {/* upcoming services */}
      {/* events by category */}
      {/* overview  */}
      {/* //feedback  */}
      {/* latest news  */}
      <LatestBlog />
      <section className=" mx-auto p-6 grid lg:grid-cols-6 gap-4 bg-slate-300 mb-12">
        <LeftContent />
        <Feedbacks />
      </section>
      <div className="my-5 w-[800px] mx-auto">
      <h1 className="text-3xl font-serif my-3 font-semibold text-center mb-4">FAQ</h1>
        {data?.data?.map((faq: IFaq, i: number) => (
          <div className="flex items-center gap-3">
            <Accordion key={i} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
