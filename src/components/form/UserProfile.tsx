import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {IUserProps} from "@/interfaces/user";
import {useUpdateUserMutation} from "@/redux/features/users/userApi";

const UserProfile = ({user}: IUserProps) => {
  const [updateUser, {data, isError, isSuccess}] = useUpdateUserMutation();

  // Initialize state to hold form input values
  const [formData, setFormData] = useState({
    name: {
      firstName: user?.name.firstName,
      lastName: user?.name.lastName,
    },
    phoneNumber: user?.phoneNumber,
    profile: user?.profile,
    address: user?.address,
  });

  //setting form data for edit
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    if (name === "firstName" || name === "lastName") {
      setFormData({
        ...formData,
        name: {
          ...formData.name,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser({id: user?._id, data: formData});
  };
  //showing success or error message
  const router = useRouter();
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Information updated successfully!`, "success");
    }
  }, [isSuccess, isError, data, router]);

  return (
    <div className="w-10/12 mx-auto mt-4">
      <h1 className="text-3xl font-semibold text-center mb-3 font-serif ">Profile</h1>
      <form onSubmit={handleSubmit} className="px-8 py-8 bg-gray-200 rounded">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="firstName">Firstname</label>
            <Input type="text" id="firstName" name="firstName" value={formData?.name?.firstName} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">LastName</label>
            <Input type="text" id="lastName" name="lastName" value={formData?.name?.lastName} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input type="text" id="phoneNumber" name="phoneNumber" defaultValue={formData?.phoneNumber} onChange={handleInputChange} required className="rounded" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="profile">Profile</label>
            <Input type="text" id="profile" name="profile" value={formData?.profile} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <Input type="text" id="address" name="address" value={formData?.address} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="mt-2" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UserProfile;
