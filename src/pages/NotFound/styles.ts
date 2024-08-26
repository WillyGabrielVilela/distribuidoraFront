// src/pages/NotFoundStyles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  text-align: center;
  padding: 20px;
  
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #000000; /* Preto */
  font-weight: bold; /* Negrito */
  margin: 0;
`;

export const Message = styled.p`
  font-size: 18px;
  color: #000000; /* Preto */
  font-weight: bold; /* Negrito */
  margin: 20px 0;
`;

export const StyledLink = styled(Link)`
  font-size: 16px;
  color: #0044cc;
  text-decoration: none;
  border: 1px solid #0044cc;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #0044cc;
    color: white;
  }
`;

export const DogImage = styled.img`
  width: 300px; /* Aumentando o tamanho da imagem */
  height: auto;
  margin: 20px 0;
`;
