import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import s from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={s.header}>
      <nav className={s.navBar}>
        <NavLink
          exact
          to={routes.home}
          className={s.navLink}
          activeClassName={s.navLinkActive}
        >
          Home
        </NavLink>
        <p className={s.logo}>
          neon<span className={s.logoPart}>cinema</span>
        </p>
        <NavLink
          to={routes.movies}
          className={s.navLink}
          activeClassName={s.navLinkActive}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
