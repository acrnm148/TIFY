import { NavLink } from 'react-router-dom';
import logo from '../assets/tifyLogo.svg';
import heart from '../assets/iconHeart.svg';
import alert from '../assets/iconAlert.svg';
import profile from '../assets/iconProfile.svg';
import logout from '../assets/iconLogout.svg';
import '../css/header.styles.css';
import { useState } from 'react';

export function Header() {
  const [showWishDetail, setShowWishDetail] = useState<boolean>(false);
  const [hideWishDetail, setHideWishDetail] = useState<boolean>(true);
  return (
    <nav className="navbar-container">
      <div className="nav-left">
        <NavLink to="">
          <img src={logo} className="logo logo-left" alt="Tify logo" />
        </NavLink>
        <div
          className="nav-cate"
          onMouseOver={() => {
            setShowWishDetail(true);
            setHideWishDetail(false);
          }}
          onMouseLeave={() => {
            setHideWishDetail(true);
            setShowWishDetail(false);
          }}
        >
          {/* <NavLink to="/qna" className="nav-cate-item">문의하기</NavLink> */}
          <NavLink to="/gifthub" className="nav-cate-item">
            기프트허브
          </NavLink>
          <NavLink to="/friends" className="nav-cate-item">
            친구찾기
          </NavLink>
          <NavLink to="/thanks" className="nav-cate-item">
            감사하기
          </NavLink>
          <div className="nav-cate-item wish">
            위시
            <div
              className={`wish-detail 
              ${showWishDetail ? 'open' : ''} 
              ${hideWishDetail ? 'hide' : ''}
              `}
            >
              <NavLink to="/makewish" className="">
                만들기
              </NavLink>
              <NavLink to="/checkwish" className="">
                확인
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="header-right">
        <h3></h3>
        <NavLink to="/mypage/mywish">
          <img src={profile} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        <NavLink to="/like">
          <img src={heart} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        <NavLink to="/alram">
          <img src={alert} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        <NavLink to="">
          <img src={logout} className="logo logo-right" alt="Tify logo" />
        </NavLink>
      </div>
    </nav>
  );
}
