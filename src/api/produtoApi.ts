import axios from 'axios';

const API_URL = 'http://localhost:8080/api/produtos';

export interface Produto {
  codProduto: number;
  nomeProduto: string;
  fornecedor?: {
    codFornecedor?: number;
    nomeFornecedor?: string;
    cnpj?: string;
    enderecoComercial?: string;
    complementoComercial?: string;
    bairroComercial?: string;
    cidadeComercial?: string;
    ufComercial?: string;
    cepComercial?: string;
    enderecoEntrega?: string;
    complementoEntrega?: string;
    bairroEntrega?: string;
  };
  categoria?: {
    codCategoria?: number;
    nomeCategoria?: string;
  };
  volume?: number;
  embalagem?: {
    codEmbalagem?: number;
    nome?: string;
    qtd?: number;
  };
  codFabrica?: string;
  codigoBarras?: string;
  dtCadastro?: string;
}

// Pegar todos os produtos
export const getAllProdutos = async (): Promise<Produto[]> => {
  const response = await axios.get<Produto[]>(`${API_URL}/listarProdutos`);
  return response.data;
};

// Criar um novo produto
export const createProduto = async (produto: Omit<Produto, 'codProduto'>): Promise<Produto> => {
  const response = await axios.post<Produto>(`${API_URL}/criarProduto`, produto);
  return response.data;
};

export const editProduto = async (codProduto: number, produto: Produto): Promise<Produto> => {
    const response = await axios.put<Produto>(`${API_URL}/${codProduto}`, produto);
    return response.data;
  };
  

// Excluir um produto existente
export const deleteProduto = async (codProduto: number): Promise<void> => {
  await axios.delete(`${API_URL}/${codProduto}`);
};