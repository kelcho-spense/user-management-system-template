// src/hooks/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../services/apiClient';
import { TUser } from '@/schemas/userSchema';

export const updateUser = async (user: TUser) => {
  const response = await apiClient.put(`/users/${user.id}`, user);
  return response.data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export default useUpdateUser;