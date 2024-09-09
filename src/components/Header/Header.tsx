import { NavBar } from './NavBar/NavBar';
import classes from './styles.module.css';

export function Header() {
  return (
    <div className={classes.placement}>
      <header className={classes.header}>
        <div>Fight Health Insurance</div>
        <NavBar />
      </header>
    </div>
  );
}
