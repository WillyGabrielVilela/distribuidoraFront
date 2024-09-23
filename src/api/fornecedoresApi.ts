import axios from 'axios';

const API_URL = 'http://localhost:8080/api/fornecedores';

// Interface baseada no Fornecedor
export interface Fornecedor {
  codFornecedor: string; // Adicionei esta propriedade, pois é necessário para operações de edição e exclusão.
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
export const getAllFornecedores = async (): Promise<Fornecedor[]> => {
  const response = await axios.get<Fornecedor[]>(`${API_URL}/listarFornecedores`);
  return response.data;
};

// Criar um novo fornecedor
export const createFornecedores = async (fornecedor: Omit<Fornecedor, 'codFornecedor'>): Promise<Fornecedor> => {
  const response = await axios.post<Fornecedor>(`${API_URL}/criarFornecedor`, fornecedor);
  return response.data;
};

// Editar um fornecedor existente
export const editFornecedores = async (codFornecedor: string, fornecedor: Omit<Fornecedor, 'codFornecedor'>): Promise<Fornecedor> => {
  const response = await axios.put<Fornecedor>(`${API_URL}/${codFornecedor}`, fornecedor);
  return response.data;
};

// Excluir um fornecedor existente
export const deleteFornecedores = async (codFornecedor: string): Promise<void> => {
  await axios.delete(`${API_URL}/${codFornecedor}`);
};
