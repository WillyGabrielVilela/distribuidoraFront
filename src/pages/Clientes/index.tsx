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

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({
    nomeCliente: '', // Inicialmente, nenhum erro nos campos
    ramoAtividade: '',
    telefone: '',
    cgcEnt: ''
  });

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

  // Função para validar campos que devem aceitar apenas letras
const validarApenasLetras = (value: string, name: string) => {
  const newValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); // Remove números e caracteres especiais, exceto letras e acentos
  if (newValue !== value) {
    setErrorMessages((prev) => ({ ...prev, [name]: 'Apenas letras são permitidas' }));
  } else {
    setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  }
  return newValue;
};

// Função para validar campos que devem aceitar apenas números
const validarApenasNumeros = (value: string, name: string) => {
  const newValue = value.replace(/[^0-9]/g, ''); // Remove tudo que não for número
  if (newValue !== value) {
    setErrorMessages((prev) => ({ ...prev, [name]: 'Apenas números são permitidos' }));
  } else {
    setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  }
  return newValue;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  let newValue = value;
  if (name === 'nomeCliente' || name === 'ramoAtividade') {
    newValue = validarApenasLetras(value, name); // Adicione o nome como segundo argumento
  } else if (name === 'telefone' || name === 'cgcEnt' || name.startsWith('cep')) {
    newValue = validarApenasNumeros(value, name); // Adicione o nome como segundo argumento
  }
    setNovoCliente({
      ...novoCliente,
      [name]: newValue
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
    {errorMessages.nomeCliente && (
      <p style={{ color: 'red', fontSize: '12px' }}>
        {errorMessages.nomeCliente}
      </p>
    )}
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
    {errorMessages.telefone && (
      <p style={{ color: 'red', fontSize: '12px' }}>
        {errorMessages.telefone}
      </p>
    )}
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

    <div>
      <label>CGC:</label>
      <input
        type="text"
        name="cgcEnt"
        value={novoCliente.cgcEnt}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Ramo de Atividade:</label>
      <input
        type="text"
        name="ramoAtividade"
        value={novoCliente.ramoAtividade}
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
      <label>Complemento Comercial:</label>
      <input
        type="text"
        name="complementoComercial"
        value={novoCliente.complementoComercial}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Bairro Comercial:</label>
      <input
        type="text"
        name="bairroComercial"
        value={novoCliente.bairroComercial}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>Cidade Comercial:</label>
      <input
        type="text"
        name="cidadeComercial"
        value={novoCliente.cidadeComercial}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>UF Comercial:</label>
      <input
        type="text"
        name="ufComercial"
        value={novoCliente.ufComercial}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <label>CEP Comercial:</label>
      <input
        type="text"
        name="cepComercial"
        value={novoCliente.cepComercial}
        onChange={handleChange}
        required
      />
    </div>
   
    {/* Campos de Endereço de Entrega */}
    <div>
      <label>Endereço de Entrega:</label>
      <input
        type="text"
        name="enderecoEntrega"
        value={novoCliente.enderecoEntrega}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Complemento de Entrega:</label>
      <input
        type="text"
        name="complementoEntrega"
        value={novoCliente.complementoEntrega}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Bairro de Entrega:</label>
      <input
        type="text"
        name="bairroEntrega"
        value={novoCliente.bairroEntrega}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Cidade de Entrega:</label>
      <input
        type="text"
        name="cidadeEntrega"
        value={novoCliente.cidadeEntrega}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>UF de Entrega:</label>
      <input
        type="text"
        name="ufEntrega"
        value={novoCliente.ufEntrega}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>CEP de Entrega:</label>
      <input
        type="text"
        name="cepEntrega"
        value={novoCliente.cepEntrega}
        onChange={handleChange}
      />
    </div>

    {/* Campos de Endereço de Cobrança */}
    <div>
      <label>Endereço de Cobrança:</label>
      <input
        type="text"
        name="enderecoCobranca"
        value={novoCliente.enderecoCobranca}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Complemento de Cobrança:</label>
      <input
        type="text"
        name="complementoCobranca"
        value={novoCliente.complementoCobranca}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Bairro de Cobrança:</label>
      <input
        type="text"
        name="bairroCobranca"
        value={novoCliente.bairroCobranca}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>Cidade de Cobrança:</label>
      <input
        type="text"
        name="cidadeCobranca"
        value={novoCliente.cidadeCobranca}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>UF de Cobrança:</label>
      <input
        type="text"
        name="ufCobranca"
        value={novoCliente.ufCobranca}
        onChange={handleChange}
      />
    </div>
    <div>
      <label>CEP de Cobrança:</label>
      <input
        type="text"
        name="cepCobranca"
        value={novoCliente.cepCobranca}
        onChange={handleChange}
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
