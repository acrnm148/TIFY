import { NavLink } from "react-router-dom";
import logo from "../assets/tifyLogo.svg"
import heart from "../assets/iconHeart.svg"
import alert from "../assets/iconAlert.svg"
import profile from "../assets/iconProfile.svg"
import logout from "../assets/iconLogout.svg"
import "./navBar.css"

export function NavBar() {
  return (
    <nav className="navbar-container">

      <div className="nav-left">
      <NavLink to="">
          <img src={logo} className="logo" alt="Tify logo"/>
        </NavLink>
        <div className="nav-cate">
          <NavLink to="/gifthub" className="nav-cate-item">gifthub</NavLink>
          <NavLink to="/thanks" className="nav-cate-item">감사하기</NavLink>
          <NavLink to="/friends" className="nav-cate-item">친구찾기</NavLink> 
          <NavLink to="/wish" className="nav-cate-item">wish  </NavLink>
        </div>
      </div>

      <div>
        <h3></h3>
        <NavLink to="/mypage">
          <img src={profile} className="logo logo-right" alt="Tify logo"/>
        </NavLink>
        <NavLink to="/like">
          <img src={heart} className="logo logo-right" alt="Tify logo"/>
        </NavLink>
        <NavLink to="/alram">
          <img src={alert} className="logo logo-right" alt="Tify logo"/>
        </NavLink>
        <NavLink to="">
          <img src={logout} className="logo logo-right" alt="Tify logo"/>
        </NavLink>
      </div>
    </nav>
  );
}
