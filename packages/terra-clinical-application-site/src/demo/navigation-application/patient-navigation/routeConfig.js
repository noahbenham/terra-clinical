import Home from '../home/Home';
import HomeMenu from '../home/HomeMenu';
import Allergies from '../allergies/Allergies';
import AllergiesMenu from '../allergies/AllergiesMenu';
import Orders from '../orders/Orders';
import OrdersMenu from '../orders/OrdersMenu';
import ActiveAllergies from '../allergies/active/ActiveAllergies';
import ActiveAllergiesMenu from '../allergies/active/ActiveAllergiesMenu';
import InactiveAllergies from '../allergies/inactive/InactiveAllergies';
import InactiveAllergiesMenu from '../allergies/inactive/InactiveAllergiesMenu';

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
      exact: true,
      path: '/allergies',
      name: 'Allergies',
      parentPath: '/',
      component: Allergies,
      menuComponent: AllergiesMenu,
    },
    '/allergies/active': {
      path: '/allergies/active',
      name: 'ActiveAllergies',
      parentPath: '/allergies',
      component: ActiveAllergies,
      menuComponent: ActiveAllergiesMenu,
    },
    '/allergies/inactive': {
      path: '/allergies/inactive',
      name: 'InActiveAllergies',
      parentPath: '/allergies',
      component: InactiveAllergies,
      menuComponent: InactiveAllergiesMenu,
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
