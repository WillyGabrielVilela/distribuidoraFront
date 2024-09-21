import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Clientes from '../pages/Clientes';
import Estoque from '../pages/Estoque';
import Fornecedores from '../pages/Fornecedores';
import NotFound from '../pages/NotFound';
import Produtos from '../pages/Produtos';
import Pedidos from '../pages/Pedidos';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/clientes', element: <Clientes /> },
  { path: '/estoque', element: <Estoque /> },
  { path: '/produtos', element: <Produtos /> },
  { path: '/fornecedores', element: <Fornecedores /> },
  { path: '/pedidos', element: <Pedidos /> },
  { path: '*', element: <NotFound /> }, // Rota para 404
];


export default routes;
