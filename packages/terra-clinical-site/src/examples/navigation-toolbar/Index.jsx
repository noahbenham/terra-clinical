/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-navigation-header/docs/README.md';
import { version } from 'terra-clinical-navigation-header/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import NavigationHeaderSrc from '!raw-loader!terra-clinical-navigation-header/src/NavigationHeader.jsx';

// Example Files
import NavigationHeaderStandard from './NavigationHeaderStandard';

const NavigationHeaderExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-primaryStandard" src={NavigationHeaderSrc} />
    <h2 id="header-standard">NavigationHeader Standard</h2>
    <NavigationHeaderStandard />
  </div>
);

export default NavigationHeaderExamples;
