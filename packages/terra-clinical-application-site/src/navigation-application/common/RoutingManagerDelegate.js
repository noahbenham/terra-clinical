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

    routeConfig: PropTypes.object,
    navigationConfig: PropTypes.object,

    location: PropTypes.object,
    browserLocation: PropTypes.object,

    toggleMenu: PropTypes.func,
    menuIsOpen: PropTypes.bool,

    togglePin: PropTypes.func,
    menuIsPinned: PropTypes.bool,

    goToRoot: PropTypes.func,
    goBack: PropTypes.func,
  }),
  clone: (source, overrides) => (
    Object.assign({}, source, overrides)
  ),
};

export default RoutingManagerDelegate;
