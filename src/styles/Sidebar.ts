import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Sidebar = styled.aside`
  width: 250px;
  background: linear-gradient(135deg, #0044cc, #00aaff);
  color: white;
  padding: 20px;

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    margin: 15px 0;
  }
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s, border-radius 0.3s;
  margin: 8px;
  font-family: 'Inter', sans-serif; /* Adiciona a fonte Inter */

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
  }

  img {
    margin-right: 20px; /* Aumenta o espaço entre o ícone e o texto */
  }
`;