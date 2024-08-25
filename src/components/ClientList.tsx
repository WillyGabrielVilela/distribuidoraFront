import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { getAllClientes, createCliente, editCliente, deleteCliente, Cliente } from '../api/clienteApi';

const Clientes: React.FC = () => {
  const navigate = useNavigate(); // Inicializar o hook useNavigate
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoCliente, setNovoCliente] = useState<Omit<Cliente, 'id'>>({
    nome: '',
    endereco: '',
    telefone: '',
    email: ''
  });
  const [editando, setEditando] = useState<Cliente | null>(null);

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
        await editCliente(editando.id, { ...novoCliente, id: editando.id });
        setEditando(null);
      } else {
        await createCliente(novoCliente);
      }
      setNovoCliente({ nome: '', endereco: '', telefone: '', email: '' });
      carregarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setNovoCliente({
      nome: cliente.nome,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
      email: cliente.email
    });
    setEditando(cliente);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCliente(id);
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

  return (
    <div>
      <button onClick={() => navigate('/')}>Voltar para Home</button> {/* Botão de navegação */}
      <h1>Lista de Clientes</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={novoCliente.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={novoCliente.endereco}
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
        <button type="submit">
          {editando ? 'Atualizar Cliente' : 'Adicionar Cliente'}
        </button>
      </form>

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <h2>{cliente.nome}</h2>
            <p>{cliente.endereco}</p>
            <p>{cliente.telefone}</p>
            <p>{cliente.email}</p>
            <button onClick={() => handleEdit(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
