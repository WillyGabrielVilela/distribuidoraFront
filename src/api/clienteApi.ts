import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes';

export interface Cliente {
  codCliente: string;
  nomeCliente: string;
  cgcEnt: string;
  ramoAtividade: string;
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
  contatoCargo1: string;
  contatoNome1: string;
  contatoCpf1: string;
  contatoCargo2: string;
  contatoNome2: string;
  contatoCpf2: string;
  contatoCargo3: string;
  contatoNome3: string;
  contatoCpf3: string;
  prazoPagamento: number; // Altere para Long se for necessário um tipo específico
  dtCadastro: string; // Altere para LocalDate se houver suporte
}

// Listar todos os clientes
export const getAllClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get<Cliente[]>(`${API_URL}/listarClientes`);
  return response.data;
};

// Criar um novo cliente
export const createCliente = async (cliente: Omit<Cliente, 'dtCadastro'>): Promise<Cliente> => {
  const response = await axios.post<Cliente>(`${API_URL}/criarCliente`, cliente);
  return response.data;
};

// Editar um cliente existente
export const editCliente = async (codCliente: string, cliente: Omit<Cliente, 'dtCadastro'>): Promise<Cliente> => {
  const response = await axios.put<Cliente>(`${API_URL}/${codCliente}`, cliente);
  return response.data;
};

// Excluir um cliente existente
export const deleteCliente = async (codCliente: string): Promise<void> => {
  await axios.delete(`${API_URL}/${codCliente}`);
};
