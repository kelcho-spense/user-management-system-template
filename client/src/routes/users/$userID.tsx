
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Users2Icon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Facebook, Twitter, Edit } from 'lucide-react'
import UpdateUserModal from '@/components/UpdateUserModal'
import { TUser } from '@/schemas/userSchema'
import useUsers from '@/hooks/users/useUsers'
import { useState } from 'react'

export const Route = createFileRoute('/users/$userID')({
  parseParams: ({ userID }) => {
    const id = Number(userID)
    if (isNaN(id) || id <= 0) {
      throw new Error('Invalid user ID')
    }
    return { userID: id }
  },
  component: RouteComponent,
})


function RouteComponent() {
  const { userID } = Route.useParams()
  if (!userID) return <div>Invalid user ID</div>
  const { data: user, isError, isFetching } = useUsers(userID)
  // console.log(user)

  if (isFetching) return <div>Loading...</div>
  if (isError) return <div>Error fetching user</div>

  return (
    <div className='grid gap-3 mt-4 place-items-center'>
      <UserDetail {...user} />
      <Link to='/users'>
        <Button variant="link">
          <Users2Icon /> Back Users
        </Button>
      </Link>
    </div>)

}


function UserDetail(user: TUser) {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)

  return (
    <>
      <Card key={user.id} className="w-fit">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Age: {user.age}</p>
          <div className="flex items-center mt-2">
            <Twitter className="w-4 h-4 mr-2" />
            <span className="text-sm">{user.twitter}</span>
          </div>
          <div className="flex items-center mt-2">
            <Facebook className="w-4 h-4 mr-2" />
            <span className="text-sm">{user.facebook}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardFooter>
      </Card>
      {
        selectedUser && (
          <UpdateUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )
      }
    </>
  )
}