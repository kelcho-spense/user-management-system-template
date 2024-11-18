// src/components/AddUser.tsx
import useAddUser from '../hooks/users/useAddUser';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import userSchema, { TUser } from '@/schemas/userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const AddUser = () => {
  const { mutate: addUser } = useAddUser();

  const FieldInfo = ({ error }: { error?: string }) => {
    return error ? <p className="text-red-500 text-sm">{error}</p> : null;
  };

  const form = useForm<TUser>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });


  return (
    <form className="p-4 bg-gray-100 rounded-md shadow-sm"
      onSubmit={form.handleSubmit((data) => {
        addUser(data);
        form.reset();
      })}
    >
      <div className="mb-4">
        <Label>Name</Label>
        <Input id="name" type='text' {...form.register('name')} />
        <FieldInfo error={form.formState.errors.name?.message} />
      </div>
      <div className="mb-4">
        <Label>Age</Label>
        <Input id="age" type='number' {...form.register('age', { valueAsNumber: true })} />
        <FieldInfo error={form.formState.errors.age?.message} />
      </div>
      <div className="mb-4">
        <Label>Twitter</Label>
        <Input id="twitter" type='text' {...form.register('twitter')} />
        <FieldInfo error={form.formState.errors.twitter?.message} />
      </div>
      <div className="mb-4">
        <Label>Facebook</Label>
        <Input id="facebook" type='text' {...form.register('facebook')} />
        <FieldInfo error={form.formState.errors.facebook?.message} />
      </div>
      <Button type="submit"
        disabled={!form.formState.isValid || form.formState.isSubmitting}
      > {form.formState.isSubmitting ? 'Submitting' : "Add User"}</Button>
    </form>
  );
};

export default AddUser;
