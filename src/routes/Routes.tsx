import { useRoutes } from 'react-router-dom';

import LazyLoad from './LazyLoadRoutes';

export const enum Paths {
  Main = '/',
  Cabinet = '/cabinet'
}

export const routes = [
  {
    path: Paths.Main,
    element: LazyLoad(() => import('../scenes/Main'))
  },
  {
    path: Paths.Cabinet,
    element: LazyLoad(() => import('../scenes/Cabinet'))
  },
  {
    path: '*',
    element: <h1>Not Found!</h1>
  }
];

export const Routes = () => useRoutes(routes);
