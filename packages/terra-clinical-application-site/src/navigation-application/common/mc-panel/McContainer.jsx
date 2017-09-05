import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import Button from 'terra-button';
import styles from './McContainer.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The component to display in the panel content area.
   */
  children: PropTypes.node,
  /**
   * Callback when the overlay close functionality is triggered.
   */
  isHoverEnabled: PropTypes.bool,
  /**
   * Callback when the overlay close functionality is triggered.
   */
  onClick: PropTypes.func,
  /**
   * Callback when the overlay close functionality is triggered.
   */
  onHoverOff: PropTypes.func,
  /**
   * Callback when the overlay close functionality is triggered.
   */
  onHoverOn: PropTypes.func,
};

const defaultProps = {
  children: [],
};

class McContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setContainerNode = this.setContainerNode.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.listenersAdded = false;
    this.isMouseEnterActive = false;
  }

  componentDidMount() {
    if (this.containerNode) {
      this.listenersAdded = this.updateListenersOnNode(this.containerNode);
    }
  }

  componentDidUpdate() {
    if (this.containerNode) {
      this.listenersAdded = this.updateListenersOnNode(this.containerNode);
    }
  }

  componentWillUnmount() {
    if (this.containerNode) {
      this.listenersAdded = this.removeListenersFromNode(this.containerNode);
    }
  }

  updateListenersOnNode(node) {
    if (this.props.isHoverEnabled) {
      return this.addListenersToNode(node);
    } else if (!this.props.isHoverEnabled) {
      return removeListenersFromNode(node);
    }
    return false;
  }

  addListenersToNode(node) {
    if (!this.listenersAdded) {
      node.addEventListener('mouseenter', this.handleMouseEnter);
      node.addEventListener('mouseleave', this.handleMouseLeave);
    }
    return true;
  }

  removeListenersFromNode(node) {
    if (this.listenersAdded) {
      node.removeEventListener('mouseenter', this.handleMouseEnter);
      node.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    return false;
  }

  handleMouseEnter(event) {
    if (this.props.onHoverOn && !this.isMouseEnterActive) {
      this.props.onHoverOn(event);
    }
    this.isMouseEnterActive = true;
  }

  handleMouseLeave(event) {
    if (this.props.onHoverOff) {
      this.props.onHoverOff(event);
    }
    this.isMouseEnterActive = false;
  }

  handleOnClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  setContainerNode(node) {
    this.containerNode = node;
  }

  render() {
    const {
      children,
      isHoverEnabled,
      onHoverOff,
      onHoverOn,
      ...customProps
    } = this.props;

    const containerClasses = cx([
      'mc-container', 
      { 'is-hover-disabled': !isHoverEnabled },
      customProps.className,
    ]);

    return (
      <div className={containerClasses} ref={this.setContainerNode}>
        <div className={cx('inner-section')}>
          {children}
        </div>
        <div className={cx('hover-section')}>
          <Button className={cx('hover-button')} variant="secondary" onClick={this.handleOnClick} />
        </div>
      </div>
    );
  }
}

McContainer.propTypes = propTypes;
McContainer.defaultProps = defaultProps;

export default McContainer;
