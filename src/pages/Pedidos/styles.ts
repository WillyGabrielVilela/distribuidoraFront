import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 36px;
    margin: 0;
    color: #333;
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
    font-size: 16px;
  }

  th {
    background-color: #0044cc;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }

  button {
    font-size: 14px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #ffa500;
    margin-right: 8px;

    &:hover {
      background-color: #e59400;
    }
  }

  .delete-btn {
    background-color: #ff4c4c;

    &:hover {
      background-color: #e04444;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h2 {
    margin-top: 0;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;

      label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #555;
      }

      input, select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 16px;

        &:focus {
          border-color: #0044cc;
          outline: none;
          box-shadow: 0 0 3px rgba(0, 68, 204, 0.5);
        }
      }
    }

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
        margin-top: 8px;
        background-color: #ff4444;

        &:hover {
          background-color: #cc0000;
        }
      }
    }
  }
`;
