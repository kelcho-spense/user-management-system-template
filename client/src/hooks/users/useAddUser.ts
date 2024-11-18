// src/hooks/useAddUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../services/apiClient';
import { TUser } from '@/schemas/userSchema';

export const addUser = async (user: TUser) => {
  const response = await apiClient.post('/users', user);
  return response.data;
};

const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export default useAddUser;
