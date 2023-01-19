import { NavLink } from "react-router-dom";
import logo from "../assets/logoFooter.svg"

export function NavBar() {
  return (
    <nav className="navbar-footer">
      <NavLink to=""> 
        <img src={logo} className="logo" alt="Tify logo"/>
        </NavLink>
    </nav>
  );
}
