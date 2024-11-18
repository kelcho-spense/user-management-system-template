// src/hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../services/apiClient';

export const deleteUser = async (userId: string) => {
  await apiClient.delete(`/users/${userId}`);
  return userId;
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export default useDeleteUser;

