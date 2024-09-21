import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPedidos, createPedido, editPedido, deletePedido, Pedido } from '../../api/pedidoApi';
import { getAllClientes } from '../../api/clienteApi'; // Supondo que você tenha uma API para clientes
import { getAllFornecedores } from '../../api/fornecedoresApi'; // Supondo que você tenha uma API para fornecedores
import { PageContainer, MainContent, ContentHeader, Table, Modal, ModalContent, Overlay } from './styles';
import SidebarComponent from '../../components/Sidebar';

const Pedidos: React.FC = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [novoPedido, setNovoPedido] = useState<Omit<Pedido, 'id'>>({
    clienteId: '',
    fornecedorId: '',
    dataPedido: '',
    itens: [],
  });
  const [editando, setEditando] = useState<Pedido | null>(null);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [clientes, setClientes] = useState<any[]>([]); // Ajuste o tipo conforme a estrutura de cliente
  const [fornecedores, setFornecedores] = useState<any[]>([]); // Ajuste o tipo conforme a estrutura de fornecedor

  useEffect(() => {
    carregarPedidos();
    carregarClientes();
    carregarFornecedores();
  }, []);

  const carregarPedidos = async () => {
    try {
      const pedidos = await getAllPedidos();
      setPedidos(pedidos);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const carregarClientes = async () => {
    try {
      const clientes = await getAllClientes();
      setClientes(clientes);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

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
        await editPedido(editando.id, { ...novoPedido, id: editando.id });
        setEditando(null);
      } else {
        await createPedido(novoPedido);
      }
      setNovoPedido({
        clienteId: '',
        fornecedorId: '',
        dataPedido: '',
        itens: [],
      });
      carregarPedidos();
      setModalAberto(false);
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };

  const handleEdit = (pedido: Pedido) => {
    setNovoPedido({
      clienteId: pedido.clienteId,
      fornecedorId: pedido.fornecedorId,
      dataPedido: pedido.dataPedido,
      itens: pedido.itens,
    });
    setEditando(pedido);
    setModalAberto(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePedido(id);
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setNovoPedido(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Pedidos</h1>
          <button onClick={() => setModalAberto(true)}>Adicionar Pedido</button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <Table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Fornecedor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.clienteId}</td>
                <td>{pedido.fornecedorId}</td>
                <td>{pedido.dataPedido}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(pedido)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(pedido.id)}>Excluir</button>
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
              <h2>{editando ? 'Editar Pedido' : 'Adicionar Pedido'}</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Cliente:</label>
                  <select
                    name="clienteId"
                    value={novoPedido.clienteId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um cliente</option>
                    {clientes.map(cliente => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Fornecedor:</label>
                  <select
                    name="fornecedorId"
                    value={novoPedido.fornecedorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedores.map(fornecedor => (
                      <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Data do Pedido:</label>
                  <input
                    type="date"
                    name="dataPedido"
                    value={novoPedido.dataPedido}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit">
                  {editando ? 'Atualizar Pedido' : 'Adicionar Pedido'}
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

export default Pedidos;
