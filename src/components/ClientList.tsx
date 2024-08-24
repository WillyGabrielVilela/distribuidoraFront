import React, { useEffect, useState } from 'react';

interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <h2>{cliente.nome}</h2>
            <p>{cliente.endereco}</p>
            <p>{cliente.telefone}</p>
            <p>{cliente.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
