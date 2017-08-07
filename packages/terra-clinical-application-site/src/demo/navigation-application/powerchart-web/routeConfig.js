import PatientContext from './patient-context/PatientContext';
import PatientContextMenu from './patient-context/PatientContextMenu';

const config = {
  rootRoute: '/patients',
  menuRoutes: {
    '/patients': {
      path: '/patients',
      name: 'PatientContextMenu',
      component: {
        type: PatientContextMenu,
        breakpoints: ['tiny', 'small', 'medium', 'large'],
        props: {
          path: '/patients',
          customProp: 'Prop from config',
        },
      },
      parentPath: undefined,
    },
  },
  routes: {
    '/patients': {
      path: '/patients',
      name: 'PatientsContext',
      component: PatientContext,
    },
  },
};

export default config;
