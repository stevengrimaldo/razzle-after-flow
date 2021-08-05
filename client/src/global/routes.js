import asyncComponent from '@jaredpalmer/after/asyncComponent';

export default [
  {
    component: asyncComponent({
      loader: () => import('../pages/Home'),
    }),
    exact: true,
    path: '/',
  },
];
