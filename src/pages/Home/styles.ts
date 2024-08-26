import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;



export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;

  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    font-size: 18px;
    text-align: center;
  }

  svg {
    width: 100px;
    height: 100px;
    margin-top: 20px;
  }
`;
