/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-navigation-secondary/docs/README.md';
import { version } from 'terra-clinical-navigation-secondary/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import NavigationSecondarySrc from '!raw-loader!terra-clinical-navigation-secondary/src/NavigationSecondary.jsx';

// Example Files
import NavigationSecondaryStandard from './NavigationSecondaryStandard';

const NavigationPrimaryExamples = () => (
	<div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-primaryStandard" src={NavigationSecondarySrc} />
    <h2 id="primary-standard">NavigationPrimary Standard</h2>
    <NavigationSecondaryStandard />
  </div>
);

export default NavigationPrimaryExamples;
