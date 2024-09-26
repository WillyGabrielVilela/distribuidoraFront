import axios from 'axios';

const API_URL = 'http://localhost:8080/api/estoques';

export interface Estoque {
    produtoId: number;  // Código do produto
  qtEstoqueGerencial: number;  // Quantidade em estoque
  qtTransito: number;          // Quantidade em trânsito
  qtDisponivel: number;        // Quantidade disponível
  qtReservada: number;         // Quantidade reservada
  dtValidade: string;          // Data de validade
  dtUltEntrada: string;        // Data da última entrada
  giroProduto: number;         // Giro do produto
}

// Listar todos os estoques
export const getAllEstoques = async (): Promise<Estoque[]> => {
  const response = await axios.get<Estoque[]>(`${API_URL}/listarEstoques`);
  return response.data;
};

// Criar um novo estoque
export const createEstoque = async (estoque: Omit<Estoque, 'id'>): Promise<Estoque> => {
  const response = await axios.post<Estoque>(`${API_URL}/criarEstoque`, estoque);
  return response.data;
};

// Editar um estoque existente
export const editEstoque = async (id: string, estoque: Omit<Estoque, 'id'>): Promise<Estoque> => {
  const response = await axios.put<Estoque>(`${API_URL}/${id}`, estoque);
  return response.data;
};

// Excluir um estoque existente
export const deleteEstoque = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
