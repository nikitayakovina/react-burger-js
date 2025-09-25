import { NavLink } from 'react-router-dom';

import type { TCustomNavLinkProps } from '@/models/custom-nav-link';
import type { JSX } from 'react';
import type { NavLinkRenderProps } from 'react-router-dom';

import styles from './custom-nav-link.module.css';

export const CustomNavLink = ({
  to,
  icon: Icon,
  className,
  text,
}: TCustomNavLinkProps) => {
  return (
    <NavLink to={to} className={`${styles.link} ${className}`}>
      {({ isActive }: NavLinkRenderProps): JSX.Element => (
        <>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <p
            className={`text text_type_main-default ml-2 ${
              isActive ? 'text_color_primary' : 'text_color_inactive'
            }`}
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
};
