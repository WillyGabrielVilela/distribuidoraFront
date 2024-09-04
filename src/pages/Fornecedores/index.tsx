import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFornecedores, createFornecedores, editFornecedores, deleteFornecedores, Fornecedores } from '../../api/fornecedoresApi';
import { PageContainer, MainContent, ContentHeader, Table, Overlay, Modal, ModalContent, ButtonGroup } from './styles';
import SidebarComponent from '../../components/Sidebar';

const Fornecedor: React.FC = () => {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState<Fornecedores[]>([]);
  const [novoFornecedores, setNovoFornecedores] = useState<Omit<Fornecedores, 'id'>>({
    nome: '',
    endereco: '',
    telefone: '',
    email: ''
  });
  const [editando, setEditando] = useState<Fornecedores | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = async () => {
    try {
      const fornecedores = await getAllFornecedores();
      setFornecedores(fornecedores);
    } catch (error) {
      console.error('Erro ao carregar Fornecedores:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editando) {
        await editFornecedores(editando.id, { ...novoFornecedores, id: editando.id });
        setEditando(null);
      } else {
        await createFornecedores(novoFornecedores);
      }
      setNovoFornecedores({ nome: '', endereco: '', telefone: '', email: '' });
      setIsModalOpen(false);
      carregarFornecedores();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  const handleEdit = (fornecedor: Fornecedores) => {
    setNovoFornecedores({
      nome: fornecedor.nome,
      endereco: fornecedor.endereco,
      telefone: fornecedor.telefone,
      email: fornecedor.email
    });
    setEditando(fornecedor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFornecedores(id);
      carregarFornecedores();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoFornecedores({
      ...novoFornecedores,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Fornecedores</h1>
        <button onClick={() => { setNovoFornecedores({ nome: '', endereco: '', telefone: '', email: '' }); setIsModalOpen(true); }}>
          Adicionar Fornecedor
        </button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>


        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(fornecedor)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(fornecedor.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {isModalOpen && (
          <Overlay>
            <Modal>
              <ModalContent>
                <h2>{editando ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Nome:</label>
                    <input
                      type="text"
                      name="nome"
                      value={novoFornecedores.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Endereço:</label>
                    <input
                      type="text"
                      name="endereco"
                      value={novoFornecedores.endereco}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Telefone:</label>
                    <input
                      type="text"
                      name="telefone"
                      value={novoFornecedores.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={novoFornecedores.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <ButtonGroup>
                    <button type="submit">
                      {editando ? 'Atualizar Fornecedor' : 'Adicionar Fornecedor'}
                    </button>
                    <button type="button" className="cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  </ButtonGroup>
                </form>
              </ModalContent>
            </Modal>
          </Overlay>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Fornecedor;
