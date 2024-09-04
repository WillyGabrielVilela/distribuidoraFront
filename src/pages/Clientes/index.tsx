import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClientes, createCliente, editCliente, deleteCliente, Cliente } from '../../api/clienteApi';
import { PageContainer, MainContent, ContentHeader, Table, Modal, ModalContent, Overlay, ButtonGroup } from './styles';
import SidebarComponent from '../../components/Sidebar';

const Clientes: React.FC = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoCliente, setNovoCliente] = useState<Omit<Cliente, 'codCliente'>>({
    nomeCliente: '',
    enderecoComercial: '',
    telefone: '',
    email: '',
    cgcEnt: '',
    ramoAtividade: '',
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
    planoPagamento: {
      codPlanoPag: '',
      descricao: ''
    },
    dtCadastro: ''
  });
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const clientes = await getAllClientes();
      setClientes(clientes);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editando) {
        await editCliente(editando.codCliente, { ...novoCliente, codCliente: editando.codCliente });
        setEditando(null);
      } else {
        await createCliente(novoCliente);
      }
      setNovoCliente({
        nomeCliente: '',
        enderecoComercial: '',
        telefone: '',
        email: '',
        cgcEnt: '',
        ramoAtividade: '',
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
        planoPagamento: {
          codPlanoPag: '',
          descricao: ''
        },
        dtCadastro: ''
      });
      setShowModal(false);
      carregarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setNovoCliente({
      nomeCliente: cliente.nomeCliente,
      enderecoComercial: cliente.enderecoComercial,
      telefone: cliente.telefone,
      email: cliente.email,
      cgcEnt: cliente.cgcEnt,
      ramoAtividade: cliente.ramoAtividade,
      complementoComercial: cliente.complementoComercial,
      bairroComercial: cliente.bairroComercial,
      cidadeComercial: cliente.cidadeComercial,
      ufComercial: cliente.ufComercial,
      cepComercial: cliente.cepComercial,
      enderecoEntrega: cliente.enderecoEntrega,
      complementoEntrega: cliente.complementoEntrega,
      bairroEntrega: cliente.bairroEntrega,
      cidadeEntrega: cliente.cidadeEntrega,
      ufEntrega: cliente.ufEntrega,
      cepEntrega: cliente.cepEntrega,
      enderecoCobranca: cliente.enderecoCobranca,
      complementoCobranca: cliente.complementoCobranca,
      bairroCobranca: cliente.bairroCobranca,
      cidadeCobranca: cliente.cidadeCobranca,
      ufCobranca: cliente.ufCobranca,
      cepCobranca: cliente.cepCobranca,
      planoPagamento: cliente.planoPagamento,
      dtCadastro: cliente.dtCadastro
    });
    setEditando(cliente);
    setShowModal(true);
  };

  const handleDelete = async (codCliente: string) => {
    try {
      await deleteCliente(codCliente);
      carregarClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoCliente({
      ...novoCliente,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCliente = () => {
    setEditando(null);
    setShowModal(true);
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Clientes</h1>
          <button onClick={handleAddCliente}>Adicionar Cliente</button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço Comercial</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.codCliente}>
                <td>{cliente.nomeCliente}</td>
                <td>{cliente.enderecoComercial}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(cliente)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(cliente.codCliente)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal && (
          <Overlay>
            <Modal>
              <ModalContent>
                <h2>{editando ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Nome:</label>
                    <input
                      type="text"
                      name="nomeCliente"
                      value={novoCliente.nomeCliente}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Endereço Comercial:</label>
                    <input
                      type="text"
                      name="enderecoComercial"
                      value={novoCliente.enderecoComercial}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Telefone:</label>
                    <input
                      type="text"
                      name="telefone"
                      value={novoCliente.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={novoCliente.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <ButtonGroup>
                    <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
                    <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
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

export default Clientes;
