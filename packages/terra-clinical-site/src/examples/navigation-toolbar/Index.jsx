/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-navigation-toolbar/docs/README.md';
import { version } from 'terra-clinical-navigation-toolbar/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import NavigationToolbarSrc from '!raw-loader!terra-clinical-navigation-toolbar/src/NavigationToolbar.jsx';

// Example Files
import NavigationToolbarStandard from './NavigationToolbarStandard';

const NavigationToolbarExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-toolbarStandard" src={NavigationToolbarSrc} />
    <h2 id="toolbar-standard">NavigationToolbar Standard</h2>
    <NavigationToolbarStandard />
  </div>
);

export default NavigationToolbarExamples;
