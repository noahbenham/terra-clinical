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
  navigation: {
    index: '/patients',
    links: [{
      path: '/patients',
      text: 'Chart',
      component: ChartMenuIcon,
    }, {
      path: '/messages',
      text: 'Messages',
      component: MessagesMenuIcon,
    }, {
      path: '/alerts',
      text: 'Alerts',
      component: AlertsMenuIcon,
    }],
  },
  contentRoutes: {
    '/patients': {
      path: '/patients',
      component: {
        default: {
          componentClass: PatientContext,
        },
      },
      meta: {
        arbitrary: 'value',
      },
    },
    '/messages': {
      path: '/messages',
      component: {
        default: {
          componentClass: Root,
        },
      },
    },
    '/alerts': {
      path: '/alerts',
      component: {
        default: {
          componentClass: Root,
        },
      },
    },
  },
  menuRoutes: {
    '/patients': {
      path: '/patients',
      component: {
        default: {
          componentClass: PatientContextMenu,
          props: {
            customProp: 'DEFAULT CONFIG',
          },
        },
        small: null,
        medium: null,
        large: null,
        huge: null,
      },
      children: {
        '/patients/chart': {
          path: '/patients/chart',
          component: {
            default: {
              componentClass: ChartMenu,
              props: {
                customProp: 'IM A CHART MENU CONFIG',
              },
            },
          },
          children: {
            '/patients/chart/review': {
              path: '/patients/chart/review',
              component: {
                default: {
                  componentClass: ChartReviewMenu,
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
