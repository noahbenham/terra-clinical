import Home from '../home/Home';
import HomeMenu from '../home/HomeMenu';
import Allergies from '../allergies/Allergies';
import AllergiesMenu from '../allergies/AllergiesMenu';
import Orders from '../orders/Orders';
import OrdersMenu from '../orders/OrdersMenu';

const config = {
  routes: {
    '/': {
      exact: true,
      path: '/',
      name: 'Home',
      component: Home,
      menuComponent: HomeMenu,
    },
    '/allergies': {
      path: '/allergies',
      name: 'Allergies',
      parentPath: '/',
      component: Allergies,
      menuComponent: AllergiesMenu,
    },
    '/orders': {
      path: '/orders',
      name: 'Orders',
      parentPath: '/',
      component: Orders,
      menuComponent: OrdersMenu
    },
  },
};

export default config;
