import { useRoutes } from 'react-router-dom';

import LazyLoad from './LazyLoadRoutes';

export const enum Paths {
  Main = '/',
  Cabinet = '/cabinet',
  Profile = '/cabinet/profile',
  Projects = '/cabinet/projects',
  Security = '/cabinet/security',
  Settings = '/cabinet/settings',
  Project = '/cabinet/projects/:id',
  SignOut = '/cabinet/sign-out'
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
      {
        path: Paths.Profile,
        element: LazyLoad(() => import('../scenes/Cabinet/components/Content/components/Profile'))
      },
      {
        path: Paths.Projects,
        element: LazyLoad(() => import('../scenes/Cabinet/components/Content/components/Projects')),
        children: [
          {
            path: Paths.Project,
            element: LazyLoad(
              () =>
                import(
                  '../scenes/Cabinet/components/Content/components/Projects/components/Content/components/Project'
                )
            )
          }
        ]
      },
      {
        path: Paths.Security,
        element: LazyLoad(() => import('../scenes/Cabinet/components/Content/components/Security'))
      },
      {
        path: Paths.Settings,
        element: LazyLoad(() => import('../scenes/Cabinet/components/Content/components/Settings'))
      },
      {
        path: Paths.SignOut,
        element: LazyLoad(() => import('../scenes/Cabinet/components/Content/components/SignOut'))
      }
    ]
  },
  {
    path: '*',
    element: <h1>Not Found!</h1>
  }
];

export const Routes = () => useRoutes(routes);
