import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './custom-nav-link.module.css';

export const CustomNavLink = ({ to, icon: Icon, className, text }) => {
  return (
    <NavLink to={to} className={`${styles.link} ${className}`}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
};
