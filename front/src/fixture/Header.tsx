import { NavLink } from 'react-router-dom';
import logo from '../assets/tifyLogo.svg';
import heart from '../assets/iconLikeCart.svg';
import alertIcon from '../assets/iconAlert.svg';
import profile from '../assets/iconProfile.svg';
import logout from '../assets/iconLogout.svg';
import '../css/header.styles.css';
import { useState, useEffect } from 'react';
import { RootState } from '../store/Auth';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken } from '../modules/Auth/RefreshtokenLocal';

import axios from 'axios';

import { removeCookieToken } from '../modules/Auth/RefreshtokenLocal';
import { DELETE_TOKEN } from '../store/Auth';

import AlarmDropdown from '../components/AlarmDropdown';
import { useLocation } from 'react-router-dom';

export function Header() {
  const [showWishDetail, setShowWishDetail] = useState<boolean>(false);
  const [hideWishDetail, setHideWishDetail] = useState<boolean>(true);
  const [checkUser, setCheckUser] = useState<boolean>();

  // const checkUser = useSelector(
  //   (state: RootState) => state.authToken.authenticated,
  // );
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  // const [checkUser, setCheckUser] = useState<boolean>(true);
  const location = useLocation();
  // const checkUser = useSelector(
  //   (state: RootState) => state.authToken.authenticated,
  // );
  // console.log(checkUser);
  // console.log('요것이 checkUser');
  // console.log(accessToken);
  // console.log('요것이 accessToken');

  const [checkAdmin, setCheckAdmin] = useState<boolean>(false);

  const refreshToken = getCookieToken();

  function checkRole() {
    const accessToken = useSelector(
      (state: RootState) => state.authToken.accessToken,
    );
    axios({
      url: 'https://i8e208.p.ssafy.io/api/roleCheck',
      method: 'GET',
      params: { userid: '' },
    });
  }

  useEffect(() => {
    if (refreshToken != undefined) {
      setCheckUser(true);
    } else {
      setCheckUser(false);
    }
  }, [refreshToken]);

  const NavLeft = () => {
    return (
      <>
        <NavLink to="">
          <img src={logo} className="logo logo-left" alt="Tify logo" />
        </NavLink>
        <div className="nav-cate">
          {/* <NavLink to="/qna" className="nav-cate-item">문의하기</NavLink> */}
          <NavLink to="/gifthub" className="nav-cate-item">
            기프트허브
          </NavLink>
          <NavLink to="/friends" className="nav-cate-item">
            친구찾기
          </NavLink>
          <NavLink to="/makewish" className="nav-cate-item">
            위시만들기
          </NavLink>
          <NavLink to="/checkwish" className="nav-cate-item">
            마이위시
          </NavLink>
          <NavLink to="/admin/qna" className="nav-cate-item">
            관리자페이지
          </NavLink>
        </div>
      </>
    );
  };
  // 로그아웃 버튼 클릭 시 유저 정보 지우기
  // 유저 로그아웃 상태일 경우 <로그인|회원가입> 컴포넌트
  // 로그인 상태일 경우 <마이페이지|카드|알람|로그아웃>컴포넌트

  const LoggedInNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
      alert('로그아웃 되셨습니다.');
      console.log('로그아웃됨!');
      dispatch(DELETE_TOKEN());
      // Cookie에 저장된 Refresh Token 정보를 삭제
      removeCookieToken();
      // 로그아웃 요청
      axios({
        url: 'https://i8e208.p.ssafy.io/api/account/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      })
        .then((con) => {
          console.log('로그아웃 성공', con);
        })
        .catch((err) => {
          console.log('로그아웃 실패', err);
        });
      return navigate('/');
    };
    return (
      <>
        <NavLink to="/mypage/mywish">
          <img src={profile} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        <NavLink to="/like">
          <img src={heart} className="logo logo-right" alt="Tify logo" />
        </NavLink>
        {/* <NavLink to="/alram"> */}
        {/* <img src={alertIcon} className="logo logo-right" alt="Tify logo" /> */}
        <AlarmDropdown />
        {/* </NavLink> */}
        <button onClick={handleLogOut}>
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

  const AmdinNavLeft = () => {
    const path = location.pathname;
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
          <NavLink  to="/admin/users" className={"nav-cate-item"}>
            회원관리
          </NavLink>
          <NavLink to="/admin/wishes" className="nav-cate-item">
            위시관리
          </NavLink>
          <NavLink to="/admin/gifts" className="nav-cate-item">
            기프트관리
          </NavLink>
          <NavLink to="/admin/products" className="nav-cate-item">
            상품관리
          </NavLink>
          <NavLink to="/admin/qna" className="nav-cate-item">
            문의관리
          </NavLink>
          <NavLink to="/admin/faq" className="nav-cate-item">
            FAQ관리
          </NavLink>
          <NavLink to="/admin/order" className="nav-cate-item">
            오더관리
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <nav className="navbar-container">
      <div className="nav-left">
        {location.pathname.startsWith('/admin') ? (
          <AmdinNavLeft />
        ) : (
          <NavLeft />
        )}
      </div>

      <div className="header-right">
        {checkUser ? <LoggedInNav /> : <LoggedOutNav />}
      </div>
    </nav>
  );
}
// ============반응형네브바
// return (
//   <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
//     <div className="flex items-center flex-shrink-0 text-white mr-6">
//       <span className="font-semibold text-xl tracking-tight">Logo</span>
//     </div>
//     <div className="block lg:hidden">
//       <button
//         className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
//       >
//         <svg
//           className="fill-current h-3 w-3"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <title>Menu</title>
//           <path
//             d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
//           />
//         </svg>
//       </button>
//     </div>
//     <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//       <div className="text-sm lg:flex-grow">
//         <a
//           href="#responsive-header"
//           className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
//         >
//           Docs
//         </a>
//         <a
//           href="#responsive-header"
//           className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
//         >
//           Examples
//         </a>
//         <a
//           href="#responsive-header"
//           className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white"
//         >
//           Blog
//         </a>
//       </div>
//       <div>
//         <a
//           href="#"
//           className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white mt-4 lg:mt-0"
//         >
//           Download
//         </a>
//       </div>
//     </div>
//   </nav>
// );