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
import NavigationBoth from './NavigationBoth';
import NavigationOnlyPrimary from './NavigationOnlyPrimary';
import NavigationOnlySecondary from './NavigationOnlySecondary';

const NavigationExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-navigationStandard" src={NavigationSrc} />
    <h2 id="navigation-standard">Navigation Standard</h2>
    <NavigationStandard />
    <h2 id="navigation-standard">Navigation With Primary and Secondary</h2>
    <NavigationBoth />
    <h2 id="navigation-standard">Navigation With Only Primary</h2>
    <NavigationOnlyPrimary />
    <h2 id="navigation-standard">Navigation With Only Secondary</h2>
    <NavigationOnlySecondary />
  </div>
);

export default NavigationExamples;
