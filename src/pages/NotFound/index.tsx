// src/pages/NotFound.tsx
import React from 'react';
import { Container, Title, Message, StyledLink, DogImage } from './styles'; // Importando os estilos
import dogdist from '../../assets/dogdist.svg'; // Ajuste o caminho se necessário

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404 - Página Não Encontrada</Title>
      <DogImage src={dogdist} alt="Pingo, o cachorro" />
      <Message>Este é Pingo, ele farejou 404 vezes esta página e nada foi encontrado :(</Message>
      <StyledLink to="/">Voltar para a Home</StyledLink>
    </Container>
  );
};

export default NotFound;
