// clienteApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes';

export interface Cliente {
  id: string; // Alterado de number para string
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
}

// Pegar todos os clientes
export const getAllClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get<Cliente[]>(API_URL);
  return response.data;
};

// Criar um novo cliente
export const createCliente = async (cliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
  const response = await axios.post<Cliente>(API_URL, cliente);
  return response.data;
};

// Editar um cliente existente
export const editCliente = async (id: string, cliente: Cliente): Promise<Cliente> => {
  const response = await axios.put<Cliente>(`${API_URL}/${id}`, cliente);
  return response.data;
};

// Excluir um cliente existente
export const deleteCliente = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
