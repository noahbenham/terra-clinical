import PatientContext from './patient-context/PatientContext';
import PatientContextMenu from './patient-context/PatientContextMenu';
import ChartMenu from './patient-context/chart/ChartMenu';
import ChartReviewMenu from './patient-context/chart/review/ChartReviewMenu';

const config = {
  defaultRoute: '/patients',
  routes: {
    '/patients': {
      path: '/patients',
      name: 'PatientsContext',
      component: PatientContext,
    },
  },
  nestedMenuRoutes: {
    '/patients': {
      path: '/patients',
      name: 'PatientContextMenu',
      component: {
        default: {
          type: PatientContextMenu,
          description: 'Default PatientContextMenu',
          props: {
            customProp: 'DEFAULT CONFIG',
          },
        },
        tiny: {
          type: PatientContextMenu,
          description: 'Tiny PatientContextMenu',
          props: {
            isTiny: true,
          },
        },
        medium: null,
        large: null,
        huge: null,
      },
      childRoutes: {
        '/patients/chart': {
          path: '/patients/chart',
          name: 'ChartMenu',
          component: {
            default: {
              type: ChartMenu,
              description: 'Chart Menu',
              props: {
                customProp: 'IM A CHART MENU CONFIG',
              },
            },
          },
          childRoutes: {
            '/patients/chart/review': {
              path: '/patients/chart/review',
              name: 'ChartReview',
              component: {
                default: {
                  type: ChartReviewMenu,
                  description: 'Review Menu',
                  props: {
                    customProp: 'Prop from config',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default config;
