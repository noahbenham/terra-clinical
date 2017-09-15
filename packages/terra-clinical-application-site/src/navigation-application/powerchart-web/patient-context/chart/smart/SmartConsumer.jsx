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
  patientId: PropTypes.string.isRequired,
   /**
   * The source URL of the content to load.
   */
  userId: PropTypes.string.isRequired,
   /**
   * The source URL of the content to load.
   */
  userName: PropTypes.string.isRequired,
   /**
   * The source URL of the content to load.
   */
  pprCode: PropTypes.string.isRequired,
};

const SmartConsumer = ({
    patientId,
    userId,
    userName,
    pprCode,
    ...customProps
  }) => {

  const consumerClassNames = cx([
    'smart-consumer',
    'visibleOnLoad',
    customProps.className,
  ]);
  XFC.Consumer.mount(document.body, 'https://embedded.devcerner.com/embedded/content/?url='+encodedURI, 'OAuth oauth_consumer_key="2dc558d0-0a0d-4e29-b5dc-111bda523c34",oauth_nonce="yAo4mDyTpjo6qVoQypZFxQUb86ZczXBQ",oauth_signature_method="PLAINTEXT",oauth_timestamp="1488587553",oauth_token="ConsumerKey%3D2dc558d0-0a0d-4e29-b5dc-111bda523c34%26ExpiresOn%3D1488591153%26HMACSecrets%3DhoxREWnpdtulkaJIBOEUSDcId_O3K0xBb77ClZc_ovSVOs4CEK8bhFbjp6c4PvsKQbHk_XFmZr9OO3xvUBnzrvUhf_aKBERiYCoaEjiyRHjr33-sB43c_Qit0ca-EZWttcqps_SAm0BQl25Amopx4g%253D%253D%26KeysVersion%3De5aa6e82-b9e5-4b36-9d61-f633380662f3%26RSASHA1%3DUzSr2fG5FZBf3eaVic1QoxQj5Bhp8H3LuxCMy413ZzGaLoZPbIHreF7ohJ2PJGztYgloo9h3ChLT0Qa8iNp9-bAFPIo4ry5cSZ_tO67R2lDb-wwhVxyeiqqOhsHRTwaqoEMEL7uQ1yYotxKgppp1HMGfedGjjtBMkpwvZCGZWZrnzZsKtTpjUjshtGyn4m5y3oJWw45bAyA4m05qPUx3HabL4sFiD9wFLL8uEwoIJvQSr-59aKgR2YTRxKCjOEoDHs-UFiwLRzlurWxAs9guOaDPdcnS8gIJk70MrNC52bvuGGXRpTdDnqWZO_avxfJXp6ZrOr2UiskQe9texVGXZg%253D%253D",oauth_version="1.0",oauth_signature="edPAH6Ee7aD0mc-YQYvCQiFrJiX1r0HG%2661gHwSMq2wn27yhibGYX2tIrz6KLdR5V"');

  const src = 'https://smart.devcerner.com/smart/2c400054-42d8-4e74-87b7-80b5bd5fde9f/apps/a77a3d9a-28fe-4822-a96a-2ff09bed599a?PAT_PersonId=6625142&USR_PersonId=1380011&PAT_PPRCode=1116&username=ss025783&need_patient_banner=true';
//   const src = `https://smart.devcerner.com/smart/2c400054-42d8-4e74-87b7-80b5bd5fde9f/apps/a77a3d9a-28fe-4822-a96a-2ff09bed599a?PAT_PersonId=${patientId}&USR_PersonId=${userId}&PAT_PPRCode=${pprCode}&username=${userName}&need_patient_banner=true`

  return (
    <EmbeddedContentConsumer className={consumerClassNames} src={src} />
  );
};

SmartConsumer.propTypes = propTypes;

export default SmartConsumer;