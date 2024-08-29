import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes/listarClientes';

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
  planoPagamento: {
    codPlanoPag: string;
    descricao: string;
  };
  dtCadastro: string;
}

// Pegar todos os clientes
export const getAllClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get<Cliente[]>(API_URL);
  return response.data;
};

// Criar um novo cliente
export const createCliente = async (cliente: Omit<Cliente, 'codCliente'>): Promise<Cliente> => {
  const response = await axios.post<Cliente>(API_URL, cliente);
  return response.data;
};

// Editar um cliente existente
export const editCliente = async (codCliente: string, cliente: Cliente): Promise<Cliente> => {
  const response = await axios.put<Cliente>(`${API_URL}/${codCliente}`, cliente);
  return response.data;
};

// Excluir um cliente existente
export const deleteCliente = async (codCliente: string): Promise<void> => {
  await axios.delete(`${API_URL}/${codCliente}`);
};
