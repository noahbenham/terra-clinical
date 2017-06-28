/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-navigation/docs/README.md';
import { version } from 'terra-clinical-navigation/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import NavigationSrc from '!raw-loader!terra-clinical-navigation/src/Navigation.jsx';

// Example Files
import NavigationStandard from './NavigationStandard';

const NavigationExamples = () => (
	<div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-secondaryStandard" src={NavigationSecondarySrc} />
    <h2 id="navigation-standard">NavigationSecondary Standard</h2>
    <NavigationStandard />
  </div>
);

export default NavigationExamples;
