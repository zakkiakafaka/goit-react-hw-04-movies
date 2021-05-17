import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.navigationLinkContainer}>
      <NavLink
        exact
        to="/"
        className={styles.navigationLink}
        activeClassName={styles.navigationLinkActive}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.navigationLink}
        activeClassName={styles.navigationLinkActive}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Header;
