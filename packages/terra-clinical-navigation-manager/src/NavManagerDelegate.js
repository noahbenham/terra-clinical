import PropTypes from 'prop-types';

const BREAKPOINTS = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
];

const NavManagerDelegate = {
  propType: PropTypes.shape({
    index: PropTypes.number.isRequired,
    size: PropTypes.oneOf(BREAKPOINTS).isRequired,
    closeMenu: PropTypes.func,
    openMenu: PropTypes.func,
    pinMenu: PropTypes.func,
    unpinMenu: PropTypes.func,
    presentRootMenu: PropTypes.func,
    presentParentMenu: PropTypes.func,
    registerNavigation: PropTypes.func,
    deregisterNavigation: PropTypes.func,
  }),
};

export default NavManagerDelegate;
