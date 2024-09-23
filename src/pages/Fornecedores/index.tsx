import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllFornecedores,
  createFornecedores,
  editFornecedores,
  deleteFornecedores,
  Fornecedor,
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

const Fornecedores: React.FC = () => {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [novoFornecedor, setNovoFornecedor] = useState<Omit<Fornecedor, 'codFornecedor' | 'dtCadastro'>>({
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
  const [editando, setEditando] = useState<Fornecedor | null>(null);
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
      const fornecedorData: Omit<Fornecedor, 'codFornecedor'> = {
        ...novoFornecedor,
        dtCadastro: new Date().toISOString(), // ou um valor padrão que você deseja usar
      };
  
      if (editando) {
        await editFornecedores(editando.codFornecedor, fornecedorData);
        setEditando(null);
      } else {
        await createFornecedores(fornecedorData);
      }
      resetForm();
      setIsModalOpen(false);
      carregarFornecedores();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };
  

  const resetForm = () => {
    setNovoFornecedor({
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
      planoPagamentoId: 1,
      clienteId: 1,
    });
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    setNovoFornecedor({
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
      planoPagamentoId: 1,
      clienteId: 1,
    });
    setEditando(fornecedor);
    setIsModalOpen(true);
  };

  const handleDelete = async (codFornecedor: string) => {
    try {
      await deleteFornecedores(codFornecedor);
      carregarFornecedores();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoFornecedor({
      ...novoFornecedor,
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
              <tr key={fornecedor.codFornecedor}>
                <td>{fornecedor.nomeFornecedor}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.enderecoComercial}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(fornecedor)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(fornecedor.codFornecedor)}>Excluir</button>
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
                      value={novoFornecedor.nomeFornecedor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>CNPJ:</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={novoFornecedor.cnpj}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Endereço Comercial:</label>
                    <input
                      type="text"
                      name="enderecoComercial"
                      value={novoFornecedor.enderecoComercial}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Telefone:</label>
                    <input
                      type="text"
                      name="telefone"
                      value={novoFornecedor.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={novoFornecedor.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <ButtonGroup>
                    <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
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

export default Fornecedores;
