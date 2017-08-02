import PropTypes from 'prop-types';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const RoutingManagerDelegate = {
  propType: PropTypes.shape({
    size: PropTypes.oneOf(BREAKPOINTS).isRequired,
    closeMenu: PropTypes.func,
    openMenu: PropTypes.func,
    pinMenu: PropTypes.func,
    unpinMenu: PropTypes.func,
    presentRootMenu: PropTypes.func,
    presentParentMenu: PropTypes.func,
  }),
};

export default RoutingManagerDelegate;
