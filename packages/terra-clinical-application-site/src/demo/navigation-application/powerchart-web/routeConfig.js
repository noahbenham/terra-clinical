import PatientContext from './patient-context/PatientContext';
import PatientContextMenu from './patient-context/PatientContextMenu';

const config = {
  rootRoute: '/patients',
  menuRoutes: {
    '/patients': {
      path: '/patients',
      name: 'PatientContextMenu',
      component: [{
        type: PatientContextMenu,
        description: 'Regular PatientContextMenu',
        breakpoints: ['tiny', 'small', 'medium', 'large'],
        props: {
          path: '/patients',
          customProp: 'NOT HUGE',
        },
      }, {
        type: PatientContextMenu,
        description: 'Huge PatientContextMenu',
        breakpoints: ['huge'],
        props: {
          path: '/patients',
          customProp: 'HUGE',
        },
      }],
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
