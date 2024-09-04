import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProdutos, createProduto, editProduto, deleteProduto, Produto } from '../../api/produtoApi';
import { PageContainer, MainContent, ContentHeader, Table, Modal, ModalContent, Overlay } from './styles';
import SidebarComponent from '../../components/Sidebar';

const Produtos: React.FC = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState<Omit<Produto, 'codProduto'>>({
    nomeProduto: '',
    codFornecedor: 0,
    codCategoria: 0,
    volume: 0,
    codEmbalagem: 0,
    codFabrica: '',
    codigoBarras: ''
  });
  const [editando, setEditando] = useState<Produto | null>(null);
  const [modalAberto, setModalAberto] = useState<boolean>(false);

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
        await editProduto(editando.codProduto, { ...novoProduto, codProduto: editando.codProduto });
        setEditando(null);
      } else {
        await createProduto(novoProduto);
      }
      setNovoProduto({
        nomeProduto: '',
        codFornecedor: 0,
        codCategoria: 0,
        volume: 0,
        codEmbalagem: 0,
        codFabrica: '',
        codigoBarras: ''
      });
      carregarProdutos();
      setModalAberto(false);  // Fecha o modal após a ação
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto: Produto) => {
    setNovoProduto({
      nomeProduto: produto.nomeProduto || '',
      codFornecedor: produto.fornecedor?.codFornecedor || 0,
      codCategoria: produto.categoria?.codCategoria || 0,
      volume: produto.volume || 0,
      codEmbalagem: produto.embalagem?.codEmbalagem || 0,
      codFabrica: produto.codFabrica || '',
      codigoBarras: produto.codigoBarras || ''
    });
    setEditando(produto);
    setModalAberto(true);  // Abre o modal ao editar
  };

  const handleDelete = async (codProduto: number) => {
    try {
      await deleteProduto(codProduto);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const formattedValue = type === 'number' ? Number(value) : value;

    setNovoProduto(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Produtos</h1>
          <button onClick={() => setModalAberto(true)}>Adicionar Produto</button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Fornecedor</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.codProduto}>
                <td>{produto.nomeProduto}</td>
                <td>{produto.fornecedor?.nomeFornecedor || 'Não Disponível'}</td>
                <td>{produto.categoria?.nomeCategoria || 'Não Disponível'}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(produto)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(produto.codProduto)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainContent>

      {modalAberto && (
        <Overlay>
          <Modal>
            <ModalContent>
              <h2>{editando ? 'Editar Produto' : 'Adicionar Produto'}</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nomeProduto"
                    value={novoProduto.nomeProduto}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Fornecedor:</label>
                  <input
                    type="number"
                    name="codFornecedor"
                    value={novoProduto.codFornecedor || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Categoria:</label>
                  <input
                    type="number"
                    name="codCategoria"
                    value={novoProduto.codCategoria || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Volume:</label>
                  <input
                    type="number"
                    name="volume"
                    value={novoProduto.volume || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Embalagem:</label>
                  <input
                    type="number"
                    name="codEmbalagem"
                    value={novoProduto.codEmbalagem || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Código da Fábrica:</label>
                  <input
                    type="text"
                    name="codFabrica"
                    value={novoProduto.codFabrica}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Código de Barras:</label>
                  <input
                    type="text"
                    name="codigoBarras"
                    value={novoProduto.codigoBarras}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit">
                  {editando ? 'Atualizar Produto' : 'Adicionar Produto'}
                </button>
                <button type="button" onClick={() => setModalAberto(false)}>Cancelar</button>
              </form>
            </ModalContent>
          </Modal>
        </Overlay>
      )}
    </PageContainer>
  );
};

export default Produtos;
