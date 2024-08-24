import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';  // Arquivo CSS para estilização provisório

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/clientes">Clientes</Link>
            </li>
            <li>
              <Link to="/fornecedores">Fornecedores</Link>
            </li>
            <li>
              <Link to="/estoque">Estoque</Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <h1>Bem-vindo à Distribuidora</h1>
        <p>Explore as opções no menu lateral para gerenciar os recursos da sua distribuidora.</p>
      </main>
    </div>
  );
};

export default Home;
