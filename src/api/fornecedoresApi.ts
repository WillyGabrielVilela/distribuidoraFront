// FornecedoresApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/fornecedores';

export interface Fornecedores {
  id: string; // Alterado de number para string
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
}

// Pegar todos os fornecedores
export const getAllFornecedores = async (): Promise<Fornecedores[]> => {
  const response = await axios.get<Fornecedores[]>(API_URL);
  return response.data;
};

// Criar um novo fornecedores
export const createFornecedores = async (fornecedores: Omit<Fornecedores, 'id'>): Promise<Fornecedores> => {
  const response = await axios.post<Fornecedores>(API_URL, fornecedores);
  return response.data;
};

// Editar um fornecedores existente
export const editFornecedores = async (id: string, fornecedores: Fornecedores): Promise<Fornecedores> => {
  const response = await axios.put<Fornecedores>(`${API_URL}/${id}`, fornecedores);
  return response.data;
};

// Excluir um fornecedores existente
export const deleteFornecedores = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
