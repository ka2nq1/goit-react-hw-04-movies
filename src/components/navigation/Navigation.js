import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const Navigation = () => (
    <div className={styles.container}>
        <ul className={styles.navList}>
            <li className={styles.navItem}>
                <NavLink exact to={routes.home} className={styles.navLink} activeClassName={styles.navLinkActive}>
                    Home
                </NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink to={routes.movies} className={styles.navLink} activeClassName={styles.navLinkActive}>
                    Movies
                </NavLink>
            </li>
        </ul>
    </div>
);

export default Navigation;