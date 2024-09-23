import axios from 'axios';

const API_URL = 'http://localhost:8080/api/fornecedores';

// Interface baseada no Fornecedor
export interface Fornecedores {
  nomeFornecedor: string;
  cnpj: string;
  enderecoComercial: string;
  complementoComercial: string;
  bairroComercial: string;
  cidadeComercial: string;
  ufComercial: string;
  cepComercial: string;
  enderecoEntrega: string;
  complementoEntrega: string;
  bairroEntrega: string;
  cidadeEntrega: string;
  ufEntrega: string;
  cepEntrega: string;
  enderecoCobranca: string;
  complementoCobranca: string;
  bairroCobranca: string;
  cidadeCobranca: string;
  ufCobranca: string;
  cepCobranca: string;
  telefone: string;
  email: string;
  planoPagamentoId: number | null;
  clienteId: number | null;
  dtCadastro: string; // Usando string para representar LocalDate
}

// Pegar todos os fornecedores
export const getAllFornecedores = async (): Promise<Fornecedores[]> => {
  const response = await axios.get<Fornecedores[]>(`${API_URL}/listarFornecedores`);
  return response.data;
};

// Criar um novo fornecedor
export const createFornecedores = async (fornecedor: Omit<Fornecedores, 'CodFornecedor'>): Promise<Fornecedores> => {
  const response = await axios.post<Fornecedores>(API_URL, fornecedor);
  return response.data;
};

// Editar um fornecedor existente
export const editFornecedores = async (id: string, fornecedor: Omit<Fornecedores, 'CodFornecedor'>): Promise<Fornecedores> => {
  const response = await axios.put<Fornecedores>(`${API_URL}/${id}`, fornecedor);
  return response.data;
};

// Excluir um fornecedor existente
export const deleteFornecedores = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
