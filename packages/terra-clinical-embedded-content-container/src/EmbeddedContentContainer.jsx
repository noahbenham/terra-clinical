import React from 'react';
import PropTypes from 'prop-types';
import ContentContainer from 'terra-content-container';
import 'terra-base/lib/baseStyles';

const propTypes = {
  /**
   * The header element to be placed within the header area of the container.
   */
  header: PropTypes.node,
  /**
   * The children to be placed within the main content area of the container.
   */
  children: PropTypes.node,
  /**
   * Whether or not the container should expanded to fill its parent element.
   */
  fill: PropTypes.bool,
};

const defaultProps = {
  header: undefined,
  children: undefined,
  fill: false,
};

const EmbeddedContentContainer = ({
  header,
  children,
  fill,
  ...customProps
  }) => {

  let headerContent;
  let isEmbeddedContainer = false;
  if (window.ionClient) {
    isEmbeddedContainer = window.ionClient.clientId.substr(0, 15) === 'EmbeddedContent';
  }
  
  if (header && isEmbeddedContainer) {
    if (header.type.displayName !== 'ActionHeader') {
      if (header.props.onClose || header.props.onBack || header.props.onMaximize || header.props.onMinimize || header.props.onNext || header.props.onPrevious || header.props.children) {
        const newProps = { title: null };
        headerContent = React.cloneElement(header, newProps);
      } else {
        headerContent = undefined;
      }
    } else if (header.type.displayName !== 'Header') {
      if (header.props.startContent || header.props.endContent) {
        const newProps = { title: null };
        headerContent = React.cloneElement(header, newProps);
      } else {
        headerContent = undefined;
      }
    }
  } else {
    headerContent = header;
  }

  return (
    <ContentContainer {...customProps} header={headerContent} fill={fill}>
      {children}
    </ContentContainer>
  );
};

EmbeddedContentContainer.propTypes = propTypes;
EmbeddedContentContainer.defaultProps = defaultProps;

export default EmbeddedContentContainer;
