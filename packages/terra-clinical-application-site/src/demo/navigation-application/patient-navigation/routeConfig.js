import Home from '../home/Home';
import HomeMenu from '../home/HomeMenu';
import Allergies from '../allergies/Allergies';
import AllergiesMenu from '../allergies/AllergiesMenu';
import Orders from '../orders/Orders';
import OrdersMenu from '../orders/OrdersMenu';
import ActiveAllergies, { activeAllergies } from '../allergies/active/ActiveAllergies';
import ActiveAllergiesMenu, { activeAllergiesMenu } from '../allergies/active/ActiveAllergiesMenu';
import InactiveAllergies from '../allergies/inactive/InactiveAllergies';
import InactiveAllergiesMenu from '../allergies/inactive/InactiveAllergiesMenu';
import Patients from '../patients/Patients';
import PatientsMenu from '../patients/PatientsMenu';

const config = {
  rootRoute: '/',
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
      exact: true,
      path: '/orders',
      name: 'Orders',
      parentPath: '/',
      component: Orders,
      menuComponent: OrdersMenu,
    },
    '/orders/allergies/active': {
      path: '/orders/allergies/active',
      name: 'ActiveAllergies(Orders)',
      parentPath: '/orders',
      component: activeAllergies('/orders/allergies/active'),
      menuComponent: activeAllergiesMenu('/orders/allergies/active'),
    },
    '/patients': {
      path: '/patients',
      name: 'Patients',
      parentPath: '/',
      component: Patients,
      menuComponent: PatientsMenu,
    },
  },
};

export default config;
