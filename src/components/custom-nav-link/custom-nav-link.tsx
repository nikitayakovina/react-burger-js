import { NavLink } from 'react-router-dom';

import type { TCustomNavLinkProps } from '@/models/custom-nav-link';
import type { FC } from 'react';

import styles from './custom-nav-link.module.css';

export const CustomNavLink: FC<TCustomNavLinkProps> = ({
  to,
  icon: Icon,
  className,
  text,
}) => {
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
