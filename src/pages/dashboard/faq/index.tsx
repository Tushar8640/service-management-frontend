import DashboardLayout from "@/layouts/Admin";
import {useDeleteFaqMutation, useGetFaqsQuery} from "@/redux/features/faq/faq";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {IFaq} from "@/interfaces/faq";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import Swal from "sweetalert2";
import {useEffect} from "react";
import Link from "next/link";

const FAQS = () => {
  const {data, isLoading} = useGetFaqsQuery(undefined);
  //delete faq
  const [deleteFaq, {data: deleteData, isSuccess, isError}] = useDeleteFaqMutation();

  const handleDeleteFAQ = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this FAQ?",
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
        deleteFaq(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (deleteData?.success && isSuccess) {
      Swal.fire("Great!", "FAQ deleted successfully!", "success");
    } else if (!deleteData?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [deleteData, isError, isSuccess]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <h1 className="text-4xl font-bold">Loading....</h1>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif my-3 font-semibold">All FAQs:</h1>
            <Link href={`/dashboard/faq/addFaq`} className="bg-primary text-secondary py-1.5 px-3 rounded">
              Add New
            </Link>
          </div>
          {data?.data?.map((faq: IFaq, i: number) => (
            <div className="flex items-center gap-3">
              <div onClick={() => handleDeleteFAQ(faq._id)}>
                <AiFillDelete className="text-lg text-red-500 cursor-pointer" />
              </div>
              <Link href={`/dashboard/faq/editFaq/${faq._id}`}>
                <div>
                  <AiFillEdit className="text-lg" />
                </div>
              </Link>
              <Accordion key={i} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default FAQS;
