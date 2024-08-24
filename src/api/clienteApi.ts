import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes';

export interface Cliente {
  id: number;
  nome: string;
  // Outros campos...
}

export const getAllClientes = async (): Promise<Cliente[]> => {
  const response = await axios.get<Cliente[]>(API_URL);
  return response.data;
};

export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
  const response = await axios.post<Cliente>(API_URL, cliente);
  return response.data;
};

// Outros métodos (update, delete, etc.)
