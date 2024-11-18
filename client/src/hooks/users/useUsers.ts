// src/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/apiClient';

export const getUsers = async (id?: number) => {
  if (id) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }
  const response = await apiClient.get('/users');
  return response.data;
};

const useUsers = (id?: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUsers(id)
  });
};

export default useUsers;
