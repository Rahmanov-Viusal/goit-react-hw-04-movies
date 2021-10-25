import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavApp.module.css';

function NavApp(props) {
  return (
    <nav className={s.nav}>
      <NavLink exact className={s.link} activeClassName={s.activeLink} to="/">
        Home
      </NavLink>
      <NavLink
        exact
        className={s.link}
        activeClassName={s.activeLink}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default NavApp;
