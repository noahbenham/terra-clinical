import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import 'terra-base/lib/baseStyles';

// import AppDelegate from 'terra-app-delegate';
import './NavTabs.scss';

const NavTabs = ({
    app,
    links,
    ...customProps
  }) => {
  const containerClassnames = classNames([
    'terraClinical-NavTabs',
    customProps.className,
  ]);

  const primaryNavButtons = [];
  links.forEach((link) => {
    primaryNavButtons.push((
      <NavLink className="terraClinical-NavLinks" to={link.path} key={link.path} activeStyle={{ fontWeight: 'bold' }}>
        {link.text}
      </NavLink>
    ));
  });

  return (
    <div {...customProps} className={containerClassnames}>
      <div className="terraClinical-NavTabs-container">
        {primaryNavButtons}
      </div>
    </div>
  );
};

// NavTabs.propTypes = propTypes;

export default NavTabs;
