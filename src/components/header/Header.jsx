import reactLogo from "./d20logo.svg";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

function Header() {
    return (
        <header className={classes.header}>
            <Link to="/" className={classes.logoContainer}>
                <img src={reactLogo} className={classes.logo} alt="Dice logo" />
                <span className={classes.title}>Dice stats</span>
            </Link>
            <nav className={classes.nav}>
                <ul className={classes.navList}>
                    <li className={classes.navItem}><Link to="/">Бросок!</Link></li>
                    <li className={classes.navItem}><Link to="/characters">Персонажи</Link></li>
                    <li className={classes.navItem}><Link to="/dice">Кости</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
