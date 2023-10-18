import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/Admin";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function index() {
  const dispatch = useAppDispatch();
  return (
    <DashboardLayout>
      <div>
        <h1 className="my-4 text-4xl font-bold">Dashboard</h1>
        <Button onClick={() => dispatch(userLoggedOut())}>Logout</Button>
      </div>
    </DashboardLayout>
  );
}
