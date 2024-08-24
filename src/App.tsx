import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/Clientes';
// import Estoque from './pages/Estoque';
// import Fornecedores from './pages/Fornecedores';
// import Pedidos from './pages/Pedidos';
// import Produtos from './pages/Produtos';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        {/* <Route path="/estoque" element={<Estoque />} /> */}
        {/* <Route path="/fornecedores" element={<Fornecedores />} /> */}
        {/* <Route path="/pedidos" element={<Pedidos />} /> */}
        {/* <Route path="/produtos" element={<Produtos />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
