import { useRoutes } from 'react-router-dom';

import LazyLoad from './LazyLoadRoutes';

export const enum Paths {
  Main = '/'
}

export const routes = [
  {
    path: Paths.Main,
    element: LazyLoad(() => import('../scenes/Main'))
  },
  {
    path: '*',
    element: <h1>Not Found!</h1>
  }
];

export const Routes = () => useRoutes(routes);
