import api from '../config/axios';
import { User, CreateUserRequest } from '../types/user';

// User management
export async function getAllUsers(): Promise<User[]> {
  const response = await api.get('/users');
  return response.data;
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  const response = await api.post('/users', data);
  return response.data;
}

// Authentication
interface LoginResponse {
  user_id: number;
  username: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

// Protected data
export interface SecretData {
  message: string;
  secret: string;
  user: {
    user_id: number;
    username: string;
  };
  note: string;
}

export async function getSecretData(): Promise<SecretData> {
  const response = await api.get('/auth/secret');
  return response.data;
}
