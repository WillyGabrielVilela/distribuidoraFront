import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
`;

export const ModalContent = styled.div`

max-height: 80vh; /* Altura máxima do modal */
  overflow-y: auto; /* Permitir rolagem vertical */
  padding: 20px; /* Espaçamento interno */
  border-radius: 8px; /* Bordas arredondadas */
  background-color: white; /* Cor de fundo */

  h2 {
    margin-top: 0;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      label {
        width: 150px;
        margin-right: 10px;
        font-weight: bold;
      }

      input {
        width: calc(100% - 160px);
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

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
      background-color: #ff4444;
      color: #fff;

      &:hover {
        background-color: #cc0000;
      }
    }
  }
`;

