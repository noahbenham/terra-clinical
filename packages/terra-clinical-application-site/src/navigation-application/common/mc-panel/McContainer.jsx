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
  }

  componentDidMount() {
    if (this.containerNode) {
      this.containerNode.addEventListener('mouseenter', this.handleMouseEnter);
      this.containerNode.addEventListener('mouseleave', this.handleMouseLeave);
      this.listenersAdded = true;
    }
  }

  componentDidUpdate() {
    if (this.containerNode) {
      if (this.props.isHoverEnabled && !this.listenersAdded) {
        this.containerNode.addEventListener('mouseenter', this.handleMouseEnter);
        this.containerNode.addEventListener('mouseleave', this.handleMouseLeave);
        this.listenersAdded = true;
      } else if (!this.props.isHoverEnabled && this.listenersAdded) {
        this.containerNode.removeEventListener('mouseenter', this.handleMouseEnter);
        this.containerNode.removeEventListener('mouseleave', this.handleMouseLeave);
        this.listenersAdded = false;
      }
    }
  }

  componentWillUnmount() {
    if (this.containerNode && this.listenersAdded) {
      this.containerNode.removeEventListener('mouseenter', this.handleMouseEnter);
      this.containerNode.removeEventListener('mouseleave', this.handleMouseLeave);
      this.listenersAdded = false;
    }
  }

  handleMouseEnter(event) {
    if (this.props.onHoverOn) {
      this.props.onHoverOn(event);
    }
  }

  handleMouseLeave(event) {
    if (this.props.onHoverOff) {
      this.props.onHoverOff(event);
    }
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
