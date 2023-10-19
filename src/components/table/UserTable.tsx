/* eslint-disable react-refresh/only-export-components */

import * as React from "react";
// import {CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon} from "@radix-ui/react-icons";
import {ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DataTablePagination} from "./DataTablePagination";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import BookingTableAction from "./BookingTableAction";
import {useGetAllUsersQuery} from "@/redux/features/auth/authApi";
import {IUser} from "@/interfaces/user";
import UserTableAction from "./UserTableAction";
//defining table column
export const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({table}) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({row}) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({column}) => {
      return (
        <Button variant="ghost" className="hover:bg-gray-300 text-gray-200" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          First Name
        </Button>
      );
    },
    cell: ({row}) => (
      <div className="capitalize">
        <span className={`px-3 py-1 rounded-2xl`}>{row.original.name.firstName}</span>
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({column}) => {
      return (
        <Button variant="ghost" className="hover:bg-gray-300 text-gray-200" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Name
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.original.name.lastName}</div>,
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button variant="ghost" className="hover:bg-gray-300 text-gray-200" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({column}) => {
      return (
        <Button variant="ghost" className="hover:bg-gray-300 text-gray-200" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Phone
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("phoneNumber")}</div>,
  },
  {
    accessorKey: "role",
    header: ({column}) => {
      return (
        <Button variant="ghost" className="hover:bg-gray-300 text-gray-200" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("role")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const user = row.original;

      return <UserTableAction id={user?._id} />;
    },
  },
];
//table
const UserTable = () => {
  const {data, isLoading} = useGetAllUsersQuery("");
  console.log(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  //creating table using hook
  const table = useReactTable({
    data: data?.data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  //when data is loading,show loading state
  if (isLoading) {
    return <h1 className="font-semibold text-2xl font-serif text-center">Loading...</h1>;
  }
  return (
    <div className="w-full">
      <div className="flex items-center py-4 px-1">
        <Input placeholder="Filter Users..." value={(table.getColumn("category")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("category")?.setFilterValue(event.target.value)} className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-800 text-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="bg-gray-200 border-b border-gray-300">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};
export default UserTable;
