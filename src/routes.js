import { lazy } from 'react';

const routes = [
  {
    exact: true,
    label: 'Home',
    path: '/',
    component: lazy(() => import('./pages/HomePage')),
  },
  {
    exact: true,
    label: 'Movies',
    path: '/movies',
    component: lazy(() => import('./pages/MoviesPage')),
  },
  {
    exact: false,
    label: 'MovieDetails',
    path: '/movies/:movieId',
    component: lazy(() =>
      import('./components/MovieDetailsPage/MovieDetailsPage'),
    ),
  },
  {
    exact: true,
    label: 'Cast',
    path: '/movies/:movieId/cast',
    component: lazy(() => import('./components/Cast/Cast')),
  },
  {
    exact: true,
    label: 'Reviews',
    path: '/movies/:movieId/reviews',
    component: lazy(() => import('./components/Reviews/Reviews')),
  },
];

export default routes;
