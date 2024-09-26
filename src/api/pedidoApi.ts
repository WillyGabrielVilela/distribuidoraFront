import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pedidos';

export interface Pedido {
  id: string;
  clienteId: string;
  produtoId: string;
  quantidade: number;
  dataEntrega: string;
}

// Pegar todos os pedidos
export const getAllPedidos = async (): Promise<Pedido[]> => {
  const response = await axios.get<Pedido[]>(`${API_URL}/listarPedidos`);
  return response.data;
};

// Buscar pedido por ID
export const getPedidoById = async (id: string): Promise<Pedido> => {
  const response = await axios.get<Pedido>(`${API_URL}/${id}`);
  return response.data;
};

// Criar um novo pedido
export const createPedido = async (pedido: Omit<Pedido, 'id'>): Promise<string> => {
  const response = await axios.post<string>(`${API_URL}/criarPedido`, pedido);
  return response.data; // A API retorna uma mensagem com o ID do pedido
};

// Editar um pedido existente
export const editPedido = async (id: string, pedido: Omit<Pedido, 'id'>): Promise<string> => {
  const response = await axios.put<string>(`${API_URL}/${id}`, pedido);
  return response.data; // A API retorna uma mensagem de sucesso
};

// Excluir um pedido existente
export const deletePedido = async (id: string): Promise<string> => {
  const response = await axios.delete<string>(`${API_URL}/${id}`);
  return response.data; // A API retorna uma mensagem de sucesso
};
