import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateUser from '../hooks/users/useUpdateUser';
import userSchema, { TUser } from '@/schemas/userSchema';

type UpdateUserModalProps = {
  user: TUser;
  onClose: () => void;
};

const FieldInfo = ({ error }: { error?: string }) => {
  return error ? <p className="text-red-500 text-sm">{error}</p> : null;
};

export default function UpdateUserModal({ user, onClose }: UpdateUserModalProps) {
  const { mutate: updateUser } = useUpdateUser();

  const form = useForm<TUser>({
    defaultValues: {
      name: user.name,
      age: user.age,
      twitter: user.twitter,
      facebook: user.facebook,
    },
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
      <DialogTitle>Update User</DialogTitle>
      <DialogDescription>Update user information below.</DialogDescription>
        <form
          onSubmit={form.handleSubmit((data) => {
            updateUser({ id: user.id, ...data });
            onClose();
          })}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name">Name</label>
            <Input id="name" {...form.register('name')} />
            <FieldInfo error={form.formState.errors.name?.message} />
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <Input type="number" id="age" {...form.register('age', { valueAsNumber: true })} />
            <FieldInfo error={form.formState.errors.age?.message} />
          </div>

          <div>
            <label htmlFor="twitter">Twitter</label>
            <Input id="twitter" {...form.register('twitter')} />
            <FieldInfo error={form.formState.errors?.twitter?.message} />
          </div>

          <div>
            <label htmlFor="facebook">Facebook</label>
            <Input id="facebook" {...form.register('facebook')} />
            <FieldInfo error={form.formState.errors.facebook?.message} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}