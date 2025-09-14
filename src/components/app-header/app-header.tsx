import { BurgerIcon, ListIcon, Logo } from '@krgaa/react-developer-burger-ui-components';

import { CustomNavLink } from '@components/custom-nav-link/custom-nav-link.js';

import styles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <CustomNavLink to={'/'} icon={BurgerIcon} text={'Конструктор'}></CustomNavLink>
          <CustomNavLink
            to={'/feed'}
            icon={ListIcon}
            text={'Лента заказов'}
            className={'ml-10'}
          ></CustomNavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <CustomNavLink
          to={'/profile'}
          icon={ListIcon}
          text={'Личный кабинет'}
          className={styles.link_position_last}
        ></CustomNavLink>
      </nav>
    </header>
  );
};
