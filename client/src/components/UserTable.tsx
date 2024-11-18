import { useMemo, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { TUser } from '@/schemas/userSchema'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'
import UpdateUserModal from './UpdateUserModal'
import useDeleteUser from '../hooks/users/useDeleteUser'
import useUsers from '../hooks/users/useUsers'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from '@tanstack/react-router'

const columnHelper = createColumnHelper<TUser>()

export default function UserTable() {
  const { mutate: deleteUser } = useDeleteUser()
  const { data, isLoading, isError } = useUsers()
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('twitter', {
        header: 'Twitter',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.accessor('facebook', {
        header: 'Facebook',
        cell: info => info.getValue(),
        footer: info => info.column.id,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedUser(row.original)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="default">
             <Link to={`/users/${row.original.id!}`}>
              <Edit className="w-4 h-4 mr-2" />
              View
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => deleteUser(row.original.id!)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        ),
      }),
    ],
    [deleteUser]
  )

  // Create table instance
  const table = useReactTable({
    data: data || [], // Provide a default empty array
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Error fetching users.</div>

  return (
    <div className="p-2">
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </tfoot>
      </Table>
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}
