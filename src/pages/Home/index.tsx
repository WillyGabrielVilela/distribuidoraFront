// src/pages/Home.tsx
import React from 'react';
import Sidebar from '../../components/Sidebar'; // Ajuste o caminho se necessário
import { HomeContainer, MainContent } from './styles';
import Logo from '../../assets/logodist.svg';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Sidebar />

      <MainContent>
        <img src={Logo} alt="Logo" />
        <h1>Bem-vindo à Distribuidora</h1>
        <p>Explore as opções no menu lateral para gerenciar os recursos da sua distribuidora.</p>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
