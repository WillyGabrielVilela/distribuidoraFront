import React from 'react';
import { Sidebar, StyledLink } from '../styles/Sidebar'; // Ajuste o caminho se necessário
import suppliersLogo from '../assets/suppliersdist.svg';
import stockLogo from '../assets/stockdist.svg';
import userLogo from '../assets/userdist.svg';
import productsLogo from '../assets/productdist.svg'; // Novo ícone para Produtos

const SidebarComponent: React.FC = () => {
  return (
    <Sidebar>
      <nav>
        <ul>
          <li>
            <StyledLink to="/clientes">
              <img src={userLogo} alt="Clientes Imagem" />
              Clientes
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/fornecedores">
              <img src={suppliersLogo} alt="Fornecedores Imagem" />
              Fornecedores
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/estoque">
              <img src={stockLogo} alt="Estoque Imagem" />
              Estoque
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/produtos">
              <img src={productsLogo} alt="Produtos Imagem" />
              Produtos
            </StyledLink>
          </li>
        </ul>
      </nav>
    </Sidebar>
  );
};

export default SidebarComponent;
