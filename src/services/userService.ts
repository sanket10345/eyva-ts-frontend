import apiClient from './axiosService';

interface User {
  id: number;
  name: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: string[];
}

const getUsers = async (page: number, limit: number): Promise<{ items: User[]; count: number }> => {
  const response = await apiClient.get<{ items: User[]; count: number }>(`/api/members?page=${page}&limit=${limit}`);
  return response.data;
};

const createUser = async (user: User): Promise<User> => {
  const response = await apiClient.post<User>('/api/members', user);
  return response.data;
};

const updateUser = async (user: User): Promise<User> => {
  const response = await apiClient.put<User>(`/api/members/${user.id}`, user);
  return response.data;
};

const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/api/members/${userId}`);
};

export { getUsers, createUser, updateUser, deleteUser };