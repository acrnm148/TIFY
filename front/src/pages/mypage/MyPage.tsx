import iconProfileSample from '../../assets/iconProfileSample.svg';
import iconSidebar1Mywish from '../../assets/sidebar/iconSidebar1Mywish.svg';
import iconSidebar2Engaged from '../../assets/sidebar/iconSidebar2Engaged.svg';
import iconSidebar3Friends from '../../assets/sidebar/iconSidebar3Friends.svg';
import iconSidebar4Privacy from '../../assets/sidebar/iconSidebar4Privacy.svg';
import iconSidebar5Addressbook from '../../assets/sidebar/iconSidebar5Addressbook.svg';
import iconSidebar6Postbox from '../../assets/sidebar/iconSidebar6Postbox.svg';
import iconCategory1Birthday from '../../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../../assets/category/iconCategory7Etc.svg';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from 'react-router-dom';
import '../../css/myPage.styles.css';

export function MyPage() {
  const locate = useLocation();
  const tmp = locate.pathname.split('/');
  const tapId = tmp[2];

  return (
    <div className="mypage-div">
      <Sidebar tapId={tapId}></Sidebar>
      <Outlet></Outlet>
    </div>
  );
}

function Sidebar(props: { tapId: string }) {
  return (
    <div className="side-div">
      <div className="profile-div">
        <img src={iconProfileSample} alt="사진추가하기" />
        <p className="profile-name">정인모</p>
        <p className="profile-nickname">Basketball93</p>
      </div>
      <div className="side-menu-div ">
        <NavLink
          to="mywish"
          className={
            props.tapId == 'mywish' ? 'active-menu side-menu' : 'side-menu'
          }
        >
          <img src={iconSidebar1Mywish} alt="" />
          <p>나의 위시</p>
        </NavLink>
        <NavLink
          to="joined"
          className={`side-menu 
          ${props.tapId == 'joined' && 'active-menu'} 
          `}
        >
          <img src={iconSidebar2Engaged} alt="" />
          <p>참여한 위시</p>
        </NavLink>
        <div className="side-menu">
          <img src={iconSidebar3Friends} alt="" />
          <p>일촌</p>
        </div>
        <div className="side-menu">
          <img src={iconSidebar4Privacy} alt="" />
          <p>개인정보</p>
        </div>
        <div className="side-menu">
          <img src={iconSidebar5Addressbook} alt="" />
          <p>주소록</p>
        </div>
        <div className="side-menu">
          <img src={iconSidebar6Postbox} alt="" />
          <p>주문조회</p>
        </div>
      </div>
    </div>
  );
}
