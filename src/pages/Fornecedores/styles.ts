import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 250px;
  background: linear-gradient(135deg, #0044cc, #00aaff);
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

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

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
  }

  svg {
    margin-right: 10px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  font-family: 'Inter', sans-serif;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 36px;
    margin: 0;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #0044cc;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #003399;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #0044cc;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }

  button {
    font-size: 14px;
    padding: 5px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #ffcc00;
    margin-right: 10px; /* Adiciona o espaçamento entre os botões */

    &:hover {
      background-color: #e6b800;
    }
  }

  .delete-btn {
    background-color: #ff4444;

    &:hover {
      background-color: #cc0000;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h2 {
    margin-top: 0;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      label {
        font-weight: bold;
        margin-bottom: 5px;
      }

      input, select {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 16px;
      }
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      background-color: #0044cc;
      color: white;
      cursor: pointer;
      margin-top: 12px;
      font-size: 16px;

      &:hover {
        background-color: #003399;
      }
    }
  }

  button.cancel {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #e0e0e0;
    color: #333;
    cursor: pointer;
    margin-top: 12px;
    align-self: flex-end;

    &:hover {
      background-color: #c0c0c0;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center; /* Centraliza os botões */
  margin-top: 20px; /* Adiciona espaçamento acima do grupo de botões */

  button {
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #0044cc;
    color: #fff;

    &:hover {
      background-color: #003399;
    }

    &:last-child {
      min-width: 500px;
      background-color: #ff4444;
      color: #fff;

      &:hover {
        background-color: #cc0000;
      }
    }
  }
`;
