import iconCategory1Birthday from '../../assets/category/iconCategory1Birthday.svg';
import iconCategory2Marry from '../../assets/category/iconCategory2Marry.svg';
import iconCategory3Employed from '../../assets/category/iconCategory3Employed.svg';
import iconCategory4Health from '../../assets/category/iconCategory4Health.svg';
import iconCategory5Childbirth from '../../assets/category/iconCategory5Childbirth.svg';
import iconCategory6Unmarried from '../../assets/category/iconCategory6Unmarried.svg';
import iconCategory7Etc from '../../assets/category/iconCategory7Etc.svg';
import '../../css/Joined.styles.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../store/Auth';
import { useSelector } from 'react-redux';

interface CelebData {
  celebContent: string;
  celebFrom: string;
  celebImg: null | string;
  payId: string;
}

interface CelebPayData {
  amount: string;
  giftId: string;
  giftImgUrl: string;
  giftName: string;
  payedDate: string;
}

interface JoinedWish {
  celebCardDtoList: Array<CelebData>;
  joinedWishId: string;
  myCelebDtoList: Array<CelebPayData>;
  userId: string;
  wishCategory: string;
  wishEndDate: string;
  wishFinishYN: string;
  wishId: string;
  wishName: string;
  wishUser: string;
  wishUserId: string;
}

export function Joined() {
  const [refresh, setRefresh] = useState<boolean>(false); //페이지 갱신용
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const [joinedWishList, setJoinedWishList] = useState<Array<JoinedWish>>();

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const API_URL = `https://i8e208.p.ssafy.io/api/account/getPartcpWish`;
      const response = await axios.get(API_URL).then((res) => {
        console.log(res.data, '페이지 찐정보');
        return res.data;
      });
      setJoinedWishList(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p className="phone-book-title">| Joined Wish</p>
      <div className="joined-wish-div">
        {/* {joinedWishList &&
          joinedWishList.map((joinedWish: JoinedWish) => {
            return <JoinedWishCardActive a={joinedWish}></JoinedWishCardActive>;
          })} */}
        {/* 
        <JoinedWishCardActive title="hello"></JoinedWishCardActive>
        <JoinedWishCardActive title="hello"></JoinedWishCardActive>
        <JoinedWishCardDeactive title="hello"></JoinedWishCardDeactive> */}
      </div>
    </div>
  );
}

function JoinedWishCardActive(a: JoinedWish) {
  return (
    <div className="joined-wish-box shadow-xl">
      <p className="p-date">완료까지 7일</p>
      <p className="p-proceed">진행중</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="joined-wish-title">"{title}"</p>
      </div>
      <div className="button-div">
        <button className="button-gift">보낸 선물</button>
        <button className="button-card">보낸 축하 카드</button>
      </div>
    </div>
  );
}

function JoinedWishCardDeactive(props: { title: string }) {
  return (
    <div className="joined-wish-box shadow-xl">
      <p className="p-date">22.01.02 ~ 22.01.26</p>
      <p className="p-done">완료</p>
      <div className="category-div">
        <img src={iconCategory1Birthday} alt="" />
        <p className="joined-wish-title">"{props.title}"</p>
      </div>
      <div className="button-div">
        <button className="button-gift">보낸 선물</button>
        <button className="button-card">보낸 축하 카드</button>
      </div>
    </div>
  );
}
