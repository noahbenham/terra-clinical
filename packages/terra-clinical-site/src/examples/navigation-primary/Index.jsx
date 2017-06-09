/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-navigation-primary/docs/README.md';
import { version } from 'terra-clinical-navigation-primary/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import NavigationPrimarySrc from '!raw-loader!terra-clinical-navigation-primary/src/NavigationPrimary.jsx';

// Example Files
import NavigationPrimaryStandard from './NavigationPrimaryStandard';

const NavigationPrimaryExamples = () => (
	<div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-primaryStandard" src={NavigationPrimarySrc} />
    <h2 id="primary-standard">NavigationPrimary Standard</h2>
    <NavigationPrimaryStandard />
  </div>
);

export default NavigationPrimaryExamples;
