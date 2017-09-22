import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import IconChevronRight from 'terra-icon/lib/icon/IconChevronRight';
import styles from './HoverTarget.scss';

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
   * The component to display in the panel content area.
   */
  isMenuEnabled: PropTypes.bool,
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
  isHoverEnabled: false,
  isMenuEnabled: false,
};

class HoverTarget extends React.Component {
  constructor(props) {
    super(props);
    this.setHoverNode = this.setHoverNode.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.listenersAdded = false;
    this.isMouseEnterActive = false;
  }

  componentDidMount() {
    if (this.hoverNode) {
      this.listenersAdded = this.updateListenersOnNode(this.hoverNode);
    }
  }

  componentDidUpdate() {
    if (this.hoverNode) {
      this.listenersAdded = this.updateListenersOnNode(this.hoverNode);
    }
  }

  componentWillUnmount() {
    if (this.hoverNode) {
      this.listenersAdded = this.removeListenersFromNode(this.hoverNode);
    }
  }

  setHoverNode(node) {
    this.hoverNode = node;
  }

  updateListenersOnNode(node) {
    if (this.props.isHoverEnabled) {
      return this.addListenersToNode(node);
    } else if (!this.props.isHoverEnabled) {
      return this.removeListenersFromNode(node);
    }
    return false;
  }

  addListenersToNode(node) {
    if (!this.listenersAdded) {
      node.addEventListener('mouseenter', this.handleMouseEnter);
      node.addEventListener('mouseleave', this.handleMouseLeave);
      this.isMouseEnterActive = false;
    }
    return true;
  }

  removeListenersFromNode(node) {
    if (this.listenersAdded) {
      node.removeEventListener('mouseenter', this.handleMouseEnter);
      node.removeEventListener('mouseleave', this.handleMouseLeave);
      this.isMouseEnterActive = false;
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

  render() {
    const {
      children,
      isHoverEnabled,
      isMenuEnabled,
      onClick,
      onHoverOff,
      onHoverOn,
      ...customProps
    } = this.props;

    const hoverClasses = cx([
      'hover-target',
      { 'is-hover-disabled': !isHoverEnabled },
      { 'is-menu-disabled': !isMenuEnabled },
      customProps.className,
    ]);

    return (
      <div {...customProps} className={hoverClasses} ref={this.setHoverNode}>
        <div className={cx('content-section')}>
          {children}
        </div>
        <div className={cx('hover-section')} onClick={this.handleOnClick}>
          <IconChevronRight className={cx('hover-icon')} />
          <h3 className={cx('hover-text')}>Menu</h3>
        </div>
      </div>
    );
  }
}

HoverTarget.propTypes = propTypes;
HoverTarget.defaultProps = defaultProps;

export default HoverTarget;
