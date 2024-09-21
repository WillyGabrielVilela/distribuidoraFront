// pedidoApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pedidos';

export interface Pedido {
  id: string; // ID como string
  clienteId: string;
  dataPedido: string; // Data em formato ISO (ex: '2024-09-21')
  status: string;
  itens: ItemPedido[];
}

export interface ItemPedido {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

// Pegar todos os pedidos
export const getAllPedidos = async (): Promise<Pedido[]> => {
  const response = await axios.get<Pedido[]>(API_URL);
  return response.data;
};

// Criar um novo pedido
export const createPedido = async (pedido: Omit<Pedido, 'id'>): Promise<Pedido> => {
  const response = await axios.post<Pedido>(API_URL, pedido);
  return response.data;
};

// Editar um pedido existente
export const editPedido = async (id: string, pedido: Pedido): Promise<Pedido> => {
  const response = await axios.put<Pedido>(`${API_URL}/${id}`, pedido);
  return response.data;
};

// Excluir um pedido existente
export const deletePedido = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
