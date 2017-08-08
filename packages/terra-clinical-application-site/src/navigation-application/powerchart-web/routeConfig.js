import PatientContext from './patient-context/PatientContext';
import ChartMenu from './patient-context/chart/ChartMenu';

const config = {
  rootRoute: '/patients',
  menuRoutes: {
    '/patients/chart': {
      path: '/patients/chart',
      name: 'PatientContextMenu',
      component: [{
        type: ChartMenu,
        description: 'Regular ChartMenu',
        breakpoints: ['tiny', 'small', 'medium', 'large'],
        props: {
          path: '/patients/chart',
          customProp: 'NOT HUGE',
        },
      }, {
        type: ChartMenu,
        description: 'Huge ChartMenu',
        breakpoints: ['huge'],
        props: {
          path: '/patients/chart',
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
