export const routes = {
  home: '/',
  dashboard: '/dashboard',
  market: '/market',
  history: '/history',
  about: '/about',
  login: '/login',
  notFound: '/404',
};

export const routess = [
  { name: 'Home', route: '/', component: () => import('../views/Market/Market') },
  {
    name: 'Dashboard',
    route: '/dashboard',
    component: () => import('../views/Dashboard/Dashboard'),
  },
  { name: 'Market', route: '/market', component: () => import('../views/Market/Market') },
  {
    name: 'History',
    route: '/history',
    component: () => import('../views/History/History'),
  },
  { name: 'About', route: '/about', component: () => import('../views/About/About') },
  { name: 'Root', route: '/login', component: () => import('../views/Root/Root') },

  { name: 'NotFound', route: '/404', component: () => import('../views/NotFound/NotFound') },
];
