import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPedidos, createPedido, editPedido, deletePedido, Pedido } from '../../api/pedidoApi';
import { getAllClientes, Cliente as ClienteAPI } from '../../api/clienteApi';
import { getAllProdutos, Produto } from '../../api/produtoApi';
import { PageContainer, MainContent, ContentHeader, Table, Modal, ModalContent, Overlay } from './styles';
import SidebarComponent from '../../components/Sidebar';

const Pedidos: React.FC = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<ClienteAPI[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoPedido, setNovoPedido] = useState<Omit<Pedido, 'id'>>({
    clienteId: '',
    produtoId: '',
    quantidade: 0,
    dataEntrega: ''
  });
  const [editando, setEditando] = useState<Pedido | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [pedidos, clientes, produtos] = await Promise.all([
        getAllPedidos(),
        getAllClientes(),
        getAllProdutos()
      ]);
      setPedidos(pedidos);
      setClientes(clientes);
      setProdutos(produtos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editando) {
        await editPedido(editando.id, { ...novoPedido });
        setEditando(null);
      } else {
        await createPedido(novoPedido);
      }

      setNovoPedido({
        clienteId: '',
        produtoId: '',
        quantidade: 0,
        dataEntrega: ''
      });

      setShowModal(false);
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };

  const handleEdit = (pedido: Pedido) => {
    setNovoPedido({
      clienteId: pedido.clienteId,
      produtoId: pedido.produtoId,
      quantidade: pedido.quantidade,
      dataEntrega: pedido.dataEntrega
    });
    setEditando(pedido);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePedido(id);
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovoPedido({
      ...novoPedido,
      [name]: name === 'produtoId' ? value : value // Mantendo como string
    });
  };

  const handleAddPedido = () => {
    setEditando(null);
    setShowModal(true);
  };

  // Função atualizada para obter o nome do cliente
  const getNomeCliente = (clienteId: string) => {
    const cliente = clientes.find((c) => c.codCliente === clienteId);
    return cliente ? cliente.nomeCliente : 'Desconhecido';
  };

  const getNomeProduto = (produtoId: string) => {
    const produto = produtos.find((p) => p.codProduto.toString() === produtoId);
    return produto ? produto.nomeProduto : 'Desconhecido';
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Pedidos</h1>
          <button onClick={handleAddPedido}>Adicionar Pedido</button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <Table>
          <thead>
            <tr>
              <th>Código Pedido</th>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Data Entrega</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{getNomeCliente(pedido.clienteId)}</td>
                <td>{getNomeProduto(pedido.produtoId)}</td>
                <td>{pedido.quantidade}</td>
                <td>{pedido.dataEntrega}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(pedido)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(pedido.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal && (
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
                      <option value="">Selecione o cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.codCliente} value={cliente.codCliente}>
                          {cliente.nomeCliente}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Produto:</label>
                    <select
                      name="produtoId"
                      value={novoPedido.produtoId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione o produto</option>
                      {produtos.map((produto) => (
                        <option key={produto.codProduto} value={produto.codProduto}>
                          {produto.nomeProduto}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Quantidade:</label>
                    <input
                      type="number"
                      name="quantidade"
                      value={novoPedido.quantidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Data de Entrega:</label>
                    <input
                      type="date"
                      name="dataEntrega"
                      value={novoPedido.dataEntrega}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit">{editando ? 'Salvar Alterações' : 'Adicionar Pedido'}</button>
                </form>
              </ModalContent>
            </Modal>
          </Overlay>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Pedidos;
