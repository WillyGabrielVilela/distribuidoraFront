import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClientes, createCliente, editCliente, deleteCliente, Cliente } from '../../api/clienteApi';
import { buscarEnderecoPorCep } from '../../api/cepApi'; // Importar a função de busca de CEP
import { PageContainer, MainContent, ContentHeader, Table, Modal, ModalContent, Overlay, ButtonGroup } from './styles';
import SidebarComponent from '../../components/Sidebar';
import InputMask from 'react-input-mask';

const Clientes: React.FC = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoCliente, setNovoCliente] = useState<Omit<Cliente, 'dtCadastro' | 'codCliente'>>({
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
    contatoCargo1: '',
    contatoNome1: '',
    contatoCpf1: '',
    contatoCargo2: '',
    contatoNome2: '',
    contatoCpf2: '',
    contatoCargo3: '',
    contatoNome3: '',
    contatoCpf3: '',
    prazoPagamento: 1 // Coloque um valor padrão, se necessário
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

    // Verificar se o CNPJ/CPF já está cadastrado
    const clienteExistente = clientes.find(cliente => cliente.cgcEnt === novoCliente.cgcEnt);

    if (clienteExistente && (!editando || clienteExistente.codCliente !== editando.codCliente)) {
      alert('Erro: CNPJ/CPF já cadastrado.');
      return; // Impede o envio se já existir
    }

    try {
      if (editando) {
        await editCliente(editando.codCliente, { ...novoCliente });
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
        contatoCargo1: '',
        contatoNome1: '',
        contatoCpf1: '',
        contatoCargo2: '',
        contatoNome2: '',
        contatoCpf2: '',
        contatoCargo3: '',
        contatoNome3: '',
        contatoCpf3: '',
        prazoPagamento: 1,
      });

      setShowModal(false);
      carregarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const ramosCnae = [
    'Agropecuária',
    'Indústria de Alimentos',
    'Comércio Varejista',
    'Comércio Atacadista',
    'Transporte de Cargas',
    'Transporte de Passageiros',
    'Serviços de Tecnologia da Informação',
    'Educação',
    'Saúde',
    'Construção Civil',
    'Hotelaria',
    'Turismo',
    'Serviços de Limpeza',
    'Serviços de Segurança',
    'Serviços de Consultoria',
    'Atividades Artísticas',
    'Indústria Têxtil',
    'Indústria Química',
    'Indústria Metalúrgica',
    'Comércio de Veículos',
    'Serviços Financeiros',
    'Serviços de Telecomunicações',
    'Atividades Recreativas',
    'Serviços de Publicidade',
    'Indústria de Papel e Celulose',
    'Indústria de Móveis',
    'Serviços de Marketing',
    'Indústria de Bebidas',
    'Indústria Farmacêutica',
    'Serviços de Jardinagem',
  ];

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
      contatoCargo1: cliente.contatoCargo1,
      contatoNome1: cliente.contatoNome1,
      contatoCpf1: cliente.contatoCpf1,
      contatoCargo2: cliente.contatoCargo2,
      contatoNome2: cliente.contatoNome2,
      contatoCpf2: cliente.contatoCpf2,
      contatoCargo3: cliente.contatoCargo3,
      contatoNome3: cliente.contatoNome3,
      contatoCpf3: cliente.contatoCpf3,
      prazoPagamento: 1,
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

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepComMascara = e.target.value;
    const cepSemMascara = cepComMascara.replace(/\D/g, '');

    setNovoCliente((prevCliente) => ({
      ...prevCliente,
      cepComercial: cepComMascara,
    }));

    if (cepSemMascara.length === 8) {
      try {
        const endereco = await buscarEnderecoPorCep(cepSemMascara);
        setNovoCliente((prevCliente) => ({
          ...prevCliente,
          enderecoComercial: endereco.logradouro || '',
          bairroComercial: endereco.bairro || '',
          cidadeComercial: endereco.localidade || '',
          ufComercial: endereco.uf || '',
        }));
      } catch (error) {
        console.error("Erro ao buscar o endereço. Verifique o CEP.", error);
      }
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
              <th>CPF</th>
              <th>Endereço Comercial</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ramo de Atividade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.codCliente}>
                <td>{cliente.nomeCliente}</td>
                <td>{cliente.cgcEnt}</td>
                <td>{cliente.enderecoComercial}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.ramoAtividade}</td>
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
                    <label>CPF/CNPJ:</label>
                    <InputMask
                      mask='999.999.999-99'
                      type="text"
                      name="cgcEnt"
                      value={novoCliente.cgcEnt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>CEP Comercial:</label>
                    <InputMask
                      mask='99999-999'
                      type="text"
                      name="cepComercial"
                      value={novoCliente.cepComercial}
                      onChange={handleCepChange} // Atualiza o CEP e busca endereço}
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
                    <InputMask
                      mask='(99)99999-9999'
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
                  <div>
                    <label>Ramo de Atividade:</label>
                    <select
                      name="ramoAtividade"
                      value={novoCliente.ramoAtividade}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione uma atividade</option>
                      {ramosCnae.map((ramo) => (
                        <option key={ramo} value={ramo}>
                          {ramo}
                        </option>
                      ))}
                    </select>
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