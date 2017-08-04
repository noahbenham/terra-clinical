import PatientContext from './patient-context/PatientContext';
import PatientContextMenu from './patient-context/PatientContextMenu';

const config = {
  rootRoute: '/patients',
  menuRoutes: {
    '/patients': {
      path: '/patients',
      name: 'PatientContextMenu',
      component: PatientContextMenu,
      parentPath: undefined,
      props: {
        path: '/patients',
      },
    },
  },
  routes: {
    '/patients': {
      path: '/patients',
      name: 'PatientsContext',
      component: PatientContext,
      props: {
        path: '/patients',
      },
    },
  },
};

export default config;
