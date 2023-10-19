import {useEffect} from "react";
import Swal from "sweetalert2";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "../ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {useDeleteUserMutation, useMakeAdminMutation} from "@/redux/features/users/userApi";
import {useGetSingleUserQuery} from "@/redux/features/auth/authApi";
import {useAppSelector} from "@/redux/hooks";

//
export type TableProps = {
  id: string;
};
const UserTableAction = ({id}: TableProps) => {
  const {data} = useGetSingleUserQuery(id);
  const {user} = useAppSelector((state) => state.auth);
  //delete service
  const [deleteUser, {data: deleteData, isSuccess, isError}] = useDeleteUserMutation();
  const handleDeleteService = (id: string) => {
    Swal.fire({
      title: "Do you want to delete this user?",
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
        deleteUser(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (deleteData?.success && isSuccess) {
      Swal.fire("Great!", "User deleted successfully!", "success");
    } else if (!deleteData?.success && isError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [deleteData, isError, isSuccess]);
  //make admin
  const [makeAdmin, {data: updateData, isSuccess: updateSuccess, isError: updateError}] = useMakeAdminMutation();
  const handleMakeAdmin = (email: string) => {
    Swal.fire({
      title: "Do you want to make this user admin?",
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
        makeAdmin(email);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  //showing success or error message on update
  useEffect(() => {
    if (updateData?.success && updateSuccess) {
      Swal.fire("Great!", "Make admin successfully!", "success");
    } else if (!updateData?.success && updateError) {
      Swal.fire("Oops!", `Something went wrong`, "error");
    }
  }, [updateData, updateError, updateSuccess]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href={`/dashboard/users/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDeleteService(id)}>Delete</DropdownMenuItem>
        {data?.data?.role === "user" && user.role === "super admin" ? <DropdownMenuItem onClick={() => handleMakeAdmin(data?.data?.email)}>Make Admin</DropdownMenuItem> : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserTableAction;
