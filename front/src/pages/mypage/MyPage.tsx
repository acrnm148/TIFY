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
import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import axios from 'axios';
import '../../css/myPage.styles.css';

export function MyPage() {
  const locate = useLocation();
  const tmp = locate.pathname.split('/');
  const tapId = tmp[2];

  const userId = useSelector((state: RootState) => state.authToken.userId);
  // console.log(userId);
  // console.log('요것이 userId');

  return (
    <div className="mypage-div">
      <Sidebar tapId={tapId}></Sidebar>
      <Outlet></Outlet>
    </div>
  );
}

function Sidebar(props: { tapId: string }) {
  const [imgUrlS3, setImgUrlS3] = useState<string | null>('');
  // photo
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImageButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  // console.log(accessToken);
  const [name, Setname] = useState('');
  const [nickName, SetNickName] = useState('');
  axios({
    url: 'https://i8e208.p.ssafy.io/api/account/userInfo',
    method: 'GET',
    headers: {
      // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      console.log(res, 'res입니다.');
      Setname(res.data.username);
      SetNickName(res.data.nickname);
      setImgUrlS3(res.data.profileImg);
    })
    .catch((err) => {
      console.log(err, 'err입니다.');
    });

  const formData = new FormData();
  const handleChangeFile = (event: any) => {
    if (event.target.files[0]) {
      formData.append('file', event.target.files[0]); // 파일 상태 업데이트
    }
    // imgFile 을 보내서 S3에 저장된 url받기
    const getImgUrl = async () => {
      const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
      await axios
        .post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((con) => {
          console.log('이미지주소불러오기 성공', con.data);
          setImgUrlS3(con.data);
        })
        .catch((err) => {
          console.log('이미지주소불러오기 실패', err);
        });
    };
    getImgUrl();
  };

  return (
    <div className="side-div">
      <div className="profile-div">
        <div>
          {props.tapId === 'info' ? (
            <div
              className="img-div"
              style={{ border: 'none', backgroundImage: `url("${imgUrlS3}")` }}
              onClick={onUploadImageButtonClick}
            >
              <input
                type="file"
                name="imgFile"
                accept="image/*"
                ref={inputRef}
                id="imgFile"
                onChange={handleChangeFile}
                style={{ display: 'none' }}
              />
              <img
                src="https://tifyimage.s3.ap-northeast-2.amazonaws.com/54a2e5c2-1c5c-4a77-9aa0-80d7dfd8da4a.png"
                className="profile-img"
              />
            </div>
          ) : (
            <div
              className="img-div"
              style={{
                border: 'none',
                backgroundImage: `url("${imgUrlS3}")`,
                cursor: 'default',
              }}
            ></div>
          )}
        </div>

        <p className="profile-name">{name}</p>
        <p className="profile-nickname">{nickName}</p>
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
        <NavLink
          to="friend"
          className={`side-menu 
          ${props.tapId == 'friend' && 'active-menu'} 
          `}
        >
          <img src={iconSidebar3Friends} alt="" />
          <p>일촌</p>
        </NavLink>
        <NavLink
          to="info"
          className={`side-menu 
          ${props.tapId == 'info' && 'active-menu'} 
          `}
        >
          <img src={iconSidebar4Privacy} alt="" />
          <p>개인정보</p>
        </NavLink>
        <NavLink
          to="phone"
          className={`side-menu 
          ${props.tapId == 'phone' && 'active-menu'} 
          `}
        >
          <img src={iconSidebar5Addressbook} alt="" />
          <p>주소록</p>
        </NavLink>
        <NavLink
          to="order"
          className={`side-menu 
          ${props.tapId == 'order' && 'active-menu'} 
          `}
        >
          <img src={iconSidebar6Postbox} alt="" />
          <p>주문조회</p>
        </NavLink>
      </div>
    </div>
  );
}
