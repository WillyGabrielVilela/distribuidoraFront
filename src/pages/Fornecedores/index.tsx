import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFornecedores, createFornecedores, editFornecedores, deleteFornecedores, Fornecedores } from '../../api/fornecedoresApi';
import { PageContainer, MainContent, ContentHeader, FormContainer, Table } from './styles';
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
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <FormContainer onSubmit={handleSubmit}>
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
          <button type="submit">
            {editando ? 'Atualizar Fornecedor' : 'Adicionar Fornecedor'}
          </button>
        </FormContainer>

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
            {fornecedores.map((fornecedores) => (
              <tr key={fornecedores.id}>
                <td>{fornecedores.nome}</td>
                <td>{fornecedores.endereco}</td>
                <td>{fornecedores.telefone}</td>
                <td>{fornecedores.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(fornecedores)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(fornecedores.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainContent>
    </PageContainer>
  );
};

export default Fornecedor;
