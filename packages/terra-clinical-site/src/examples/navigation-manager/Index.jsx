/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-navigation-manager/docs/README.md';
import { version } from 'terra-clinical-navigation-manager/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import NavigationManagerSrc from '!raw-loader!terra-clinical-navigation-manager/src/NavigationManager.jsx';

// Example Files
import NavigationManagerStandard from './NavigationManagerStandard';

const NavigationExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-navigationStandard" src={NavigationManagerSrc} />
    <h2 id="navigation-manager-standard">Navigation Manager with Navigation</h2>
    <NavigationManagerStandard />
  </div>
);

export default NavigationExamples;
