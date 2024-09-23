import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllFornecedores,
  createFornecedores,
  editFornecedores,
  deleteFornecedores,
  Fornecedores,
} from '../../api/fornecedoresApi';
import {
  PageContainer,
  MainContent,
  ContentHeader,
  Table,
  Overlay,
  Modal,
  ModalContent,
  ButtonGroup,
} from './styles';
import SidebarComponent from '../../components/Sidebar';

const Fornecedor: React.FC = () => {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState<Fornecedores[]>([]);
  const [novoFornecedores, setNovoFornecedores] = useState<Omit<Fornecedores, 'dtCadastro' | 'CodFornecedor'>>({
    nomeFornecedor: '',
    cnpj: '',
    enderecoComercial: '',
    complementoComercial: '',
    bairroComercial: '',
    cidadeComercial: '',
    ufComercial: '',
    cepComercial: '',
    enderecoEntrega: '',
    complementoEntrega: '',
    bairroEntrega: '',
    cidadeEntrega: '',
    ufEntrega: '',
    cepEntrega: '',
    enderecoCobranca: '',
    complementoCobranca: '',
    bairroCobranca: '',
    cidadeCobranca: '',
    ufCobranca: '',
    cepCobranca: '',
    telefone: '',
    email: '',
    planoPagamentoId: null,
    clienteId: null,
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
      console.error('Erro ao carregar fornecedores:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editando) {
        await editFornecedores(editando.cnpj, novoFornecedores);
        setEditando(null);
      } else {
        await createFornecedores(novoFornecedores);
      }
      resetForm();
      setIsModalOpen(false);
      carregarFornecedores();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  const resetForm = () => {
    setNovoFornecedores({
      nomeFornecedor: '',
      cnpj: '',
      enderecoComercial: '',
      complementoComercial: '',
      bairroComercial: '',
      cidadeComercial: '',
      ufComercial: '',
      cepComercial: '',
      enderecoEntrega: '',
      complementoEntrega: '',
      bairroEntrega: '',
      cidadeEntrega: '',
      ufEntrega: '',
      cepEntrega: '',
      enderecoCobranca: '',
      complementoCobranca: '',
      bairroCobranca: '',
      cidadeCobranca: '',
      ufCobranca: '',
      cepCobranca: '',
      telefone: '',
      email: '',
      planoPagamentoId: null,
      clienteId: null,
    });
  };

  const handleEdit = (fornecedor: Fornecedores) => {
    setNovoFornecedores({
      nomeFornecedor: fornecedor.nomeFornecedor,
      cnpj: fornecedor.cnpj,
      enderecoComercial: fornecedor.enderecoComercial,
      complementoComercial: fornecedor.complementoComercial,
      bairroComercial: fornecedor.bairroComercial,
      cidadeComercial: fornecedor.cidadeComercial,
      ufComercial: fornecedor.ufComercial,
      cepComercial: fornecedor.cepComercial,
      enderecoEntrega: fornecedor.enderecoEntrega,
      complementoEntrega: fornecedor.complementoEntrega,
      bairroEntrega: fornecedor.bairroEntrega,
      cidadeEntrega: fornecedor.cidadeEntrega,
      ufEntrega: fornecedor.ufEntrega,
      cepEntrega: fornecedor.cepEntrega,
      enderecoCobranca: fornecedor.enderecoCobranca,
      complementoCobranca: fornecedor.complementoCobranca,
      bairroCobranca: fornecedor.bairroCobranca,
      cidadeCobranca: fornecedor.cidadeCobranca,
      ufCobranca: fornecedor.ufCobranca,
      cepCobranca: fornecedor.cepCobranca,
      telefone: fornecedor.telefone,
      email: fornecedor.email,
      planoPagamentoId: fornecedor.planoPagamentoId,
      clienteId: fornecedor.clienteId,
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
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Fornecedores</h1>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Adicionar Fornecedor
          </button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Endereço Comercial</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.cnpj}>
                <td>{fornecedor.nomeFornecedor}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.enderecoComercial}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(fornecedor)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(fornecedor.cnpj)}>Excluir</button>
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
                      name="nomeFornecedor"
                      value={novoFornecedores.nomeFornecedor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>CNPJ:</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={novoFornecedores.cnpj}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Endereço Comercial:</label>
                    <input
                      type="text"
                      name="enderecoComercial"
                      value={novoFornecedores.enderecoComercial}
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
