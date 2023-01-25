import iconProfileSample from '../assets/iconProfileSample.svg';
import iconSidebar1Mywish from '../assets/sidebar/iconSidebar1Mywish.svg';
import iconSidebar2Engaged from '../assets/sidebar/iconSidebar2Engaged.svg';
import iconSidebar3Friends from '../assets/sidebar/iconSidebar3Friends.svg';
import iconSidebar4Privacy from '../assets/sidebar/iconSidebar4Privacy.svg';
import iconSidebar5Addressbook from '../assets/sidebar/iconSidebar5Addressbook.svg';
import iconSidebar6Postbox from '../assets/sidebar/iconSidebar6Postbox.svg';
import '../css/myPage.styles.css';

export function MyPage() {
  return (
    <div className="mypage-div">
      <div className="side-div">
        <div className="profile-div">
          <img src={iconProfileSample} alt="사진추가하기" />
          <p className="profile-name">정인모</p>
          <p className="profile-nickname">Basketball93</p>
        </div>
        <div className="side-menu-div ">
          <div className="side-menu active-menu">
            <img src={iconSidebar1Mywish} alt="" />
            <p>나의 위시</p>
          </div>
          <div className="side-menu">
            <img src={iconSidebar2Engaged} alt="" />
            <p>참여한 위시</p>
          </div>
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
    </div>
  );
}
