import { NavLink } from 'react-router-dom';
import logo from '../assets/tifyLogo.svg';
import heart from '../assets/iconLikeCart.svg';
import alert from '../assets/iconAlert.svg';
import profile from '../assets/iconProfile.svg';
import logout from '../assets/iconLogout.svg';
import '../css/header.styles.css';
import { useState } from 'react';
import AlarmDropdown from '../components/AlarmDropdown';

export function Header() {
  const [showWishDetail, setShowWishDetail] = useState<boolean>(false);
  const [hideWishDetail, setHideWishDetail] = useState<boolean>(true);
  const [checkUser, setCheckUser] = useState<boolean>(true);

  const NavLeft = () => {
    return (
      <>
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
      </>
    );
  };
  // 로그아웃 버튼 클릭 시 유저 정보 지우기
  // 유저 로그아웃 상태일 경우 <로그인|회원가입> 컴포넌트
  // 로그인 상태일 경우 <마이페이지|카드|알람|로그아웃>컴포넌트
  const logOut = () => {
    setCheckUser(false);
    return <></>;
  };
  const LoggedInNav = () => {
    return (
      <>
        <NavLink to="/mypage/mywish">
          <img src={profile} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        <NavLink to="/like">
          <img src={heart} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        <NavLink to="/alram">
          {/* <img src={alert} className="logo logo-right" alt="Tify logo" /> */}
          <AlarmDropdown/>
        </NavLink>
        <button onClick={logOut}>
          <img src={logout} className="logo logo-right" alt="Tify logo" />
        </button>
      </>
    );
  };

  const LoggedOutNav = () => {
    return (
      <>
        <div>
          <NavLink to="/login">
            <button className="loginbtn login">Login</button>
          </NavLink>
          <NavLink to="/join1">
            <button className="loginbtn join">Join</button>
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <nav className="navbar-container">
      <div className="nav-left">
        <NavLeft />
      </div>

      <div className="header-right">
        {checkUser ? <LoggedInNav /> : <LoggedOutNav />}
      </div>
    </nav>
  );
}
