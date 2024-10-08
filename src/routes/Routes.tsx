import { useRoutes } from 'react-router-dom';

import LazyLoad from './LazyLoadRoutes';

export const enum Paths {
  Main = '/',
  Cabinet = '/cabinet',
  Profile = '/cabinet/profile',
  Projects = '/cabinet/projects',
  Security = '/cabinet/security',
  Settings = '/cabinet/settings',
  Project = '/cabinet/projects/:id'
}

export const routes = [
  {
    path: Paths.Main,
    element: LazyLoad(() => import('../scenes/Main'))
  },
  {
    path: Paths.Cabinet,
    element: LazyLoad(() => import('../scenes/Cabinet')),
    children: [
      { path: Paths.Profile },
      { path: Paths.Projects, children: [{ path: Paths.Project }] },
      { path: Paths.Security },
      { path: Paths.Settings }
    ]
  },
  {
    path: '*',
    element: <h1>Not Found!</h1>
  }
];

export const Routes = () => useRoutes(routes);
