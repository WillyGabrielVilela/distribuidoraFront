// produtoApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/produtos';

export interface Produto {
  id: string; // ID como string
  nome: string;
  descricao: string;
  quantidade: number;
}

// Pegar todos os produtos
export const getAllProdutos = async (): Promise<Produto[]> => {
  const response = await axios.get<Produto[]>(API_URL);
  return response.data;
};

// Criar um novo produto
export const createProduto = async (produto: Omit<Produto, 'id'>): Promise<Produto> => {
  const response = await axios.post<Produto>(API_URL, produto);
  return response.data;
};

// Editar um produto existente
export const editProduto = async (id: string, produto: Produto): Promise<Produto> => {
  const response = await axios.put<Produto>(`${API_URL}/${id}`, produto);
  return response.data;
};

// Excluir um produto existente
export const deleteProduto = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
