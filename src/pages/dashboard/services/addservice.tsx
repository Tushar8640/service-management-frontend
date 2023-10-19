import AddServiceForm from "@/components/form/AddServiceForm";
import DashboardLayout from "@/layouts/Admin";

export default function addproduct() {
  return (
    <DashboardLayout>
      <div>Add New services</div>
      <AddServiceForm />
    </DashboardLayout>
  );
}
