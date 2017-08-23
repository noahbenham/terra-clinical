import React from 'react';
import Button from 'terra-button';
import IconClipboard from 'terra-icon/lib/icon/IconClipboard';
import IconComment from 'terra-icon/lib/icon/IconComment';
import IconNotification from 'terra-icon/lib/icon/IconNotification';

import Root from './Root';
import PatientContext from './patient-context/PatientContext';
import PatientContextMenu from './patient-context/PatientContextMenu';
import ChartMenu from './patient-context/chart/ChartMenu';
import ChartReviewMenu from './patient-context/chart/review/ChartReviewMenu';

const ChartMenuIcon = () => (
  <Button size="large" icon={<IconClipboard />} variant="link" />
);

const MessagesMenuIcon = () => (
  <Button size="large" icon={<IconComment />} variant="link" />
);

const AlertsMenuIcon = () => (
  <Button size="large" icon={<IconNotification />} variant="link" />
);

const config = {
  primaryNav: {
    index: '/patients',
    links: [{
      path: '/patients',
      name: 'Chart',
      component: ChartMenuIcon,
    }, {
      path: '/messages',
      name: 'Messages',
      component: MessagesMenuIcon,
    }, {
      path: '/alerts',
      name: 'Alerts',
      component: AlertsMenuIcon,
    }],
  },
  contentRoutes: {
    '/patients': {
      path: '/patients',
      name: 'PatientsContext',
      component: {
        default: {
          type: PatientContext,
          description: 'Default PatientContext',
        },
      },
    },
    '/messages': {
      path: '/messages',
      name: 'Messages',
      component: {
        default: {
          type: Root,
          description: 'Default Messages',
        },
      },
    },
    '/alerts': {
      path: '/alerts',
      name: 'Alerts',
      component: {
        default: {
          type: Root,
          description: 'Default Messages',
        },
      },
    },
  },
  menuRoutes: {
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
        small: null,
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
