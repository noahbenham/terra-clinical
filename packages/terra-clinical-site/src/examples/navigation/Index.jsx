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
import NavigationPrimaryContent from './NavigationPrimaryContent';
import NavigationSecondaryContent from './NavigationSecondaryContent';

const NavigationExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-navigationStandard" src={NavigationSrc} />
    <h2 id="navigation-standard">Navigation Standard</h2>
    <NavigationStandard />
    <h2 id="navigation-primary-content">Navigation With Primary Content</h2>
    <NavigationPrimaryContent />
    <h2 id="navigation-secondary-content">Navigation With Secondary Content</h2>
    <NavigationSecondaryContent />
    <h2 id="navigation-both-content">Navigation With Both Primary And Secondary Content</h2>
    <NavigationBoth />
  </div>
);

export default NavigationExamples;
