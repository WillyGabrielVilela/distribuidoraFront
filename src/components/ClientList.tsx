import React, { useEffect, useState } from 'react';
import { Cliente, getAllClientes } from '../api/clienteApi';

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    getAllClientes().then(data => setClientes(data));
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
