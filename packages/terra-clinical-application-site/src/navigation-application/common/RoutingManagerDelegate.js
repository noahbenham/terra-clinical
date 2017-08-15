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
    managerLocation: PropTypes.object,
    browserLocation: PropTypes.object,
    toggleMenu: PropTypes.func,
    togglePin: PropTypes.func,
    menuIsOpen: PropTypes.bool,
    menuIsPinned: PropTypes.bool,
    goToRoot: PropTypes.func,
    goBack: PropTypes.func,
  }),
  clone: (source, overrides) => (
    Object.assign({}, source, overrides)
  ),
};

export default RoutingManagerDelegate;
