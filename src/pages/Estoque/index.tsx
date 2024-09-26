import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEstoques, createEstoque, editEstoque, deleteEstoque, Estoque as EstoqueTipo } from '../../api/estoqueApi'; // Renomeado Estoque para EstoqueTipo
import { PageContainer, MainContent, ContentHeader, Table, Modal, ModalContent, Overlay, ButtonGroup } from './styles';
import SidebarComponent from '../../components/Sidebar';

const Estoque: React.FC = () => {
  const navigate = useNavigate();
  const [estoques, setEstoques] = useState<EstoqueTipo[]>([]); // Atualizado para EstoqueTipo
  const [novoEstoque, setNovoEstoque] = useState<Omit<EstoqueTipo, 'id'>>({
    produtoId: 0,
    qtEstoqueGerencial: 0,
    qtTransito: 0,
    qtDisponivel: 0,
    qtReservada: 0,
    dtValidade: '',
    dtUltEntrada: '',
    giroProduto: 0,
  });
  const [editando, setEditando] = useState<EstoqueTipo | null>(null); // Atualizado para EstoqueTipo
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarEstoques();
  }, []);

  const carregarEstoques = async () => {
    try {
      const estoques = await getAllEstoques();
      setEstoques(estoques);
    } catch (error) {
      console.error('Erro ao carregar estoques:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editando) {
        await editEstoque(editando.produtoId.toString(), { ...novoEstoque });
        setEditando(null);
      } else {
        await createEstoque(novoEstoque);
      }
      setNovoEstoque({
        produtoId: 0,
        qtEstoqueGerencial: 0,
        qtTransito: 0,
        qtDisponivel: 0,
        qtReservada: 0,
        dtValidade: '',
        dtUltEntrada: '',
        giroProduto: 0,
      });
      setShowModal(false);
      carregarEstoques();
    } catch (error) {
      console.error('Erro ao salvar estoque:', error);
    }
  };

  const handleEdit = (estoque: EstoqueTipo) => { // Atualizado para EstoqueTipo
    setNovoEstoque({
      produtoId: estoque.produtoId,
      qtEstoqueGerencial: estoque.qtEstoqueGerencial,
      qtTransito: estoque.qtTransito,
      qtDisponivel: estoque.qtDisponivel,
      qtReservada: estoque.qtReservada,
      dtValidade: estoque.dtValidade,
      dtUltEntrada: estoque.dtUltEntrada,
      giroProduto: estoque.giroProduto,
    });
    setEditando(estoque);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEstoque(id.toString());
      carregarEstoques();
    } catch (error) {
      console.error('Erro ao excluir estoque:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoEstoque({
      ...novoEstoque,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEstoque = () => {
    setEditando(null);
    setShowModal(true);
  };

  return (
    <PageContainer>
      <SidebarComponent />

      <MainContent>
        <ContentHeader>
          <h1>Estoques</h1>
          <button onClick={handleAddEstoque}>Adicionar Estoque</button>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </ContentHeader>

        <Table>
          <thead>
            <tr>
              <th>Código do Produto</th>
              <th>Quantidade em Estoque</th>
              <th>Quantidade em Trânsito</th>
              <th>Quantidade Disponível</th>
              <th>Quantidade Reservada</th>
              <th>Data de Validade</th>
              <th>Data da Última Entrada</th>
              <th>Giro do Produto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estoques.map((estoque) => (
              <tr key={estoque.produtoId}>
                <td>{estoque.produtoId}</td>
                <td>{estoque.qtEstoqueGerencial}</td>
                <td>{estoque.qtTransito}</td>
                <td>{estoque.qtDisponivel}</td>
                <td>{estoque.qtReservada}</td>
                <td>{estoque.dtValidade}</td>
                <td>{estoque.dtUltEntrada}</td>
                <td>{estoque.giroProduto}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(estoque)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(estoque.produtoId)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal && (
          <Overlay>
            <Modal>
              <ModalContent>
                <h2>{editando ? 'Editar Estoque' : 'Adicionar Estoque'}</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Código do Produto:</label>
                    <input
                      type="number"
                      name="produtoId"
                      value={novoEstoque.produtoId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Quantidade em Estoque:</label>
                    <input
                      type="number"
                      name="qtEstoqueGerencial"
                      value={novoEstoque.qtEstoqueGerencial}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Quantidade em Trânsito:</label>
                    <input
                      type="number"
                      name="qtTransito"
                      value={novoEstoque.qtTransito}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Quantidade Disponível:</label>
                    <input
                      type="number"
                      name="qtDisponivel"
                      value={novoEstoque.qtDisponivel}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Quantidade Reservada:</label>
                    <input
                      type="number"
                      name="qtReservada"
                      value={novoEstoque.qtReservada}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Data de Validade:</label>
                    <input
                      type="date"
                      name="dtValidade"
                      value={novoEstoque.dtValidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Data da Última Entrada:</label>
                    <input
                      type="date"
                      name="dtUltEntrada"
                      value={novoEstoque.dtUltEntrada}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Giro do Produto:</label>
                    <input
                      type="number"
                      name="giroProduto"
                      value={novoEstoque.giroProduto}
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

export default Estoque;
