import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Consumer } from 'xfc';
import EmbeddedContentConsumer from 'terra-embedded-content-consumer';
import styles from './SmartConsumer.scss';

const cx = classNames.bind(styles);

Consumer.init();

import './SmartConsumer.scss';

const propTypes = {
   /**
   * The source URL of the content to load.
   */
  src: PropTypes.string.isRequired,
};

const SmartConsumer = ({
    src,
    ...customProps
  }) => {

  const consumerClassNames = cx([
    'smart-consumer',
    customProps.className,
  ]);

  return (
    <div {...customProps} className={consumerClassNames}>
      <EmbeddedContentConsumer src={src} />
    </div>
  );
};

SmartConsumer.propTypes = propTypes;

export default SmartConsumer;