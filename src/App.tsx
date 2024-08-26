import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
// import Estoque from './pages/Estoque';
import Fornecedores from './pages/Fornecedores';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        {/* <Route path="/estoque" element={<Estoque />} /> */}
        {<Route path="/fornecedores" element={<Fornecedores />} />}
        <Route path="*" element={<NotFound />} /> {/* Rota para 404 */}
      </Routes>
    </Router>
  );
};

export default App;
