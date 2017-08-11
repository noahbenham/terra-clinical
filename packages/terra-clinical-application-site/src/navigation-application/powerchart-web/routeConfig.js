import RootMenu from './RootMenu';
import Root from './Root';
import PatientContext from './patient-context/PatientContext';
import PatientContextMenu from './patient-context/PatientContextMenu';
import ChartMenu from './patient-context/chart/ChartMenu';
import ChartReviewMenu from './patient-context/chart/review/ChartReviewMenu';

const config = {
  index: '/patients',
  contentRoutes: {
    '/': {
      path: '/',
      name: 'Root',
      component: {
        default: {
          type: Root,
          description: 'Root Content',
        },
      },
      childRoutes: {
        'patients': {
          path: 'patients',
          name: 'PatientsContext',
          component: {
            default: {
              type: PatientContext,
              description: 'Default PatientContext',
            },
          },
        },
      },
    },
  },
  menuRoutes: {
    '/': {
      path: '/',
      name: 'Root',
      component: {
        default: {
          type: RootMenu,
        },
      },
      childRoutes: {
        'patients': {
          path: 'patients',
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
            '/chart': {
              path: '/chart',
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
                '/review': {
                  path: '/review',
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
    },
  },
};

export default config;
