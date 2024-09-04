import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProdutos, createProduto, editProduto, deleteProduto, Produto } from '../../api/produtosApi';
import { PageContainer, MainContent, ContentHeader, FormContainer, Table } from './styles';
import SidebarComponent from '../../components/Sidebar';   

const Estoque: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Omit<Produto, 'id'>>({
    nome: '',
    descricao: '',
    quantidade: 0
  });
  const [editando, setEditando] = useState<Produto | null>(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const produtos = await getAllProdutos();
      setProdutos(produtos);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editando) {
        await editProduto(editando.id, { ...novoProduto, id: editando.id });
        setEditando(null);
      } else {
        await createProduto(novoProduto);
      }
      setNovoProduto({ nome: '', descricao: '', quantidade: 0 });
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto: Produto) => {
    setNovoProduto({
      nome: produto.nome,
      descricao: produto.descricao,
      quantidade: produto.quantidade
    });
    setEditando(produto);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduto(id);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoProduto({
      ...novoProduto,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Produtos</h1>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <FormContainer onSubmit={handleSubmit}>
          <div>
            <label>Nome do Produto:</label>
            <input
              type="text"
              name="nome"
              value={novoProduto.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={novoProduto.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              name="quantidade"
              value={novoProduto.quantidade}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {editando ? 'Atualizar Produto' : 'Adicionar Produto'}
          </button>
        </FormContainer>

        <Table>
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.quantidade}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(produto)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(produto.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainContent>
    </PageContainer>
  );
};

export default Estoque;
