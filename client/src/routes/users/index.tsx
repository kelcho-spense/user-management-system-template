import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import AddUser from '@/components/AddUser'
import UserTable from '@/components/UserTable'

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">User Management</h1>
      <AddUser />
      <div className="mt-8">
        <UserTable />
      </div>
    </div>
  )
}
