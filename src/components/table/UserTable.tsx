import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUserProps } from "@/interfaces/user";

const UserTable = ({ users }: IUserProps) => {
  return (
    <Table className="border">
      <TableHeader className="bg-gray-800 text-gray-100">
        <TableRow>
          <TableHead className="text-gray-100">First Name</TableHead>
          <TableHead className="text-gray-100 text-center">Last Name</TableHead>
          <TableHead className="text-gray-100 text-center">Role</TableHead>
          <TableHead className="text-gray-100 text-center">Email</TableHead>

          <TableHead className="text-right text-gray-100">Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user._id} className="bg-gray-100">
            <TableCell className="font-medium">{user.name.firstName}</TableCell>
            <TableCell className="text-center">{user.name.lastName}</TableCell>
            <TableCell className="text-center">{user.role}</TableCell>
            <TableCell className="text-center">{user.email}</TableCell>
            <TableCell className="text-right">{user.phoneNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default UserTable;
